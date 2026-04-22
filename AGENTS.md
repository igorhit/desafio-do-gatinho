# AGENTS.md — Desafio do Gatinho

Contexto completo do projeto para retomar trabalho em qualquer conversa.

---

## O que é o projeto

Randomizador para o jogo **Legends of Runeterra** (LoR). O usuário configura o que quer sortear, aperta "Gatinho!" e recebe o resultado com animações. Roda na web (browser) e futuramente como APK Android e .exe Windows.

**Dono do projeto:** Igor HIT (igorhit@github)
**Repo:** <https://github.com/igorhit/desafio-do-gatinho>

---

## Estrutura do monorepo

```text
desafio-do-gatinho/          ← raiz do monorepo
├── CLAUDE.md                ← este arquivo
├── README.md                ← documentação pública do projeto
├── package.json             ← workspaces + scripts unificados
│
├── app-expo/                ← PROJETO BASE — mexa só aqui para desenvolvimento
│   ├── app/                 ← Expo Router (telas)
│   │   ├── +html.tsx        ← configuração HTML raiz para web
│   │   ├── _layout.tsx      ← layout raiz (SafeAreaProvider)
│   │   └── index.tsx        ← tela principal (única tela)
│   ├── src/
│   │   ├── components/      ← componentes de apresentação (sem lógica)
│   │   ├── config/
│   │   │   └── difficulty.ts  ← pesos por dificuldade (editável pelo dono)
│   │   ├── data/            ← JSONs com dados mock (substituir pelos reais)
│   │   ├── hooks/
│   │   │   └── useRandomizer.ts  ← TODA a lógica de negócio fica aqui
│   │   └── utils/
│   │       └── weightedRandom.ts ← sorteio ponderado puro e testável
│   ├── assets/              ← imagens placeholder (substituir pelos reais)
│   ├── app.json             ← config Expo (nome, slug, plugins)
│   ├── babel.config.js      ← inclui react-native-reanimated/plugin
│   ├── package.json         ← deps do app
│   └── tsconfig.json
│
├── packages/
│   ├── electron/            ← wrapper para gerar .exe Windows (futuro)
│   │   ├── main.js          ← entry point Electron
│   │   └── package.json     ← electron + electron-builder
│   └── android/             ← configs EAS para APK/AAB (futuro)
│       └── eas.json         ← perfis: development / preview / production
│
└── dist/                    ← saídas de build — NUNCA commitar
    ├── web/                 ← gerado por build:web
    ├── electron/            ← gerado por build:win
    └── android/             ← gerado pelo EAS
```

**Regra de ouro:** desenvolvimento = só dentro de `app-expo/`. As pastas `packages/` e `dist/` só importam na hora de distribuir.

---

## Como rodar para desenvolvimento

```bash
cd app-expo
npm install          # só na primeira vez

npm run dev          # Expo com QR code (celular) + web
npm run dev:web      # só web — abre em localhost:8081
```

Sempre usar `--clear` na primeira execução após instalar dependências (já embutido nos scripts `dev` e `dev:web`).

---

## Scripts da raiz (distribuição)

Rodar sempre **da raiz do monorepo**, não de dentro de `app-expo/`:

```bash
npm run dev          # desenvolvimento (repassa para app-expo)
npm run dev:web      # desenvolvimento web (repassa para app-expo)
npm run build:web    # exporta web → dist/web/
npm run build:win    # build:web + empacota .exe → dist/electron/
npm run build:apk    # EAS build APK para teste interno
npm run build:aab    # EAS build AAB para Play Store
```

---

## Stack técnica

| Camada | Tecnologia | Versão |
| --- | --- | --- |
| Framework | React Native + Expo | SDK 54 |
| Navegação | Expo Router | ~6.0 |
| Animações | React Native Reanimated | ~4.1 |
| Animações (worklets) | react-native-worklets | ^0.8 |
| Gradientes | expo-linear-gradient | ~15.0 |
| Web | react-native-web + react-dom | ^0.21 / 19.1 |
| Desktop | Electron + electron-builder | ^34 / ^25 |
| Mobile build | EAS CLI | ≥12 |
| Linguagem | TypeScript | ~5.9 |

---

## Arquitetura da lógica de negócio

### Fluxo de dados

```text
difficulty.ts (config de pesos)
    ↓
useRandomizer.ts (hook — toda a lógica)
    ↓ props
Componentes (só apresentação)
```

**Regra:** nenhuma lógica de negócio dentro de componentes. Tudo passa pelo hook `useRandomizer`.

### Sistema de pesos (weightedRandom)

- Cada item no JSON tem `tags: string[]`
- `difficulty.ts` define um peso (0–∞) por tag por nível de dificuldade
- `weight: 0` → item nunca aparece naquela dificuldade
- `weight: 1` → chance neutra
- `weight > 1` → aparece mais
- Se todas as tags de um item tiverem peso 0 → item excluído do pool
- Fallback: se o pool inteiro tiver peso 0, sorteio uniforme

### Campeões 3★ vs 6★

- `sixStarChance` em `difficulty.ts` define a probabilidade de sortear 6★
- Pool separado por `estrelas === 3` ou `estrelas === 6` antes do sorteio ponderado

### Desafio Surpresa

- `surpriseChance` em `difficulty.ts` define se aparece (0–1)
- Quando não aparece, o componente `SurpriseChallenge` retorna `null` (some da tela)
- Diferente das outras seções que ficam visíveis mas acinzentadas quando desativadas

---

## Dados mock (substituir pelos reais)

Arquivos em `app-expo/src/data/`:

| Arquivo | Itens | Campos relevantes |
| --- | --- | --- |
| `champions.json` | 16 | `id, nome, estrelas (3/6), tags[], imagePath` |
| `relics.json` | 15 | `id, nome, raridade (comum/rara/epica/assinatura), tags[], imagePath` |
| `adventures.json` | 12 | `id, nome, dificuldade (facil/medio/dificil), tags[], imagePath` |
| `challenges.json` | 12 | `id, descricao` |

**Para substituir assets:** colocar imagens em `app-expo/assets/{champions,relics,adventures}/` com o nome correspondente ao `imagePath` de cada item no JSON.

> Pendente: criar `app-expo/src/utils/imageMap.ts` com mapa estático `imagePath → require(...)` para que o React Native consiga resolver as imagens dinamicamente.

---

## Problemas conhecidos e soluções já aplicadas

| Problema | Causa | Solução aplicada |
| --- | --- | --- |
| Tela branca na web | `react-native-worklets` não instalado | `npm install react-native-worklets` em `app-expo/` |
| Tela branca na web | `inset` não existe no RN | Substituído por `top/left/right/bottom` em `ItemCard.tsx` |
| Tela branca na web | `pointerEvents` no StyleSheet | Movido para prop do `Animated.View` em `SectionRow.tsx` |
| PluginError ao iniciar | Reanimated 4 não tem `app.plugin.js` | Removido de `plugins` no `app.json` — só Babel plugin |
| Metro cache corrompido | Dependências novas sem limpar cache | Sempre usar `--clear` na primeira execução |

---

## Próximos passos previstos

- [ ] Substituir dados mock pelos dados reais do LoR
- [ ] Criar `imageMap.ts` para carregar imagens dinamicamente
- [ ] Implementar build Electron e testar geração do `.exe`
- [ ] Configurar EAS e testar geração do APK
- [ ] (Opcional) Adicionar sons/haptics na revelação

---

## Comandos úteis de diagnóstico

```bash
# Checar TypeScript
cd app-expo && node_modules/.bin/tsc --noEmit

# Forçar rebuild do Metro (cache limpo)
cd app-expo && npx expo start --web --clear

# Ver o que seria incluído no bundle web
cd app-expo && npx expo export --platform web --output-dir ../dist/web
```
