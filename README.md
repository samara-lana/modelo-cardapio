# Site de cardápio com comandas

Modelo de site pra bar, café ou lanchonete: cardápio, horário com "aberto agora", localização, WhatsApp, galeria de fotos e um convite pra avaliar no Google. Vem com uma área de admin pelo celular onde o dono edita tudo isso e controla as comandas (conta, fiado, pagamentos e relatório de vendas).

Nasceu como o site do Bar do Zazá. Esta cópia não tem os dados do bar: o banco começa vazio e o conteúdo de exemplo é genérico. O nome, as cores e os textos do Zazá continuam no código de propósito, pra você trocar pelos seus (passo 7).

É um site estático (HTML, CSS e JavaScript puros, sem build), publicado de graça pelo GitHub Pages. Os dados ficam num banco **Supabase** (plano gratuito).

## Como funciona

```
Visitante ──► site (GitHub Pages) ──► Supabase: função site() devolve cardápio, horários, fotos e textos
Dono      ──► /admin/ (login com senha) ──► Supabase: edita cardápio, horários, fotos e comandas
```

- O site público só consegue ler o cardápio. Todo o resto (comandas, edição) exige o login do admin.
- Se o banco demorar ou cair, o site mostra a última versão que aquele celular viu, ou a cópia que o GitHub tira todo dia às 5h (`assets/dados-planilha.js`), ou, em último caso, o conteúdo de `assets/dados-padrao.js`.
- As comandas ficam salvas no celular e funcionam sem internet. Cada mudança sobe pro banco logo em seguida.

## Testar no seu computador

Você vai precisar de:

- [Node.js](https://nodejs.org) 22 ou mais novo
- [Git](https://git-scm.com) (ou o GitHub Desktop)
- Python, só pra servir os arquivos (já vem no Mac e no Linux; no Windows, instale pela Microsoft Store). Sem Python, `npx http-server -c-1 -p 8000` faz o mesmo.

### Só o visual (sem banco)

Na pasta do projeto:

```bash
python -m http.server 8000
```

Abra http://localhost:8000. O site aparece com o conteúdo de exemplo de `assets/dados-padrao.js`. É o jeito mais rápido de mexer em cores, nome e textos: salve o arquivo e recarregue a página (Ctrl+Shift+R, pra não pegar versão guardada).

O admin (http://localhost:8000/admin/) vai dizer "Falta configurar o banco". Pra testá-lo, use o banco local abaixo.

### Com um banco de teste no seu computador

Precisa do [Docker Desktop](https://www.docker.com/products/docker-desktop/) aberto. Esse banco é só seu, roda na sua máquina e pode ser apagado à vontade.

1. Suba o banco (a primeira vez demora uns minutos, ele baixa tudo):

   ```bash
   npx supabase start
   ```

   No fim ele mostra uma tabela. Anote o **Project URL** (`http://127.0.0.1:54321`), a chave **Publishable** e a chave **Secret**.

2. Em `assets/config.js`, preencha `SUPABASE_URL` com o Project URL e `SUPABASE_PUBLISHABLE_KEY` com a chave Publishable.
3. Copie `.env.example` pra `.env.local` e preencha `SUPABASE_URL` e `SUPABASE_SECRET_KEY` (a chave Secret).
4. Crie a senha do admin: `node scripts/criar-admin.mjs`
5. `python -m http.server 8000` e abra http://localhost:8000/admin/. Entre com a senha, cadastre uns itens no Cardápio e veja aparecerem em http://localhost:8000.

O painel do banco local fica em http://127.0.0.1:54323 (dá pra ver as tabelas). Pra desligar: `npx supabase stop`.

**Antes de fazer commit, volte o `assets/config.js` pros valores do banco de verdade.** Endereço `127.0.0.1` no site publicado deixa o site sem banco.

## Colocar no ar

### 1. Sua cópia do código

No GitHub, nesta página, clique em **Use this template → Create a new repository**, na sua conta. Deixe **público** (o GitHub Pages gratuito exige). Depois clone pro seu computador.

### 2. Projeto no Supabase

Crie uma conta em https://supabase.com e um projeto novo (**New project**). Região: São Paulo. Guarde a **senha do banco** que ele pede, ela é usada no passo 3.

### 3. Criar as tabelas

As tabelas, regras de segurança e funções estão em `supabase/migrations/`. Na pasta do projeto:

```bash
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF   # pede a senha do banco
npx supabase db push
```

O `project-ref` é o código que aparece no endereço do painel: `supabase.com/dashboard/project/ESTE_CODIGO`.

### 4. Ligar o site ao banco

No painel do Supabase, clique em **Connect** (ou vá em Settings → API Keys) e copie a URL do projeto, a chave **publishable** (`sb_publishable_...`) e a chave **secret** (`sb_secret_...`).

- `assets/config.js`: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` e `ADMIN_EMAIL` (qualquer e-mail inventado serve, ex.: `admin@meucafe.app`; é só o nome do usuário do admin).
- `.env.local` (copie de `.env.example`): `SUPABASE_URL` e `SUPABASE_SECRET_KEY`.

A chave publishable pode ficar à mostra, ela só lê o cardápio. **A secret nunca vai pro `config.js` nem pro GitHub**: ela abre o banco inteiro. O `.env.local` já está no `.gitignore`.

### 5. Criar o admin

```bash
node scripts/criar-admin.mjs
```

Pede a senha sem mostrar na tela. O mesmo comando troca a senha depois.

### 6. Fechar o cadastro público

No painel do Supabase, em **Authentication**, desligue a opção que deixa qualquer pessoa criar conta (**Allow new users to sign up**). O admin já foi criado pelo script e continua funcionando. Mesmo com o cadastro aberto, quem se cadastrasse não veria nada (só quem está na tabela `admins` tem acesso), mas não há motivo pra deixar a porta aberta.

### 7. Trocar a cara do site

Busque **"Zaz"** no projeto inteiro (no VS Code: Ctrl+Shift+F) e troque pelo seu nome. Os lugares são:

| O quê | Onde |
| --- | --- |
| Nome, título da aba, descrição pro Google, cidade no rodapé, "Curtiu o Zazá?" | `index.html` |
| Nome na tela de login e no topo do admin | `admin/index.html` |
| Nome do app instalado no celular | `admin/manifest.webmanifest` |
| Nome na conta, na lista do fiado e no arquivo baixado | `admin/comandas.js` |
| Nome de reserva (quando o banco não diz) | `assets/app.js` |
| Cores | `assets/style.css`, no bloco `:root` do começo. Algumas cores fixas estão em `admin/admin.css` |
| Cor da barra do navegador no celular | `theme-color` em `index.html`, `admin/index.html` e `admin/manifest.webmanifest` |
| Fontes | o link do Google Fonts em `index.html` e `admin/index.html`, e `--logo` em `assets/style.css` |
| Ícone da aba | `assets/favicon.svg` |
| Ícone do app no celular | `assets/icone-180.png`, `icone-192.png`, `icone-512.png` (quadrados, nesses tamanhos) |
| Conteúdo de exemplo (aparece se o banco falhar) | `assets/dados-padrao.js` |

Opcionais, se fizer sentido pro seu comércio:

- A palavra "bar" em telas do admin (aba **Bar**, "Nome do bar"): `admin/index.html` e `admin/site.js`.
- Na comanda, enquanto ainda não há histórico de vendas, os botões rápidos mostram primeiro as seções "Cervejas" e "Porções". Pra um café, troque esses nomes em `admin/comandas.js` (procure `cerveja`).
- O "dia" das vendas começa às 5h da manhã (venda à 1h conta no dia anterior): `INICIO_DO_DIA_H` em `admin/comandas.js`.
- A seção **Refeições** (almoço e jantar) só aparece se você preencher os horários dela no admin. Vazia, some.

### 8. Publicar

Faça commit e push. No GitHub: **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, branch `main`, pasta `/ (root)`. Em um ou dois minutos o site fica em `https://SEU_USUARIO.github.io/NOME_DO_REPO/` e o admin em `.../admin/`.

Pra usar um domínio próprio, é na mesma tela (**Custom domain**).

### 9. Preencher pelo admin

Abra `/admin/` no celular, entre com a senha e preencha:

- **Cardápio**: seções, itens e preços.
- **Bar**: nome, endereço, WhatsApp, links (Maps, Instagram, iFood) e horários da semana.
- **Fotos**: a galeria do site.

O link de **avaliação no Google** fica na aba Bar, em avançado. Ele é `https://search.google.com/local/writereview?placeid=` seguido do Place ID do seu comércio, que se acha em https://developers.google.com/maps/documentation/places/web-service/place-id. Sem ele, o botão abre o Maps.

### 10. Cópia diária do cardápio

Em **Actions**, rode uma vez à mão a **Cópia do cardápio** (Run workflow). Depois ela roda sozinha todo dia às 5h: grava o cardápio em `assets/dados-planilha.js` (o plano B do site quando o banco falha) e, de quebra, mantém o Supabase acordado. Projeto gratuito sem uso por 7 dias é pausado; se acontecer, é só entrar no painel e clicar em **Restore**.

### 11. Backup (recomendado)

O plano gratuito do Supabase não faz backup. Dois jeitos:

- **No computador**, quando quiser: `node scripts/backup.mjs` gera um JSON com o banco inteiro em `backups/` (fora do git).
- **Automático, numa planilha do Google**: crie uma planilha, abra **Extensões → Apps Script** e cole o conteúdo de `backup-planilha/Backup.js`. Preencha `SUPABASE_URL` no começo do código. Em Configurações do projeto, marque "Mostrar o arquivo de manifesto" e cole `backup-planilha/appsscript.json` no `appsscript.json`. Salve, recarregue a planilha e use o menu **Backup → Configurar chave do banco** (cole a chave secret; ela fica guardada só no script). A partir daí, todo dia às 5h a planilha copia as comandas, itens, pagamentos e cardápio, e guarda um JSON completo por dia numa pasta do Drive (90 dias). Se falhar, o Google manda e-mail.

## Usando o admin

**Cardápio:** marcar item em falta, editar nome, descrição e preços, criar e excluir itens e seções. A mudança aparece no site na hora. Preço é só o número (`23`, `7,50`); vazio aparece como "consulte".

**Comandas:** escreva o nome do cliente (nomes já usados aparecem pra tocar), toque nos itens pra lançar (+1) e feche a conta:

- **Recebido**: pagou tudo.
- **Pagou uma parte**: o que falta vai pro fiado. Dá pra pagar em quantas partes quiser.
- **Pendurar tudo no fiado**.
- **Dar desconto**: em reais (`5`) ou porcentagem (`10%`). `0` tira.
- **Preço combinado**: dentro da comanda, toque no nome do item em "Consumido" e mude o preço.

Se alguma mudança ficar mais de 2 minutos sem chegar ao banco, aparece uma faixa vermelha (o que foi lançado continua salvo no celular).

**Vendas:** dinheiro recebido no período (hoje, ontem, 7 dias, mês...), fiado em aberto, vendas por dia e mais vendidos. A lista do fiado dá pra copiar pro WhatsApp ou baixar como planilha.

**Bar:** o **Aviso no site** serve pra avisar um dia diferente ("Fechado no feriado") sem mexer no horário da semana. Horário com pausa: `11h às 14h; 16h às 23h`. Dia que não abre: `Fechado`.

**Fotos:** envia fotos do celular pra galeria (o app diminui cada foto antes de enviar). Dá pra pôr legenda, mudar a ordem e tirar. Sem foto, a galeria não aparece.

**Como app no Android:** no Chrome, toque em **Instalar app** no topo do admin (ou menu ⋮ → Adicionar à tela inicial). Abre em tela cheia e funciona sem internet.

## Onde ficam os dados

| Tabela | O que guarda |
| --- | --- |
| `cardapio` | Uma linha por preço (`secao`, `nome`, `opcao`, `descricao`, `preco`, `em_falta`), na ordem de `ordem` |
| `horarios` | Um dia por linha |
| `fotos` | Galeria do site (os arquivos ficam no Storage, bucket `fotos`) |
| `sobre` | Endereço, telefone, links e textos do site (`chave` / `valor`) |
| `comandas` | Uma linha por comanda |
| `lancamentos` | Um registro por item lançado, com o preço do momento. Item tirado não é apagado, ganha `removido_em` |
| `pagamentos` | Um registro por dinheiro recebido. Pagamento desfeito ganha `removido_em` |
| `admins` | Quem pode usar o admin |

A view `comandas_resumo` mostra, por comanda, total, desconto e quanto já foi pago. Tudo se confere no painel do Supabase (**Table editor**).

## Estrutura

```
index.html               página
assets/style.css         visual
assets/app.js            monta o cardápio, horário e "aberto agora"
assets/config.js         endereço e chave publishable do Supabase, usuário do admin
assets/dados-padrao.js   conteúdo de exemplo (último recurso)
assets/dados-planilha.js cópia do banco, GERADA todo dia pela Action (não edite)
admin/                   admin e comandas pelo celular (sw.js = funciona offline e instala como app)
supabase/migrations/     tabelas, regras e funções do banco
scripts/                 criar admin e backup (rodam no computador, com o .env.local)
.github/                 Action "Cópia do cardápio"
backup-planilha/         script da planilha de backup
```

## Mudanças no banco

Mudança de tabela ou função vira um arquivo novo em `supabase/migrations/` (nunca edite um que já subiu):

```bash
npx supabase migration new nome-da-mudanca   # cria o .sql
npx supabase db reset                        # testa no banco local, do zero
npx supabase db push                         # aplica no banco de verdade
```

Projetos novos do Supabase não liberam tabela nova automaticamente pras chaves. Se criar uma tabela, inclua os `grant` dela na migration (veja `20261109120000_permissoes_tabelas.sql`).
