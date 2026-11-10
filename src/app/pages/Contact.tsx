import { useState, type FormEvent } from "react";
import { contactTopics, site } from "../content/site";
import Split from "../components/Split";
import Reveal from "../components/Reveal";

/**
 * No backend on a static site: the form checks the fields, then opens the
 * visitor's mail app with everything filled in. The message box mirrors the
 * prompt field of the app — topic chips below, an orange send button.
 */
export default function Contact() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [topic, setTopic] = useState(contactTopics[0]);
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const check = (k: keyof typeof v, val = v[k]) => {
    if (k === "email" && !/^\S+@\S+\.\S+$/.test(val)) return "That email doesn't look right. Check for typos.";
    if (k === "message" && !val.trim()) return "Please write a message.";
    return "";
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    (["email", "message"] as const).forEach((k) => {
      const m = check(k);
      if (m) next[k] = m;
    });
    setErr(next);
    const first = Object.keys(next)[0];
    if (first) return document.getElementById(`f-${first}`)?.focus();
    const body = `${v.message}\n\n— ${v.name || "Syntx user"} (${v.email})`;
    location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Syntx · ${topic}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });

  return (
    <section className="ask">
      <div className="ember ember--top" aria-hidden="true" />
      <div className="container ask__wrap">
        <div className="head head--center">
          <Split className="h1" parts={[["Write to us"]]} />
          <Reveal as="p" className="lead" delay={200}>Questions, ideas or a bug you spotted? Type it like a prompt.</Reveal>
          <Reveal as="a" className="contact__mail" href={`mailto:${site.email}`} delay={250}>{site.email}</Reveal>
        </div>

        <Reveal as="form" className="cform" onSubmit={submit} noValidate delay={300}>
          <div className="cform__row">
            <label className="sr-only" htmlFor="f-name">Your name</label>
            <input id="f-name" className="input" placeholder="Your name" autoComplete="name" value={v.name} onChange={set("name")} />
            <div className="cform__cell">
              <label className="sr-only" htmlFor="f-email">Your email</label>
              <input
                id="f-email"
                className="input"
                type="email"
                placeholder="Your email"
                autoComplete="email"
                value={v.email}
                onChange={set("email")}
                onBlur={() => v.email && setErr({ ...err, email: check("email") })}
                aria-invalid={!!err.email}
                aria-describedby={err.email ? "f-email-err" : undefined}
              />
              {err.email && <span className="err" id="f-email-err" role="alert">{err.email}</span>}
            </div>
          </div>

          <div className={`prompt${err.message ? " is-err" : ""}`}>
            <div className="prompt__main">
              <label className="sr-only" htmlFor="f-message">Message</label>
              <textarea
                id="f-message"
                placeholder="Write your message"
                value={v.message}
                onChange={set("message")}
                aria-invalid={!!err.message}
                aria-describedby={err.message ? "f-message-err" : undefined}
              />
              <button type="submit" className="prompt__send" aria-label="Send message">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 4l15 8-15 8 2.5-8z" /></svg>
              </button>
            </div>
            <div className="prompt__bar" role="radiogroup" aria-label="Topic">
              <span className="prompt__label">Topic</span>
              {contactTopics.map((t) => (
                <button type="button" key={t} role="radio" aria-checked={topic === t} className={topic === t ? "is-on" : ""} onClick={() => setTopic(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {err.message && <span className="err" id="f-message-err" role="alert">{err.message}</span>}
          <p className="note">The send button opens your mail app with the message ready to go.</p>
          {sent && <p className="ok" role="status">Your mail app should open with the message ready. If it didn’t, write to {site.email}.</p>}
        </Reveal>
      </div>
    </section>
  );
}
