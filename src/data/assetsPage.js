// Curated titles per image, keyed by filename (without extension). Used for
// sorting the grid alphabetically and shown on hover/in the lightbox.
const TITLES = {
  waz_asset_1: "Balão de fala, Whatsapp",
  waz_asset_2: "Contatos, Whatsapp",
  waz_asset_3: "Gerador de Proposta",
  waz_asset_4: "Conversa Whatsapp, Balões de Fala",
  waz_asset_5: "Follow-up, Lembretes",
  waz_asset_6: "Qualificando Lead",
  waz_asset_7: "Icone Whatsapp",
  waz_asset_8: "Pills, Follow up, Atendimento, Respostas",
  waz_asset_9: "Tag de preço",
  waz_asset_10: "Conversa Whatsapp, Waz e Balões",
  maky_asset_1: "Megafone ilustração",
  maky_asset_2: "Gerador de Criativos",
  maky_asset_3: "Midia Instagram, Crescimento",
  maky_asset_4: "Comentario Instagram",
  maky_asset_5: "Responder comentario Instagram",
  maky_asset_6: "Necessita Ação, Maky",
  maky_asset_7: "Compra em análise",
  maky_asset_8: "Recomendação de Negócio, IA",
  maky_asset_9: "Like, Share, Save",
};

// Picks up every image currently in the folder — and any added later —
// without needing code changes per file.
const modules = import.meta.glob(
  "../../assets/images/assets-page/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

export const images = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split("/").pop();
    const extension = file.split(".").pop();
    const filename = file.replace(/\.[^.]+$/, "");
    const character = filename.split("_")[0];
    return {
      filename,
      title: TITLES[filename] || filename,
      src,
      extension,
      character,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
