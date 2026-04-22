# Electron — Desktop (Windows)

Wrapper que empacota a build web do app num `.exe` standalone.

## Fluxo completo (da raiz do monorepo)

```bash
# 1. Gera a build web do app
npm run build:web

# 2. Gera o .exe portátil
npm run build:win
```

O executável fica em `dist/electron/`.

---

## Rodar em desenvolvimento (sem gerar .exe)

```bash
# Na raiz
npm run build:web        # precisa existir antes de abrir o Electron

# Depois, na pasta do Electron
cd packages/electron
npm install              # só na primeira vez
npm run dev
```

## Gerar apenas o .exe (sem o script da raiz)

```bash
cd packages/electron
npm install              # só na primeira vez

# Portátil (arquivo único, sem instalação)
npm run build:win

# Instalador NSIS (wizard de instalação)
npm run build:installer
```

## Estrutura de dependência

```text
npm run build:win (raiz)
  └── npm run build:web (app-expo)     → gera dist/web/
        └── expo export --platform web
  └── npm run build:win (electron)     → lê dist/web/, gera dist/electron/
        └── electron-builder
```
