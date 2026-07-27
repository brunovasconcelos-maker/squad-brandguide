import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../utils/useReducedMotion";
import { CHARACTERS } from "../../utils/imageFilters";
import { getCharacter } from "../../data/colorPalette";
import { contrastRatio, WCAG_THRESHOLDS } from "../../utils/contrast";
import checkIcon from "../../../assets/icons/Check.svg";
import warningIcon from "../../../assets/icons/Warning.svg";
import wazAvatar from "../../../assets/images/avatares/waz_avatar.png";
import makyAvatar from "../../../assets/images/avatares/maky_avatar.png";
import finAvatar from "../../../assets/images/avatares/fin_avatar.png";
import pipoAvatar from "../../../assets/images/avatares/pipo_avatar.png";
import juriAvatar from "../../../assets/images/avatares/juri_avatar.png";
import opyAvatar from "../../../assets/images/avatares/opy_avatar.png";
import Dropdown from "../Dropdown";

const AVATARS = {
  waz: wazAvatar,
  maky: makyAvatar,
  fin: finAvatar,
  pipo: pipoAvatar,
  juri: juriAvatar,
  opy: opyAvatar,
};

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const CHARACTER_OPTIONS = CHARACTERS.map((key) => ({
  key,
  label: capitalize(key),
  avatar: AVATARS[key],
}));

const EXIT_DURATION = 220;

function ContrastBadgeRow({ ratio, thresholds }) {
  return (
    <div className="contrast-modal__badges">
      {["AA", "AAA"].map((grade) => {
        if (ratio == null) {
          return (
            <span key={grade} className="contrast-modal__badge contrast-modal__badge--placeholder">
              {grade}
            </span>
          );
        }
        const pass = ratio >= thresholds[grade];
        return (
          <span
            key={grade}
            className={`contrast-modal__badge contrast-modal__badge--${pass ? "pass" : "fail"}`}
          >
            {pass ? (
              <>
                {grade}
                <img src={checkIcon} alt="" />
              </>
            ) : (
              <>
                <img src={warningIcon} alt="" />
                {grade}
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function ContrastModal({ onClose }) {
  const [character, setCharacter] = useState(null);
  const [bgStep, setBgStep] = useState(null);
  const [textStep, setTextStep] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  function requestClose() {
    if (isClosing) return;
    if (prefersReducedMotion) {
      onClose();
      return;
    }
    setIsClosing(true);
    window.setTimeout(onClose, EXIT_DURATION);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") requestClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const characterOption = character ? CHARACTER_OPTIONS.find((o) => o.key === character) : null;
  const characterData = character ? getCharacter(capitalize(character)) : null;
  const bgColor = characterData && bgStep != null ? characterData.scale.find((s) => s.step === bgStep) : null;
  const textColor = characterData && textStep != null ? characterData.scale.find((s) => s.step === textStep) : null;
  const ratio = bgColor && textColor ? contrastRatio(bgColor.hex, textColor.hex) : null;

  function handleCharacterSelect(option) {
    setCharacter(option.key);
    setBgStep(null);
    setTextStep(null);
  }

  return (
    <div className={`lightbox${isClosing ? " is-closing" : ""}`} onClick={requestClose}>
      <div className={`contrast-modal__panel${isClosing ? " is-closing" : ""}`} onClick={(event) => event.stopPropagation()}>
        <button className="lightbox__close" type="button" aria-label="Fechar" onClick={requestClose}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="contrast-modal__header">
          <p className="contrast-modal__title">Teste de Contraste de Cor</p>
          <p className="contrast-modal__description">
            Calcule o contrate da combinação de cores entre fundo e texto para saber se passa nos testes de
            acessibilidade
          </p>
        </div>

        <div className="contrast-modal__body">
          <div className="contrast-modal__field">
            <p className="contrast-modal__field-label">Selecione o personagem:</p>
            <Dropdown
              placeholder="Selecione um personagem"
              value={characterOption}
              options={CHARACTER_OPTIONS}
              getOptionKey={(option) => option.key}
              onSelect={handleCharacterSelect}
              renderTriggerLabel={(option) => option.label}
              renderTriggerSwatch={(option) => <img src={option.avatar} alt="" />}
              renderOption={(option) => (
                <>
                  <span className="dropdown__option-swatch">
                    <img src={option.avatar} alt="" />
                  </span>
                  {option.label}
                </>
              )}
            />
          </div>

          <div className="contrast-modal__row">
            <div className="contrast-modal__field">
              <p className="contrast-modal__field-label">Selecione a cor de fundo:</p>
              <Dropdown
                placeholder="Selecione uma cor"
                value={bgColor}
                options={characterData ? characterData.scale : []}
                disabled={!characterData}
                getOptionKey={(option) => option.step}
                onSelect={(option) => setBgStep(option.step)}
                renderTriggerLabel={(option) => `${option.step} | ${option.hex}`}
                renderTriggerSwatch={(option) => (
                  <span style={{ backgroundColor: option.hex, width: "100%", height: "100%", display: "block" }} />
                )}
                renderOption={(option) => (
                  <>
                    <span className="dropdown__option-swatch" style={{ backgroundColor: option.hex }} />
                    {option.step} | {option.hex}
                  </>
                )}
              />
            </div>

            <div className="contrast-modal__field">
              <p className="contrast-modal__field-label">Selecione a cor de texto:</p>
              <Dropdown
                placeholder="Selecione uma cor"
                value={textColor}
                options={characterData ? characterData.scale : []}
                disabled={!characterData}
                getOptionKey={(option) => option.step}
                onSelect={(option) => setTextStep(option.step)}
                renderTriggerLabel={(option) => `${option.step} | ${option.hex}`}
                renderTriggerSwatch={(option) => (
                  <span style={{ backgroundColor: option.hex, width: "100%", height: "100%", display: "block" }} />
                )}
                renderOption={(option) => (
                  <>
                    <span className="dropdown__option-swatch" style={{ backgroundColor: option.hex }} />
                    {option.step} | {option.hex}
                  </>
                )}
              />
            </div>
          </div>

          <div
            className={`contrast-modal__preview${bgColor && textColor ? "" : " contrast-modal__preview--empty"}`}
            style={bgColor && textColor ? { backgroundColor: bgColor.hex, color: textColor.hex } : undefined}
          >
            <div className="contrast-modal__preview-row">
              <p className="contrast-modal__preview-large">Large Text</p>
              <ContrastBadgeRow ratio={ratio} thresholds={WCAG_THRESHOLDS.large} />
            </div>
            <div className="contrast-modal__preview-row contrast-modal__preview-row--normal">
              <p className="contrast-modal__preview-normal">Normal Text</p>
              <ContrastBadgeRow ratio={ratio} thresholds={WCAG_THRESHOLDS.normal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
