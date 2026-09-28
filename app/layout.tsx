import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const description =
  "Piyush Tatrari is a full stack engineer (React, Next.js, TypeScript, Node, FastAPI) building AI-powered data products: RAG, semantic search and analytics dashboards.";

export const metadata: Metadata = {
  title: "Piyush Tatrari | Full Stack Engineer",
  description,
  authors: [{ name: "Piyush Tatrari" }],
  openGraph: {
    title: "Piyush Tatrari | Full Stack Engineer",
    description: "I turn complex data into products people use. React, Next.js, TypeScript, Node, FastAPI, RAG.",
    type: "website",
  },
  twitter: { card: "summary" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f1" },
  ],
};

// Runs before first paint: restores the saved theme (no flash) and flags JS so reveal animations can hide content.
const bootScript = `try{var t=localStorage.getItem('pt-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
