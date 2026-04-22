# Electron — Desktop (Windows)

Wrapper que empacota a build web do app num `.exe` standalone.

## Pré-requisitos

1. Gerar a build web do app principal:
   ```bash
   # Na raiz do projeto
   npx expo export --platform web
   # Isso gera dist/web/ automaticamente via outputDir no app.json
   ```
   > Se a saída for para outra pasta, copie o conteúdo para `dist/web/`.

2. Instalar as deps do Electron:
   ```bash
   cd packages/electron
   npm install
   ```

## Rodar em desenvolvimento

```bash
cd packages/electron
npm start
```

## Gerar o `.exe`

```bash
cd packages/electron

# Portátil (sem instalação, arquivo único)
npm run build

# Instalador NSIS (com wizard de instalação)
npm run build:installer
```

O executável gerado fica em `dist/electron/`.
