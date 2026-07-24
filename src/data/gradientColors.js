import { characters } from "./colorPalette";

// Flat list of all 60 official brand colors (6 characters x 10 steps each),
// shared by the "Crie o gradiente" color pickers.
export const gradientColors = characters.flatMap((character) =>
  character.scale.map((swatch) => ({
    id: `${character.name}-${swatch.step}`,
    character: character.name,
    step: swatch.step,
    hex: swatch.hex,
  }))
);
