import { useState } from "react";
import { faq, site } from "../content/site";
import { img } from "../utils/img";
import Split from "../components/Split";
import Reveal from "../components/Reveal";

/** Question chips like the app's "Ask me anything"; the answer shows below as a chat. */
export default function Support() {
  const [i, setI] = useState(4); // subscription — the question people ask most
  const item = faq[i];

  return (
    <section className="ask">
      <div className="ember ember--top" aria-hidden="true" />
      <div className="container ask__wrap">
        <div className="head head--center">
          <Split className="h1" parts={[["How can we help?"]]} />
          <Reveal as="p" className="lead" delay={200}>Pick a question and the answer appears right below.</Reveal>
        </div>

        <Reveal className="ask__chips" delay={250} role="tablist" aria-label="Questions">
          {faq.map((f, k) => (
            <button
              key={f.q}
              role="tab"
              aria-selected={k === i}
              aria-controls="answer"
              className={`qchip${k === i ? " is-on" : ""}`}
              onClick={() => setI(k)}
            >
              <span className="only-wide">{f.q}</span>
              <span className="only-narrow">{f.short}</span>
            </button>
          ))}
        </Reveal>

        <div className="ask__chat" id="answer" role="tabpanel" aria-live="polite">
          <div className="ask__msg" key={i}>
            <p className="bubble">{item.q}</p>
            <div className="reply">
              <img src={img("/images/app-icon.png")} alt="" width={36} height={36} />
              <p>{item.a}</p>
            </div>
          </div>
        </div>

        <p className="ask__more">
          Still need help? Write to <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </section>
  );
}
