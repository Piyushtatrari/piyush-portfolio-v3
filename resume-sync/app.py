"""Upload a resume PDF, check what changes, publish it to the portfolio.  Run: streamlit run resume-sync/app.py"""
import json

import streamlit as st

from sync import JSON_PATH, check, parse, publish

st.set_page_config(page_title="Resume to portfolio", page_icon="📄")
st.title("Resume → portfolio")
st.caption("Upload the resume PDF. The portfolio's experience, education and project blurbs are rebuilt from it, "
           "the PDF becomes the site's download, and the change is pushed to GitHub so the site redeploys.")

upload = st.file_uploader("Resume PDF", type="pdf")
if not upload:
    st.stop()

pdf = upload.getvalue()
data = parse(pdf)
current = json.loads(JSON_PATH.read_text(encoding="utf-8")) if JSON_PATH.exists() else {}

changed = [k for k in data if data[k] != current.get(k)]
if changed:
    st.info("Sections that will change: " + ", ".join(changed))
else:
    st.success("The text matches what the portfolio already shows. Publishing would only replace the PDF.")

for role in data["experience"]:
    with st.expander(f"{role['title']} · {role['dates']}", expanded=True):
        st.markdown("\n".join(f"- {p}" for p in role["points"]))
for p in data["projects"]:
    st.markdown(f"**{p['name']}**: {' '.join(p['points'])}")
with st.expander("Everything parsed (JSON)"):
    st.json(data)

if problems := check(data):
    st.error("Not publishing, the parse looks wrong:\n\n" + "\n".join(f"- {p}" for p in problems))
    st.stop()

label = st.text_input("Version label (dated folder in Resumes/ and Drive)", "Full_Stack")
if st.button("Publish to portfolio", type="primary"):
    with st.spinner("Publishing..."):
        for line in publish(pdf, data, label):
            st.text(line)
