# 🎮 Pokédex Interactif

Un Pokédex web interactif avec plus de 3000 Pokémon, cartes TCG et design responsive.

## ✨ Fonctionnalités

- 📊 **3000+ Pokémon** : Base de données complète de toutes les générations
- 🔍 **Recherche bilingue** : Français et anglais
- 🃏 **Cartes TCG** : Affichage des cartes Pokémon (ancienne et récente) via TCGdex API
- 🎵 **Cris audio** : Écoute les cris des Pokémon
- 📱 **Design responsive** : Fonctionne sur mobile, tablette et desktop
- 🌍 **Traductions françaises** : Noms et descriptions en français
- 🎨 **Interface moderne** : Design soigné avec animations

## 🛠️ Technologies utilisées

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, animations)
- JavaScript Vanilla (pas de framework pour l'instant)

### APIs externes
- [PokeAPI v2](https://pokeapi.co/) - Données Pokémon
- [TCGdex API](https://tcgdex.dev/) - Cartes TCG

### Backend (en développement)
- Node.js
- Express.js
- API REST CRUD

## 🚀 Installation

### Frontend uniquement
1. Clone le repository :
```bash
git clone https://github.com/anisselbd/Pokedex.git
cd Pokedex
```

2. Ouvre `pages/index.html` dans ton navigateur ou utilise Live Server

### Backend (optionnel)
1. Installe les dépendances :
```bash
npm install
```

2. Lance le serveur :
```bash
node server.js
```

Le serveur démarre sur `http://localhost:3000`

## 📂 Structure du projet

```
POKEMON/
├── assets/          # Images et ressources
├── pages/           # Pages HTML
│   ├── index.html
│   └── pokemonDetails.html
├── scripts/         # Scripts JavaScript
│   ├── index.js
│   ├── pokemonDetails.js
│   └── navbar.js
├── styles/          # Feuilles de style CSS
│   ├── global.css
│   ├── index.css
│   ├── navbar.css
│   └── pokemonDetails.css
├── server.js        # Serveur Express (API REST)
├── package.json     # Dépendances Node.js
└── README.md        # Ce fichier
```

## 🎯 Fonctionnalités à venir

- [ ] Système de favoris avec backend
- [ ] Créateur d'équipes Pokémon
- [ ] Comparateur de stats
- [ ] Base de données persistante (MongoDB)
- [ ] Authentification utilisateurs
- [ ] Mode UI personalisable 


## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à ouvrir une issue ou une pull request.

## 📝 Licence

Projet réalisé dans un cadre éducatif.

## 👨‍💻 Auteur

Créé par [anisselbd](https://github.com/anisselbd)

---

⭐ N'oublie pas de mettre une étoile si tu aimes ce projet !
