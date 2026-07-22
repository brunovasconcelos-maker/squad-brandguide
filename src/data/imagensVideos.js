// Curated titles per image, keyed by filename (without extension). Used for
// sorting the grid and stored as data now — not displayed yet (hover/lightbox
// behavior comes later). Any image added to assets/images/imagens-videos/
// without an entry here just falls back to its filename as the title, so the
// grid keeps working for future images.
const TITLES = {
  "fin-1": "Cobrança de cliente",
  "fin-2": "Emissão de nota fiscal",
  "fin-3": "Gerador de links de pagamento",
  "fin-4": "Fluxo de caixa",
  "juri-1": "Assinatura digital",
  "juri-2": "Gerador de contratos",
  "juri-3": "Assinatura e gestão de contratos",
  "juri-4": "Revisão de contratos",
  "maky-1": "Criador de site institucional",
  "maky-2": "Gerenciador de branding",
  "maky-3": "Gerenciador de comentarios",
  "maky-4": "Trafego pago",
  "maky-5": "Gerador de blog/AEO",
  "maky-6": "Marketing",
  "maky-7": "Marketing",
  "maky-8": "Criador e agendador de posts",
  "maky-9": "Analise competitiva",
  "opy-1": "Controle de estoque",
  "opy-2": "Gravação de reuniões",
  "opy-3": "Otimizador de entregas",
  "opy-4": "Gestão de escalas",
  "pipo-1": "Plano de desenvolvimento individual",
  "pipo-2": "Prospecção de candidatos",
  "pipo-3": "Triagem de CVs",
  "pipo-4": "Wiki interno",
  "waz-1": "Busca e enriquecimento de Leads",
  "waz-2": "Coach de vendas",
  "waz-3": "Ligação a cliente",
  "waz-4": "Gerador de propostas comerciais",
  "waz-5": "SDR no Whatsapp",
  "waz-6": "Atendimento a múltiplos clientes",
  "waz-7": "Prospecção outbound Whatsapp e ligação",
};

// Picks up every image currently in the folder — and any added later —
// without needing code changes per file.
const modules = import.meta.glob(
  "../../assets/images/imagens-videos/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

export const images = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split("/").pop();
    const extension = file.split(".").pop();
    const filename = file.replace(/\.[^.]+$/, "");
    const character = filename.split("-")[0];
    return {
      filename,
      title: TITLES[filename] || filename,
      src,
      extension,
      character,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
