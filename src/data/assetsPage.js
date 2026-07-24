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
  fin_asset_1: "Serviço, Pagamentos",
  fin_asset_2: "Pix, Cartão",
  fin_asset_3: "Pills, Pagamentos, Transferencias",
  fin_asset_4: "Cofrinho",
  fin_asset_5: "Dinheiro, Pilha de dinheiro",
  fin_asset_6: "Enviar pagamento",
  fin_asset_7: "Saldo, Transferencia, Pagamento",
  fin_asset_8: "Entradas, Saidas, Lucro",
  pipo_asset_1: "Candidatos",
  pipo_asset_2: "Curriculo, scaner",
  pipo_asset_3: "Progresso geral, Cursos",
  pipo_asset_4: "Vagas abertas",
  pipo_asset_5: "Recursos Humanos",
  opy_asset_1: "Escalas, mês",
  opy_asset_2: "Time de Suporte",
  opy_asset_3: "Produção Noturna",
  opy_asset_4: "Escalas, Funcionários",
  opy_asset_5: "Tabela Estoque",
  opy_asset_6: "Rastreio entrega",
  juri_asset_1: "Gerenciar contratos",
  juri_asset_2: "Analisar contratos",
  juri_asset_3: "Lembretes de contrato",
  juri_asset_4: "Ilustração contrato",
  juri_asset_5: "Assinaturas digitais",
  juri_asset_6: "Leitura de contratos",
  juri_asset_7: "Contratos",
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
