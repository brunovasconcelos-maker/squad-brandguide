import { useRef } from "react";
import checkIcon from "../../../assets/icons/Check.svg";
import warningIcon from "../../../assets/icons/Warning.svg";
import { getCharacter } from "../../data/colorPalette";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { useRevealOnScroll } from "./useRevealOnScroll";

const waz = getCharacter("Waz");
const step = (n) => waz.scale.find((s) => s.step === n).hex;

// Half the size of the main 6-card groups, so its entrance is tuned to
// roughly half the pace too: half the per-card transition duration (110ms
// vs. 220ms) and half the stagger step (20ms vs. 40ms), giving a 3-card
// row's entrance ~0.15s end to end.
const ITEM_DURATION = 110;
const STAGGER_STEP = 20;

const EXAMPLES = [
  {
    bg: step(50),
    text: step(10),
    labelColor: "#ffffff",
    result: "pass",
    badgeGrade: "AAA",
    bgStep: 50,
    textStep: 10,
  },
  {
    bg: step(10),
    text: step(90),
    labelColor: "#ffffff",
    result: "pass",
    badgeGrade: "AAA",
    bgStep: 10,
    textStep: 90,
  },
  {
    bg: step(90),
    text: step(50),
    labelColor: step(10),
    result: "fail",
    bgStep: 90,
    textStep: 50,
  },
];

export default function ContrastExamples() {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = useRevealOnScroll(ref, { skip: prefersReducedMotion });

  return (
    <div className="contrast-examples" ref={ref}>
      {EXAMPLES.map((example, i) => (
        <div
          key={i}
          className={`contrast-example color-frame-reveal${visible ? " color-frame-reveal--visible" : ""}`}
          style={{
            backgroundColor: example.bg,
            transitionDuration: `${ITEM_DURATION}ms`,
            transitionDelay: `${i * STAGGER_STEP}ms`,
          }}
        >
          {example.result === "pass" ? (
            <span
              className="contrast-example__badge"
              style={{ color: example.text }}
            >
              <span
                className="contrast-example__badge-swatch"
                style={{ backgroundColor: example.text }}
              />
              {example.badgeGrade}
            </span>
          ) : null}

          <span
            className={
              example.result === "pass"
                ? "contrast-example__result contrast-example__result--pass"
                : "contrast-example__result contrast-example__result--fail"
            }
          >
            {example.result === "pass" ? (
              <>
                Pass
                <img src={checkIcon} alt="" />
              </>
            ) : (
              <>
                <img src={warningIcon} alt="" />
                Fail
              </>
            )}
          </span>

          <p
            className="contrast-example__name"
            style={{ color: example.text }}
          >
            Waz
          </p>

          <p
            className="contrast-example__label"
            style={{ color: example.labelColor }}
          >
            BG: {example.bgStep} | Text: {example.textStep}
          </p>
        </div>
      ))}
    </div>
  );
}
