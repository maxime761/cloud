FROM node:16-alpine
WORKDIR /app

# Copie le fichier JavaScript dans le conteneur
COPY scripts.js /app/

# Installe express pour servir le fichier
RUN npm install express

# Script minimal pour servir scripts.js
RUN echo "const express = require('express'); const app = express(); app.use(express.static('/app')); app.listen(3000);" > server.js

CMD ["node", "server.js"]
EXPOSE 3000

