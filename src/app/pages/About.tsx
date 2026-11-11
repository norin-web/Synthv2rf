import { approach, principles, site } from "../content/site";
import { img } from "../utils/img";
import Split from "../components/Split";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <>
      <section className="bhero">
        <img className="bhero__img" src={img("/images/gen-portrait.webp")} alt="" aria-hidden="true" />
        <div className="bhero__shade" aria-hidden="true" />
        <div className="container bhero__copy">
          <Reveal as="p" className="eyebrow">About Syntx</Reveal>
          <Split className="h1 bhero__title" parts={[["We make AI feel like a simple chat"]]} />
          <Reveal as="p" className="lead" delay={250}>
            Syntx is made by {site.operator} in Essen, Germany. We bring the best image and video models into one place, so anyone can create without learning a dozen tools.
          </Reveal>
        </div>
      </section>

      <section className="section split2">
        <div className="container split2__row">
          <Reveal as="h2" className="h3">Our approach</Reveal>
          <div className="split2__text">
            <Reveal as="p" className="lead lead--strong">{approach.lead}</Reveal>
            <Reveal as="p" className="lead" delay={100}>{approach.text}</Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Reveal as="h2" className="h3">What we stand by</Reveal>
          <div className="principles">
            {principles.map((p, k) => (
              <Reveal className="principle" key={p.title} delay={k * 80}>
                <h3 className="h5">{p.title}</h3>
                <p className="muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
