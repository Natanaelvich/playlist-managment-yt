# Minhas Playlists do YouTube

Uma aplicação React para visualizar e gerenciar suas playlists do YouTube.
## Como usar

Antes de começar, você precisará criar um projeto no [Google Cloud Console](https://console.cloud.google.com/)  e gerar um token de autenticação para usar a API do YouTube. Consulte a [documentação do Google](https://developers.google.com/youtube/registering_an_application)  para obter mais informações.
1. Clone o repositório:

```bash

git clone https://github.com/seunome/minhas-playlists-do-youtube.git
```


1. Instale as dependências:

```bash

cd minhas-playlists-do-youtube
yarn install
```


1. Configure as credenciais da API do YouTube:

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente, substituindo os valores pelos seus próprios:

```dotenv

VITE_APP_YOUTUBE_CLIENT_ID=seu-client-id
VITE_APP_YOUTUBE_CLIENT_SECRET=seu-client-secret
VITE_APP_YOUTUBE_REDIRECT_URI=urn:ietf:wg:oauth:2.0:oob
```


1. Inicie a aplicação:

```bash

yarn dev
```



A aplicação será executada em `http://localhost:3000`.
## Funcionalidades
- Visualize suas playlists do YouTube.
- Remova vídeos das suas playlists.
## Tecnologias utilizadas 
- [React](https://reactjs.org/) 
- [Vite](https://vitejs.dev/) 
- [TypeScript](https://www.typescriptlang.org/) 
- [Tailwind CSS](https://tailwindcss.com/) 
- [Google APIs](https://github.com/googleapis/google-api-nodejs-client)
## Contribuição

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma ideia de melhoria, abra uma issue ou envie um pull request.
## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.