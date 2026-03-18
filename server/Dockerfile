# Usa a imagem oficial do Node
FROM node:20

# Cria a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript para JavaScript
RUN npx tsc

# Comando para ligar o servidor
CMD ["node", "dist/index.js"]