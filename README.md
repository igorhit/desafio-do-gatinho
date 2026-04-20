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

## Como rodar

```bash
# Instalar dependências
npm install

# Iniciar (web ou QR code para celular)
npx expo start

# Só web
npx expo start --web
```

Acesse `http://localhost:8081` no browser, ou escaneie o QR code com o app **Expo Go** no celular.

---

## Como substituir os assets mock pelos reais

Os assets ficam em `assets/` com a seguinte estrutura:

```
assets/
├── champions/    # Imagens de campeões
├── relics/       # Imagens de relíquias
├── adventures/   # Imagens de aventuras
└── ui/           # Assets de interface
```

Cada item nos arquivos JSON (`src/data/`) possui um campo `imagePath` que aponta para o arquivo dentro de `assets/`. Por exemplo:

```json
{ "id": "jinx", "imagePath": "champions/jinx.png" }
```

Basta colocar o arquivo `assets/champions/jinx.png` e o componente `ItemCard` carregará automaticamente via `require`.

> **Nota:** Para usar `require()` dinâmico no React Native, você precisará criar um mapa de imagens estático em `src/utils/imageMap.ts` apontando `imagePath → require(...)`.

---

## Como ajustar dificuldade e tags

Edite `src/config/difficulty.ts`:

```ts
const difficultyConfig = {
  dificil: {
    label: 'Difícil',
    surpriseChance: 0.5,   // Chance do Desafio Surpresa aparecer (0–1)
    sixStarChance: 0.1,    // Chance de sortear campeão 6★ (0–1)
    tagWeights: [
      { tag: 'forte', weight: 0.0 },  // 0 = nunca aparece
      { tag: 'comum', weight: 1.5 },  // >1 = aparece mais
      // ...
    ],
  },
};
```

**Regras dos pesos:**
- `weight: 0` → item com essa tag nunca é sorteado nessa dificuldade
- `weight: 1` → peso neutro (chance normal)
- `weight: 2` → aparece com o dobro de frequência

Para adicionar novas tags, basta adicioná-las ao JSON dos itens e incluir o peso correspondente em cada nível de dificuldade.

---

## Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| React Native + Expo SDK 54 | Framework base |
| Expo Router | Navegação baseada em arquivos |
| React Native Reanimated 4 | Animações performáticas |
| Expo Linear Gradient | Gradientes e visuais de raridade |
| TypeScript | Tipagem em todo o projeto |

---

## Estrutura do projeto

```
desafio-do-gatinho/
├── app/
│   ├── _layout.tsx         # Layout raiz (Expo Router)
│   └── index.tsx           # Tela principal
├── src/
│   ├── components/
│   │   ├── ItemCard.tsx         # Card animado reutilizável
│   │   ├── SectionRow.tsx       # Linha com toggle on/off
│   │   ├── ChampionSlot.tsx     # Seção de campeão
│   │   ├── RelicSlot.tsx        # Seção de relíquias
│   │   ├── AdventureSlot.tsx    # Seção de aventura
│   │   ├── SurpriseChallenge.tsx # Desafio surpresa animado
│   │   ├── DifficultySelector.tsx # Seletor de dificuldade
│   │   └── GatinhoButton.tsx    # Botão principal com animação
│   ├── config/
│   │   └── difficulty.ts        # Configuração de dificuldade e pesos
│   ├── data/
│   │   ├── champions.json
│   │   ├── relics.json
│   │   ├── adventures.json
│   │   └── challenges.json
│   ├── hooks/
│   │   └── useRandomizer.ts     # Lógica central de randomização
│   └── utils/
│       └── weightedRandom.ts    # Sorteio ponderado puro e testável
└── assets/
    ├── champions/
    ├── relics/
    ├── adventures/
    └── ui/
```
