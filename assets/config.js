/**
 * Banco do site e do admin (Supabase). Os dois valores estão no painel do
 * Supabase, botão "Connect" (ou Settings → API Keys).
 *
 * A chave daqui é a PUBLICÁVEL (começa com sb_publishable_): ela fica à mostra
 * no site e só deixa ler o cardápio. A chave secreta (sb_secret_) NUNCA entra
 * aqui; ela vai só no .env.local.
 *
 * Vazio = o site mostra só o conteúdo de assets/dados-padrao.js e o admin avisa
 * que falta configurar.
 */
window.SUPABASE_URL = "";
window.SUPABASE_PUBLISHABLE_KEY = "";
// Usuário do admin no Supabase (não precisa ser um e-mail de verdade).
// Na tela de login a pessoa digita só a senha.
window.ADMIN_EMAIL = "admin@meu-comercio.app";
