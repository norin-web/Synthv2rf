import { useCountUp } from "../utils/motion";
import { useReveal } from "../utils/useReveal";

export default function Stat({ n, text, delay = 0 }: { n: string; text: string; delay?: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const shownN = useCountUp(n, shown);
  return (
    <div ref={ref} className={`stat rv ${shown ? "is-in" : ""}`} style={{ transitionDelay: delay ? `${delay}ms` : undefined }}>
      <b className="stat__n" aria-label={n}>{shownN}</b>
      <span className="stat__text">{text}</span>
    </div>
  );
}
