# Clima Simples

Aplicação React que consulta dados de clima via `wttr.in`.

## Desenvolvimento

- `npm run dev` — inicia o servidor de desenvolvimento.
- `npm run build` — gera a pasta `dist/` para produção.

## Publicação no GitHub Pages

Foram configurados dois scripts para publicar na branch `gh-pages` de cada repositório:

- `npm run deploy:clima`
  - Build com base `/clima/`.
  - Copia `dist/` para a worktree `.gh-pages` e envia para `origin/gh-pages`.
  - Habilite Pages em: `https://github.com/NonatoSlv/clima/settings/pages` (branch `gh-pages`).

- `npm run deploy:quase`
  - Build com base `/quase_pronto/`.
  - Copia `dist/` para a worktree `.gh-pages` e envia para `quase/gh-pages`.
  - Habilite Pages em: `https://github.com/NonatoSlv/quase_pronto/settings/pages` (branch `gh-pages`).

Observações:
- O script `scripts/deploy.js` usa `git worktree` para manter uma cópia isolada da branch `gh-pages` em `.gh-pages`.
- Caso troque o nome do repositório, ajuste o `base` no script de deploy ou no `vite.config.js`.
- Se publicar em apenas um repositório, pode remover o outro remoto e script correspondente.