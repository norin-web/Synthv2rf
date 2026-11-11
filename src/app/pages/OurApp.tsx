import { useRef } from "react";
import { app, appFeatures, appScreens, specs } from "../content/site";
import { img } from "../utils/img";
import Btn from "../components/Btn";
import Split from "../components/Split";
import Reveal from "../components/Reveal";
import Phone from "../components/Phone";

export default function OurApp() {
  const strip = useRef<HTMLDivElement>(null);
  const step = (dir: number) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <>
      <section className="ahero">
        <div className="ember ember--hero" aria-hidden="true" />
        <div className="container ahero__row">
          <div className="ahero__copy">
            <Reveal>
              <img className="ahero__icon" src={img("/images/app-icon.png")} alt="Syntx app icon" width={88} height={88} />
            </Reveal>
            <Split className="h1" parts={[["The whole app, one screen at a time"]]} />
            <Reveal as="p" className="lead" delay={250}>
              Syntx puts image and video models, an AI assistant and your history into one chat on iPhone.
            </Reveal>
            <Reveal className="ahero__cta" delay={350}>
              <Btn href={app.url} size="lg">Download on the App Store</Btn>
              <span className="note">For iPhone · No account needed</span>
            </Reveal>
          </div>
          <div className="ahero__phones">
            <Phone className="phone--back" screens={[{ src: "/images/screen-history.webp", alt: "History screen" }]} eager />
            <Phone className="phone--front" screens={[{ src: "/images/screen-assistant.webp", alt: "AI assistant screen" }]} eager />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container strip__head">
          <Reveal as="h2" className="h3">Inside the app</Reveal>
          <div className="strip__arrows">
            <button aria-label="Previous screens" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button aria-label="Next screens" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="strip" ref={strip} tabIndex={0} aria-label="App screenshots">
          {appScreens.map((s) => (
            <img key={s.src} src={img(s.src)} alt={s.alt} loading="lazy" width={660} height={1434} />
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container rows">
          {appFeatures.map((f, k) => (
            <Reveal className={`row${k % 2 ? " row--flip" : ""}`} key={f.label}>
              <div className="row__copy">
                <span className="note">{f.label}</span>
                <h3 className="h3">{f.title}</h3>
                <p className="lead">{f.text}</p>
              </div>
              <div className="row__shot">
                <img src={img(f.screen)} alt={`${f.label} screen`} loading="lazy" width={660} height={1434} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container specs">
          <div className="specs__head">
            <Reveal as="h2" className="h3">At a glance</Reveal>
            <Reveal as="p" className="lead" delay={100}>No account, no ads, no analytics. What you create stays on your iPhone.</Reveal>
          </div>
          <Reveal as="dl" className="specs__table">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
