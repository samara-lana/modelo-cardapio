/**
 * Conteúdo padrão do site.
 *
 * É o que aparece enquanto o banco não responde (ou se ainda não houver
 * banco configurado em assets/config.js). Quando o banco carrega, ele
 * substitui tudo isto. Para mudar o cardápio no dia a dia, use o admin
 * (/admin/), não este arquivo.
 *
 * Linhas com a mesma `secao` + `nome` viram um item só no site: a linha sem
 * `opcao` é o preço principal e as outras aparecem como variações
 * ("Pequeno", "Grande"...).
 *
 * Campo vazio some do site (ex.: sem `instagram`, o botão do Instagram não aparece).
 */
window.DADOS_PADRAO = {
  sobre: {
    nome: "Nome do comércio",
    endereco: "Rua Exemplo, 123 · Bairro · Cidade/UF",
    whatsapp: "",
    maps: "",
    avaliar: "",
    aviso_horario: "",
    refeicoes_texto: "",
    refeicoes_nome: "",
    refeicoes_dias: "",
    refeicoes_almoco: "",
    refeicoes_jantar: "",
    ifood: "",
    instagram: "",
  },
  horarios: [
    { dia: "Segunda", horario: "Fechado", obs: "" },
    { dia: "Terça", horario: "8h às 18h", obs: "" },
    { dia: "Quarta", horario: "8h às 18h", obs: "" },
    { dia: "Quinta", horario: "8h às 18h", obs: "" },
    { dia: "Sexta", horario: "8h às 18h", obs: "" },
    { dia: "Sábado", horario: "8h às 13h", obs: "" },
    { dia: "Domingo", horario: "Fechado", obs: "" },
  ],
  // `foto`: caminho de um arquivo da pasta fotos/ ou link (Google Drive compartilhado também serve)
  fotos: [],
  // prettier-ignore
  cardapio: [
    { secao: "Exemplo", nome: "Item de exemplo", opcao: "", descricao: "Troque pelo cardápio de verdade no admin", preco: "10" },
    { secao: "Exemplo", nome: "Item com tamanhos", opcao: "Pequeno", descricao: "", preco: "8" },
    { secao: "Exemplo", nome: "Item com tamanhos", opcao: "Grande", descricao: "", preco: "12" },
  ],
};
