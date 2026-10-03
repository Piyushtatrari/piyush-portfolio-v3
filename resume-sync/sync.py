"""
Resume PDF -> content/resume.json -> portfolio.

Parses the one-column resume template (Piyush_Tatrari_Full_Stack_Resume.html, printed
to PDF by Chrome) using font cues, not an LLM: 11pt bold = section heading, italic text
at the end of a row = dates, a leading bullet = a point, bold spans = **bold**.

    python resume-sync/sync.py <resume.pdf> [label]   # parse + publish without the UI
    streamlit run resume-sync/app.py                  # same, with upload and preview
"""
import datetime, json, pathlib, re, subprocess, sys

import pymupdf

REPO = pathlib.Path(__file__).resolve().parent.parent
JSON_PATH = REPO / "content" / "resume.json"
PDF_PATH = REPO / "public" / "Piyush_Tatrari_Resume.pdf"
ARCHIVE = REPO.parent / "Resume"  # resume workspace with publish_resume.py (dated folders + Drive)

BOLD, ITALIC = 16, 2
BULLET = "•"
DATES = re.compile(r"^((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}|\d{4})( [–-] .+)?$")


def _rows(doc):
    """Spans grouped into visual rows (same baseline), left to right, across pages."""
    for page in doc:
        by_y = {}
        for block in page.get_text("dict")["blocks"]:
            for line in block.get("lines", []):
                for s in line["spans"]:
                    if s["text"].strip():
                        by_y.setdefault(round(s["origin"][1]), []).append(s)
        for y in sorted(by_y):
            yield page, sorted(by_y[y], key=lambda s: s["bbox"][0])


def _rich(spans):
    text = "".join(f"**{s['text']}**" if s["flags"] & BOLD and not s["flags"] & ITALIC else s["text"] for s in spans)
    return text.replace("****", "").replace("\xa0", " ")  # adjacent bold runs merge


def _plain(text):
    return text.replace("**", "").strip()


def _links(page, spans):
    """URIs of the link annotations that sit on this row."""
    y0, y1 = spans[0]["bbox"][1], spans[0]["bbox"][3]
    return [l["uri"] for l in page.get_links() if l.get("uri") and l["from"].y0 < y1 and l["from"].y1 > y0]


def parse(pdf_bytes):
    doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
    out = {"name": "", "contact": [], "links": [], "summary": "", "experience": [], "skills": {}, "projects": [],
           "education": [], "certifications": []}
    section, org, location, entry = None, "", "", None
    loose = {}  # bullets that belong to a section, not an entry (skills, certifications)
    last = None  # list whose final item a wrapped line continues

    for page, spans in _rows(doc):
        first, end = spans[0], spans[-1]
        text = _rich(spans).strip()
        if first["size"] >= 15:
            out["name"] = _plain(text)
            continue
        if first["size"] >= 10.5 and first["flags"] & BOLD:  # section heading
            section, entry, last = _plain(text).lower(), None, None
            continue
        if section is None:  # header block: contact lines
            out["contact"] += [p.strip() for p in _plain(text).split("|") if p.strip()]
            out["links"] += _links(page, spans)
            continue
        if section == "professional summary":
            out["summary"] = f"{out['summary']} {text}".strip()
            continue

        dates = _plain(end["text"]) if len(spans) > 1 and end["flags"] & ITALIC and DATES.match(_plain(end["text"])) else None
        if dates:  # a new entry: role, project or degree
            head = _plain(_rich(spans[:-1]))
            if section == "experience":
                entry = {"org": org, "location": location, "title": head, "dates": dates, "lead": "", "points": []}
                out["experience"].append(entry)
            elif section == "projects":
                name, _, stack = head.partition(" – ")
                links = _links(page, spans)
                entry = {"name": name, "stack": stack.replace("[GitHub]", "").strip(), "repo": links[0] if links else None,
                         "dates": dates, "points": []}
                out["projects"].append(entry)
            else:
                title, _, rest = head.partition(" – ")
                school, _, note = rest.partition(" · ")
                entry = {"title": title, "school": school, "note": note, "dates": dates, "points": []}
                out["education"].append(entry)
            last = None
        elif section == "experience" and first["flags"] & BOLD and not text.startswith(BULLET):  # company row
            org, location = _plain(first["text"]), _plain(_rich(spans[1:]))
        elif text.startswith(BULLET):
            last = entry["points"] if entry is not None else loose.setdefault(section, [])
            last.append(text[1:].strip())
        elif first["flags"] & ITALIC and entry is not None and "lead" in entry:
            entry["lead"] = f"{entry['lead']} {_plain(text)}".strip()
        elif last:  # wrapped continuation of the previous bullet
            last[-1] += " " + text

    for line in loose.get("technical skills", []):
        cat, _, items = line.partition(":**")
        out["skills"][_plain(cat)] = [i.strip() for i in _plain(items).split(",") if i.strip()]
    out["certifications"] = [_plain(c) for c in loose.get("certifications", [])]
    return out


def check(data):
    """Problems that should block publishing, so a bad parse can never blank the live portfolio."""
    # TODO(human)
    return []


def publish(pdf_bytes, data, label="Full_Stack", push=True):
    """Write the PDF + JSON into the portfolio, commit and push (the host rebuilds on push),
    and file the PDF as a dated resume version unless that exact PDF is already filed."""
    log = []
    PDF_PATH.write_bytes(pdf_bytes)
    JSON_PATH.parent.mkdir(exist_ok=True)
    JSON_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    git = lambda *a: subprocess.run(["git", "-C", str(REPO), *a], capture_output=True, text=True)
    git("add", str(PDF_PATH), str(JSON_PATH))
    if git("diff", "--cached", "--quiet").returncode == 0:
        log.append("Portfolio already has this resume; nothing to commit.")
    else:
        r = git("commit", "-m", f"Update resume content from PDF ({datetime.date.today()})")
        log.append(r.stdout.strip() or r.stderr.strip())
        if push:
            r = git("push")
            log.append("Pushed to GitHub." if r.returncode == 0 else f"Push failed: {r.stderr.strip()}")

    resumes = ARCHIVE / "Resumes"
    if not (ARCHIVE / "publish_resume.py").exists():
        log.append(f"No resume workspace at {ARCHIVE}; skipped versioning.")
    elif any(p.read_bytes() == pdf_bytes for p in resumes.glob("*/*.pdf")):
        log.append("This PDF is already filed in Resumes/; no new version made.")
    else:
        tmp = REPO / "resume-sync" / "_upload.pdf"
        tmp.write_bytes(pdf_bytes)
        r = subprocess.run([sys.executable, str(ARCHIVE / "publish_resume.py"), label, str(tmp)], capture_output=True, text=True,
                           encoding="utf-8", errors="replace")
        tmp.unlink()
        log.append(r.stdout.strip() or r.stderr.strip())
    return log


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    pdf = pathlib.Path(sys.argv[1]).read_bytes()
    data = parse(pdf)
    if problems := check(data):
        sys.exit("Not publishing:\n- " + "\n- ".join(problems))
    print("\n".join(publish(pdf, data, sys.argv[2] if len(sys.argv) > 2 else "Full_Stack")))
