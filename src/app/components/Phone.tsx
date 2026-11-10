import { img } from "../utils/img";

/** Phone body drawn in CSS around a flat app screenshot. No tilt, no plate. */
export default function Phone({
  screens,
  active = 0,
  className = "",
  eager,
}: {
  screens: { src: string; alt: string }[];
  active?: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`phone ${className}`.trim()}>
      <div className="phone__screen">
        {screens.map((s, i) => (
          <img
            key={s.src + i}
            src={img(s.src)}
            alt={i === active ? s.alt : ""}
            aria-hidden={i === active ? undefined : true}
            className={i === active ? "is-on" : ""}
            width={660}
            height={1434}
            loading={eager ? "eager" : "lazy"}
          />
        ))}
      </div>
    </div>
  );
}
