# Utiliser l'image officielle de Node.js 14, compatible avec Strapi v3.6.11
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json si disponibles
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port
EXPOSE 1337

# Démarrer l'application Strapi
CMD ["npm", "run", "develop"]
