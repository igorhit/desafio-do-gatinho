# Desafio do Gatinho 🐱

Randomizador para o jogo **Legends of Runeterra**. Configure as opções, aperte "Gatinho!" e receba seu sorteio com animações.

## O que o app faz

- Sorteia um **Campeão/Deck** (3 ou 6 estrelas)
- Sorteia **3 Relíquias** (com raridade variada)
- Sorteia uma **Aventura**
- Pode aparecer um **Desafio Surpresa** aleatório
- Sistema de **dificuldade** com pesos por tag (Fácil / Normal / Difícil)
- Cada seção pode ser ligada/desligada individualmente
- Animações de revelação com React Native Reanimated

---

## Estrutura do monorepo

```text
desafio-do-gatinho/
├── app-expo/               ← Projeto base (Expo + React Native)
│   ├── app/                ← Expo Router (telas)
│   ├── src/                ← Componentes, hooks, dados, config
│   ├── assets/             ← Imagens e ícones
│   └── package.json
│
├── packages/
│   ├── electron/           ← Wrapper para gerar .exe Windows
│   └── android/            ← Configs EAS para gerar APK/AAB
│
├── dist/                   ← Saídas de build (gitignored)
│   ├── web/                ← Build web (base para o Electron)
│   ├── electron/           ← Executável Windows gerado
│   └── android/            ← APK/AAB gerado
│
└── package.json            ← Scripts unificados do monorepo
```

---

## Desenvolvimento

```bash
# Instalar dependências
cd app-expo && npm install

# Rodar (web + QR code celular)
npm run dev

# Rodar só web
npm run dev:web
```

> Use `--clear` se mudar dependências ou ver comportamento estranho:
> `cd app-expo && npx expo start --web --clear`

---

## Gerar executável Windows (.exe)

```bash
# Na raiz do monorepo — faz tudo em sequência
npm run build:win
```

Isso executa:

1. `build:web` — exporta o app para `dist/web/`
2. `build:win` (Electron) — empacota `dist/web/` num `.exe` em `dist/electron/`

> Primeira vez: `cd packages/electron && npm install`

Veja mais detalhes em [packages/electron/README.md](packages/electron/README.md).

---

## Gerar APK Android

```bash
# Na raiz do monorepo
npm run build:apk    # APK para teste interno
npm run build:aab    # AAB para Play Store
```

> Requer `eas-cli` instalado e conta Expo: `npm install -g eas-cli && eas login`

Veja mais detalhes em [packages/android/README.md](packages/android/README.md).

---

## Como substituir os assets mock pelos reais

Os assets ficam em `app-expo/assets/` com a seguinte estrutura:

```text
assets/
├── champions/    # Imagens de campeões
├── relics/       # Imagens de relíquias
├── adventures/   # Imagens de aventuras
└── ui/           # Assets de interface
```

Cada item nos arquivos JSON (`app-expo/src/data/`) possui um campo `imagePath`.
Basta colocar o arquivo correspondente em `assets/` e o componente `ItemCard` carregará automaticamente.

> **Nota:** Para `require()` dinâmico no React Native, crie um mapa estático em `app-expo/src/utils/imageMap.ts` apontando `imagePath → require(...)`.

---

## Como ajustar dificuldade e tags

Edite `app-expo/src/config/difficulty.ts`:

```ts
const difficultyConfig = {
  dificil: {
    surpriseChance: 0.5,   // Chance do Desafio Surpresa aparecer (0–1)
    sixStarChance: 0.1,    // Chance de sortear campeão 6★ (0–1)
    tagWeights: [
      { tag: 'forte', weight: 0.0 },  // 0 = nunca aparece
      { tag: 'comum', weight: 1.5 },  // >1 = aparece mais
    ],
  },
};
```

---

## Tecnologias utilizadas

| Tecnologia | Uso |
| --- | --- |
| React Native + Expo SDK 54 | Framework base |
| Expo Router | Navegação baseada em arquivos |
| React Native Reanimated 4 | Animações performáticas |
| Expo Linear Gradient | Gradientes e visuais de raridade |
| Electron + electron-builder | Empacotamento Windows |
| EAS Build | Build Android (APK/AAB) |
| TypeScript | Tipagem em todo o projeto |
