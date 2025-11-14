#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { existsSync, rmSync, mkdirSync, cpSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Usage: node scripts/deploy.js --remote <origin|quase> --base </clima/|/quase_pronto/>

const args = process.argv.slice(2)
const getArg = (name, def = undefined) => {
  const idx = args.indexOf(`--${name}`)
  return idx !== -1 ? args[idx + 1] : def
}

const remote = getArg('remote')
const base = getArg('base')
if (!remote || !base) {
  console.error('Erro: use --remote <origin|quase> e --base </repo/>')
  process.exit(1)
}

const root = resolve('.')
const worktreeDir = resolve(root, '.gh-pages')

const run = (cmd, opts = {}) => {
  console.log(`> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', ...opts })
}

// 1) Build com base apropriada
run(`npx vite build --base=${base}`)

// 2) Garantir worktree para gh-pages
if (!existsSync(worktreeDir)) {
  run('git worktree add -B gh-pages .gh-pages')
}

// 3) Limpar conteúdo anterior e copiar dist
rmSync(worktreeDir, { recursive: true, force: true })
mkdirSync(worktreeDir, { recursive: true })
cpSync(resolve(root, 'dist'), worktreeDir, { recursive: true })

// 4) Criar .nojekyll
writeFileSync(resolve(worktreeDir, '.nojekyll'), '')

// 5) Commitar e enviar
run('git -C .gh-pages add -A')
try {
  run('git -C .gh-pages commit -m "Deploy: build dist to gh-pages"')
} catch (e) {
  // Sem mudanças a commitar, segue adiante
  console.log('Nenhuma alteração para commit em gh-pages.')
}
run(`git -C .gh-pages push -u ${remote} gh-pages`)

console.log(`Deploy concluído em gh-pages para remoto '${remote}' com base '${base}'.`)