# Utiliser l'image officielle de Node.js
FROM node:16

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Nettoyer le cache npm et installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser une image nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire de nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
