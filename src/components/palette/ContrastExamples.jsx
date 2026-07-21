import checkIcon from "../../../assets/icons/check.svg";
import warningIcon from "../../../assets/icons/Warning.svg";
import { getCharacter } from "../../data/colorPalette";

const waz = getCharacter("Waz");
const step = (n) => waz.scale.find((s) => s.step === n).hex;

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
  return (
    <div className="contrast-examples">
      {EXAMPLES.map((example, i) => (
        <div
          key={i}
          className="contrast-example"
          style={{ backgroundColor: example.bg }}
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
