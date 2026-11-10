import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { site } from "../content/site";
import { legalUpdated } from "../content/legal";
import Split from "./Split";
import Reveal from "./Reveal";

type Doc = {
  title: string;
  current: string;
  body: string | null;
  glance: [string, string][] | null;
  other: { to: string; label: string };
};

type Section = { id: string; title: string; blocks: string[] };

// turn plain email addresses into mailto links, text otherwise untouched
const linkify = (text: string) =>
  text.split(/(\S+@\S+\.[a-z]{2,})/i).map((part, i) =>
    /@/.test(part) ? <a key={i} href={`mailto:${part}`}>{part}</a> : part,
  );

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Split the verbatim text into an intro and "## " sections; wording is never changed. */
function parse(body: string) {
  const intro: string[] = [];
  const sections: Section[] = [];
  for (const block of body.split(/\n{2,}/)) {
    if (block.startsWith("## ")) {
      const title = block.slice(3);
      sections.push({ id: slug(title), title, blocks: [] });
    } else if (sections.length) sections[sections.length - 1].blocks.push(block);
    else intro.push(block);
  }
  return { intro, sections };
}

function Block({ text }: { text: string }): ReactNode {
  if (text.startsWith("### ")) return <h3>{text.slice(4)}</h3>;
  if (text.startsWith("- "))
    return (
      <ul>
        {text.split("\n").map((li, j) => <li key={j}>{linkify(li.replace(/^- /, ""))}</li>)}
      </ul>
    );
  // all-caps legal clauses get a quiet grey box so they don't shout across the page
  const caps = text.length > 40 && text === text.toUpperCase();
  return (
    <p className={caps ? "legal-caps" : undefined}>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linkify(line)}
        </Fragment>
      ))}
    </p>
  );
}

export default function LegalPage({ doc }: { doc: Doc }) {
  const { intro, sections } = useMemo(() => parse(doc.body ?? ""), [doc.body]);
  const [active, setActive] = useState(sections[0]?.id);
  const [q, setQ] = useState("");
  const [progress, setProgress] = useState(0);

  const shown = q.trim()
    ? sections.filter((s) => (s.title + " " + s.blocks.join(" ")).toLowerCase().includes(q.trim().toLowerCase()))
    : sections;

  // reading progress + the section whose heading last passed the upper third
  useEffect(() => {
    const onScroll = () => {
      let cur = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.35) cur = s.id;
      }
      setActive(cur);
      const art = document.querySelector(".doc__body");
      if (art) {
        const r = art.getBoundingClientRect();
        setProgress(Math.min(1, Math.max(0, (innerHeight * 0.35 - r.top) / Math.max(1, r.height))));
      }
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [sections]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 110, behavior: "smooth" });
  };
  const index = Math.max(0, sections.findIndex((s) => s.id === active));

  return (
    <>
      <section className="dhero">
        <div className="container">
          <Reveal className="seg seg--doc">
            <Link to="/privacy" className={doc.current === "privacy" ? "is-on" : ""} aria-current={doc.current === "privacy" ? "page" : undefined}>Privacy Policy</Link>
            <Link to="/terms" className={doc.current === "terms" ? "is-on" : ""} aria-current={doc.current === "terms" ? "page" : undefined}>Terms of Use</Link>
          </Reveal>
          <Split className="h1 dhero__title" parts={[[doc.title]]} />
          <Reveal className="dhero__meta" delay={300}>
            <div><span>Last updated</span><b>{legalUpdated}</b></div>
            <div><span>Sections</span><b>{sections.length || "PLACEHOLDER"}</b></div>
            <div><span>Questions</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
          </Reveal>
        </div>
      </section>

      <section className="doc">
        <div className="container doc__grid">
          <aside className="doc__rail" aria-label="Contents">
            <label className="doc__search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
              <span className="sr-only">Search this document</span>
              <input type="search" placeholder="Search this document" value={q} onChange={(e) => setQ(e.target.value)} disabled={!sections.length} />
            </label>
            <div className="doc__progress">
              <span className="doc__bar"><i style={{ transform: `scaleX(${progress})` }} /></span>
              <span className="note">{sections.length ? `Section ${index + 1} of ${sections.length}` : "Text coming soon"}</span>
            </div>
            {!!sections.length && (
              <ol className="doc__toc">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <button
                      className={active === s.id ? "is-on" : ""}
                      onClick={() => go(s.id)}
                      aria-current={active === s.id ? "true" : undefined}
                      aria-label={s.title}
                      title={s.title}
                    >
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      <i aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </aside>

          <article className="doc__body">
            {doc.glance && (
              <div className="glance">
                <h2 className="h5">At a glance</h2>
                <div className="glance__grid">
                  {doc.glance.map(([h, t]) => (
                    <div className="glance__card" key={h}>
                      <b>{h}</b>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <p className="note">A short summary for convenience. The full text below is what applies.</p>
              </div>
            )}

            {!doc.body && (
              <div className="doc__soon">
                <p className="lead">
                  The full {doc.title} will be published here soon. Until then, questions about it go to{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>.
                </p>
              </div>
            )}

            {intro.map((t, i) => (
              <p className="doc__intro" key={i}>{linkify(t)}</p>
            ))}

            {shown.map((s) => (
              <section className="lsec" id={s.id} key={s.id}>
                <h2 className="h4">{sections.indexOf(s) + 1}. {s.title}</h2>
                {s.blocks.map((b, j) => <Block key={j} text={b} />)}
              </section>
            ))}
            {q && !shown.length && <p className="muted">Nothing found for “{q}”.</p>}

            <div className="doc__ask">
              <div>
                <h2 className="h5">Questions about this document?</h2>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <Link to={doc.other.to} className="btn btn--dark btn--md"><span>Read {doc.other.label}</span></Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
