document.addEventListener('DOMContentLoaded', () => {
    const parseUrl = new URL(window.location.href);
    const pokemonName = parseUrl.searchParams.get("pokemon");
    const h1 = document.getElementById("pokemonName");
    const pokemonImage = document.getElementById("pokemonImage");
    const statsDiv = document.getElementById("stats");
    const typesDiv = document.getElementById("types");
    const weaknessesDiv = document.getElementById("weaknesses");
    const strengthsDiv = document.getElementById("strengths");
    const pokemonAudio = document.getElementById("pokemonAudio");
    const playButton = document.getElementById("playButton");
    const statTranslations = { // pas ouf, à changer via API ou fichier JSON plus tard
    "hp": "PV",
    "attack": "Attaque",
    "defense": "Défense",
    "special-attack": "Attaque Spé",
    "special-defense": "Défense Spé",
    "speed": "Vitesse"
}; 

    h1.innerText = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);



    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName).then(response => {
        return response.json();
    }).then(dataPokemon => {
        console.log(dataPokemon);
        pokemonImage.src = dataPokemon.sprites.other.showdown.front_default || dataPokemon.sprites.front_default;
        pokemonImage.alt = pokemonName; // Texte alternatif si l'image ne charge pas

        dataPokemon.stats.forEach(stat => { // Afficher les stats
            const statDiv = document.createElement("div");
            statDiv.className = "statBar"; 

            const statName = document.createElement("span");
            statName.className = "statName"; // Nom de la statistique en majuscules
            statName.innerText = statTranslations[stat.stat.name].toUpperCase(); // Traduction du nom de la statistique via le dictionnaire

            const statValue = document.createElement("span");
            statValue.className = "statValue"; // Valeur numérique de la statistique
            statValue.innerText = stat.base_stat;

            const progressBar = document.createElement("div");
            progressBar.className = "progressBar"; // Conteneur de la barre de progression
            const progress = document.createElement("div");
            progress.className = "progress"; // Barre de progression
            progress.style.width = (stat.base_stat / 255 * 100) + "%"; // 255 est la valeur max d'une stat dans Pokémon
            progressBar.appendChild(progress);

            statDiv.appendChild(statName);
            statDiv.appendChild(progressBar);
            statDiv.appendChild(statValue);
            statsDiv.appendChild(statDiv);
        });

        dataPokemon.types.forEach(type => { // Afficher les types
            const badge = document.createElement("span");
            badge.className = "badge type-" + type.type.name; // Classe pour le style en fonction du type
            badge.innerText = type.type.name;
            typesDiv.appendChild(badge);
        });

        dataPokemon.types.forEach(type => { // Récupérer les faiblesses et forces de chaque type
            fetch(type.type.url).then(response => {
                return response.json();
            }).then(typeData => {

                typeData.damage_relations.double_damage_from.forEach(weakness => { // Ajoute les faiblesses
                    const badge = document.createElement("span");
                    badge.className = "badge type-" + weakness.name; 
                    badge.innerText = weakness.name; 

                    if (!Array.from(weaknessesDiv.children).some(child => child.innerText === weakness.name)) { // evite les doublons de badge faiblesses (ex: si un pokémon a deux types eau, ca n'affiche qu'une fois la faiblesse électricité)
                        weaknessesDiv.appendChild(badge); // Ajoute le badge des faiblesses unique 
                    }
                });


                typeData.damage_relations.double_damage_to.forEach(strength => { // Ajoute les forces
                    const badge = document.createElement("span");
                    badge.className = "badge type-" + strength.name;
                    badge.innerText = strength.name;

                    if (!Array.from(strengthsDiv.children).some(child => child.innerText === strength.name)) { // si le badge n'existe pas déjà
                        strengthsDiv.appendChild(badge); // Ajoute le badge des forces
                    }
                });
            });
        });

        // Ajouter le cri du Pokémon
        if (dataPokemon.cries && dataPokemon.cries.latest) { // Vérifie si le cri le plus récent existe
            pokemonAudio.src = dataPokemon.cries.latest;
        } else if (dataPokemon.cries && dataPokemon.cries.legacy) { // Sinon, utilise le cri legacy s'il existe
            pokemonAudio.src = dataPokemon.cries.legacy;
        }
        playButton.addEventListener("click", () => { // Bouton pour jouer/mettre en pause le cri
            if (pokemonAudio.paused) {
                pokemonAudio.play();
                playButton.innerText = "⏸";
            } else {
                pokemonAudio.pause();
                playButton.innerText = "▶";
            }
        });
        pokemonAudio.addEventListener("ended", () => { // Réinitialise le bouton quand l'audio se termine pour pouvoir le rejouer
            playButton.innerText = "▶";
        });
    });
});