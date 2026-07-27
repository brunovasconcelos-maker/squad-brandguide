import { usePrefersReducedMotion } from "../../utils/useReducedMotion";

const LETTER_STEP = 18;
const NBSP = " ";

export default function AnimatedPageTitle({ text }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <h1 className="page__title">{text}</h1>;
  }

  return (
    <h1 className="page__title page__title--animated" aria-label={text}>
      {[...text].map((letter, index) => (
        <span
          key={index}
          className="page__title__letter"
          aria-hidden="true"
          style={{ transitionDelay: `${index * LETTER_STEP}ms` }}
        >
          {letter === " " ? NBSP : letter}
        </span>
      ))}
    </h1>
  );
}
