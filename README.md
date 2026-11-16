# SANSA Oficina Digital — site institucional

Site: https://sansadigital.com.br/

## Situação

Este repositório é a **fonte oficial** do site hospedado no Cloudflare Pages (projeto `sansa-digital`). Toda alteração deve ser feita aqui e publicada a partir da pasta `public/`, sem edições diretas na implantação.

## Estrutura

```
public/
  index.html      página única
  styles.css      estilos (sem dependências externas)
  app.js          menu, filtros de trabalhos, cópia de e-mail e formulário (mailto)
  assets/         logo (SVG), fontes, imagens e favicon
  robots.txt, sitemap.xml
```

Contato comercial: `comercial@sansadigital.com.br` e WhatsApp, ambos direto no `index.html`; o formulário usa o mesmo e-mail em `app.js`.

## Publicação

O deploy é **manual**, sem publicação automática após push. Há duas opções:

- **GitHub Actions:** em *Actions → "Deploy SANSA to existing Cloudflare Pages" → Run workflow*. O workflow exige `public/index.html`, `public/app.js`, `public/styles.css` e arquivos em `public/assets/`, e usa os Secrets `CLOUDFLARE_API_TOKEN` (permissões mínimas para Pages) e `CLOUDFLARE_ACCOUNT_ID`. Nunca commitar tokens.
- **Upload manual:** enviar o conteúdo de `public/` no painel do Cloudflare Pages.

O destino é o projeto Cloudflare Pages **existente** `sansa-digital`, branch `main`. Não alterar DNS ou registros de e-mail.

## Backup da versão publicada

O workflow `recover-site.yml` baixa o site publicado e **commita por cima de `public/`**. Como o repositório agora é a fonte oficial, use-o apenas se o repositório for perdido ou para comparar com o que está no ar, e revise o diff antes de manter o commit.

## Próximas etapas

1. Corrigir o formulário com envio real, validação e proteção antispam (hoje ele abre o app de e-mail do visitante).
2. Revisar as URLs 404 identificadas no Search Console.
3. Testar no celular e no desktop antes de cada publicação em produção.
