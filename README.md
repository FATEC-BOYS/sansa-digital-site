# SANSA Oficina Digital — site institucional

Site: https://sansadigital.com.br/

## Situação

Este repositório versionará o site hospedado no Cloudflare Pages (projeto `sansa-digital`). **A implantação atual ainda não foi recuperada integralmente.** Uma versão histórica do HTML de outubro de 2026 está disponível, mas não está comprovado que seja idêntica à versão atual. Não a publique por cima do site.

## Publicação segura

O workflow `.github/workflows/deploy-pages.yml` é **manual**, sem deploy automático após push. Ele exige `public/index.html`, `public/app.js`, `public/styles.css` e arquivos em `public/assets/` antes de permitir o deploy. Antes de executar, configurar os GitHub Actions Secrets `CLOUDFLARE_API_TOKEN` (permissões mínimas para Pages) e `CLOUDFLARE_ACCOUNT_ID`. Nunca commitar tokens.

O destino é o projeto Cloudflare Pages **existente** `sansa-digital`, branch `main`. Não alterar DNS ou registros de e-mail.

## Próximas etapas

1. Recuperar e comparar todos os arquivos da implantação atual antes de preencher `public/`.
2. Corrigir o formulário com envio real, validação e proteção antispam.
3. Revisar `noindex`, `robots.txt`, `sitemap.xml`, canonical e URLs 404 identificadas no Search Console.
4. Testar e aprovar antes de publicar em produção.
