# Android — APK / AAB

Build do app para Android via EAS (Expo Application Services).

## Fluxo completo (da raiz do monorepo)

```bash
# APK para teste interno
npm run build:apk

# AAB para publicação na Play Store
npm run build:aab
```

---

## Pré-requisitos (primeira vez)

```bash
npm install -g eas-cli
eas login   # conta Expo/EAS
```

## Perfis de build

| Perfil | Saída | Uso |
| --- | --- | --- |
| `development` | `.apk` | Dev client para desenvolvimento |
| `preview` | `.apk` | Teste interno — instala direto no celular |
| `production` | `.aab` | Publicação na Play Store |

## Configurar o EAS no projeto

O `eas.json` precisa ficar na raiz do projeto Expo (`app-expo/`):

```bash
# Da raiz do monorepo
cp packages/android/eas.json app-expo/eas.json
```

Depois rode o build de dentro de `app-expo/`:

```bash
cd app-expo
eas build --platform android --profile preview
```

Ou use os scripts da raiz do monorepo que já fazem isso automaticamente.

## Instalar o APK no celular

1. Baixe o `.apk` gerado pelo link que o EAS fornece
2. Transfira para o Android (cabo USB ou Google Drive)
3. Habilite "Instalar de fontes desconhecidas" nas configurações do Android
4. Abra o arquivo e instale
