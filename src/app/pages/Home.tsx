import { useEffect, useState } from "react";
import {
  app,
  assistantSuggestions,
  examplePrompt,
  features,
  ideas,
  imageModels,
  ratios,
  stats,
  steps,
  videoModels,
} from "../content/site";
import { img } from "../utils/img";
import { reduced } from "../utils/motion";
import Btn from "../components/Btn";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";
import Phone from "../components/Phone";

const TAB_MS = 6000;

function Hero() {
  return (
    <section className="hero">
      <img className="hero__glow" src={img("/images/gen-wizard.webp")} alt="" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />
      <div className="container hero__copy">
        <Reveal as="p" className="eyebrow">AI image and video generator for iPhone</Reveal>
        <Split className="h-hero" parts={[["Turn a few words into images and video"]]} />
        <Reveal as="p" className="lead hero__sub" delay={250}>
          Write a prompt, pick one of 10+ AI models, and Syntx turns your idea into a picture or a clip you can save and share.
        </Reveal>
        <Reveal className="hero__cta" delay={400}>
          <Btn href={app.url} size="lg">Download on the App Store</Btn>
          <span className="note">For iPhone · No account needed</span>
        </Reveal>
      </div>
      <div className="hero__phone">
        <Phone eager screens={[{ src: "/images/screen-home.webp", alt: "Syntx home screen: How can I help you?" }]} />
      </div>
    </section>
  );
}

function Ideas() {
  return (
    <section className="section">
      <div className="container">
        <div className="head head--center">
          <Reveal as="h2" className="h2">Made for every idea you have</Reveal>
          <Reveal as="p" className="lead" delay={100}>Portraits, street scenes, pets or pure fantasy: describe it and watch it appear.</Reveal>
        </div>
        <div className="ideas">
          {ideas.map((c, i) => (
            <Reveal className="idea" key={c.title} delay={i * 80}>
              <img src={img(c.img)} alt={`AI image: ${c.caption}`} loading="lazy" width={1000} height={1500} />
              <div className="idea__cap">
                <b>{c.title}</b>
                <span>“{c.caption}”</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduced()) return;
    const t = setTimeout(() => setI((i + 1) % features.length), TAB_MS);
    return () => clearTimeout(t);
  }, [i, paused]);

  return (
    <section className="section">
      <div className="container features">
        <div className="features__left" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="head">
            <Reveal as="h2" className="h2">One chat for every kind of picture</Reveal>
            <Reveal as="p" className="lead" delay={100}>Everything happens in one conversation, from the first word to the finished file.</Reveal>
          </div>
          <div className="tabs" role="tablist" aria-label="Features">
            {features.map((f, k) => (
              <button
                key={f.title}
                role="tab"
                aria-selected={k === i}
                className={`tab${k === i ? " is-on" : ""}`}
                onClick={() => setI(k)}
              >
                <span className="tab__title">{f.title}</span>
                <span className="tab__body">
                  <span className="tab__text">{f.text}</span>
                  <span className="tab__bar">
                    <i key={`${i}-${paused}`} style={{ animationDuration: `${TAB_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="features__stage">
          <div className="ember" aria-hidden="true" />
          <Phone screens={features.map((f) => ({ src: f.screen, alt: `${f.title} screen` }))} active={i} />
        </div>
      </div>
    </section>
  );
}

function Models() {
  const [kind, setKind] = useState<"image" | "video">("image");
  const list = kind === "image" ? imageModels : videoModels;
  const [model, setModel] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [, w, h] = ratios[ratio];
  // fit the preview inside a 420×560 box while keeping the picked ratio
  const box = { w: 420, h: 560 };
  const s = Math.min(box.w / w, box.h / h);

  return (
    <section className="section section--tight">
      <div className="container">
        <div className="models">
          <div className="ember ember--panel" aria-hidden="true" />
          <div className="models__picker">
            <div className="head">
              <Reveal as="h2" className="h3">The models people talk about, in one place</Reveal>
              <Reveal as="p" className="lead" delay={100}>Switch between image and video models in one tap, right inside the chat.</Reveal>
            </div>
            <div className="seg" role="tablist" aria-label="Model type">
              {(["image", "video"] as const).map((k) => (
                <button key={k} role="tab" aria-selected={kind === k} className={kind === k ? "is-on" : ""} onClick={() => { setKind(k); setModel(0); }}>
                  {k === "image" ? "Image" : "Video"}
                </button>
              ))}
            </div>
            <ul className="mlist">
              {list.map((m, k) => (
                <li key={m}>
                  <button className={k === model ? "is-on" : ""} aria-pressed={k === model} onClick={() => setModel(k)}>
                    <span>{m}</span>
                    {k === model && <i aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="models__preview">
            <div className="frame" style={{ width: `min(100%, ${Math.round(w * s)}px)`, aspectRatio: `${w} / ${h}` }}>
              <img src={img("/images/gen-dancer.webp")} alt="AI image: a dancer in red silk" loading="lazy" />
            </div>
            <div className="ratios" role="radiogroup" aria-label="Frame size">
              {ratios.map(([label], k) => (
                <button key={label} role="radio" aria-checked={k === ratio} className={k === ratio ? "is-on" : ""} onClick={() => setRatio(k)}>
                  {label}
                </button>
              ))}
            </div>
            <p className="note">Seven frame sizes, from 21:9 widescreen to 9:21 stories</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="head head--center">
          <Reveal as="h2" className="h2">Small things that save time</Reveal>
          <Reveal as="p" className="lead" delay={100}>The details that make Syntx easy to use every day.</Reveal>
        </div>
        <div className="bento">
          <Reveal className="card card--photo">
            <div className="card__copy">
              <h3 className="h4">Start from your own photo</h3>
              <p className="muted">Take a shot or pick one from your library and use it as a reference for the next result.</p>
            </div>
            <img src={img("/images/gen-cat-baroque.webp")} alt="AI image: a cat in a baroque coat" loading="lazy" />
          </Reveal>
          <Reveal className="card card--voice" delay={80}>
            <div className="wave" aria-hidden="true">
              {[28, 56, 92, 64, 110, 72, 40, 84, 48, 24].map((hh, k) => <i key={k} style={{ height: hh }} />)}
              <span className="wave__mic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
              </span>
            </div>
            <div className="card__copy">
              <h3 className="h4">Say it out loud</h3>
              <p className="muted">Tap the mic and dictate your prompt instead of typing it.</p>
            </div>
          </Reveal>
          <Reveal className="card card--small">
            <div className="pills" aria-hidden="true"><span>Download</span><span>Share</span></div>
            <div className="card__copy">
              <h3 className="h5">Save or send in a tap</h3>
              <p className="muted">Download the result or share it straight from the chat.</p>
            </div>
          </Reveal>
          <Reveal className="card card--small" delay={80}>
            <div className="search" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
              Lucky golden cat
            </div>
            <div className="card__copy">
              <h3 className="h5">Nothing gets lost</h3>
              <p className="muted">History keeps your images, videos and chats on your iPhone. Search it by name.</p>
            </div>
          </Reveal>
          <Reveal className="card card--small" delay={160}>
            <div className="outline-chips" aria-hidden="true">
              {assistantSuggestions.map((s) => <span key={s}>{s}</span>)}
            </div>
            <div className="card__copy">
              <h3 className="h5">Stuck? Ask AI</h3>
              <p className="muted">Syntx AI Helper suggests ideas and helps you shape the prompt.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PromptResult() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal as="h2" className="h2 pr__title">From one line to a finished frame</Reveal>
        <div className="pr">
          <Reveal className="pr__in">
            <span className="note">One line in</span>
            <p className="pr__prompt">{examplePrompt.text}</p>
            <div className="pr__chips">{examplePrompt.chips.map((c) => <span key={c}>{c}</span>)}</div>
          </Reveal>
          <Reveal className="pr__out" delay={120}>
            <span className="note">One frame out</span>
            <img src={img(examplePrompt.img)} alt={`AI image: ${examplePrompt.text}`} loading="lazy" />
          </Reveal>
        </div>
        <div className="stats">
          {stats.map((s, k) => <Stat key={s.n} n={s.n} text={s.text} delay={k * 80} />)}
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <section className="section section--tight">
      <div className="container">
        <Reveal as="h2" className="h2">Get started in three steps</Reveal>
        <ol className="steps">
          {steps.map((s, k) => (
            <Reveal as="li" className="step" key={s.title} delay={k * 80}>
              {k === 0 ? (
                <img className="step__icon" src={img("/images/app-icon.png")} alt="" width={64} height={64} />
              ) : (
                <span className={`step__icon step__icon--${k === 1 ? "dark" : "accent"}`} aria-hidden="true">
                  {k === 1 ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="M13 7l4 4" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" /></svg>
                  )}
                </span>
              )}
              <div className="step__copy">
                <span className="note">Step {k + 1}</span>
                <h3 className="h5">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cta">
      <img className="cta__img" src={img("/images/gen-dancer.webp")} alt="" aria-hidden="true" loading="lazy" />
      <div className="cta__shade" aria-hidden="true" />
      <div className="container cta__copy">
        <Reveal as="h2" className="h-hero cta__title">Your next idea is one prompt away</Reveal>
        <Reveal delay={150}>
          <Btn href={app.url} size="lg">Download on the App Store</Btn>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Ideas />
      <Features />
      <Models />
      <Benefits />
      <PromptResult />
      <Steps />
      <FinalCta />
    </>
  );
}
