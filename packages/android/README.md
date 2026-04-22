# Android — APK / AAB

Build do app para Android via EAS (Expo Application Services).

## Pré-requisitos

```bash
npm install -g eas-cli
eas login  # conta Expo
```

## Perfis de build

| Perfil | Saída | Uso |
|---|---|---|
| `development` | `.apk` | Desenvolvimento com dev client |
| `preview` | `.apk` | Teste interno — instala direto no celular |
| `production` | `.aab` | Publicação na Play Store |

## Gerar APK para teste (preview)

```bash
# Na raiz do projeto
eas build --platform android --profile preview
```

O EAS faz a build na nuvem e disponibiliza o link para download do `.apk`.

## Instalar no celular

1. Baixe o `.apk` gerado
2. Transfira para o Android
3. Habilite "Instalar de fontes desconhecidas" nas configurações
4. Abra o arquivo e instale

## Configuração do eas.json

O arquivo `packages/android/eas.json` deve ser copiado (ou linkado) para a raiz antes de rodar o EAS:

```bash
cp packages/android/eas.json eas.json
```
