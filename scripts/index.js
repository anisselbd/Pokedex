document.addEventListener('DOMContentLoaded', () => {
    const pokemonsDiv = document.getElementById("pokemons");
    const searchInput = document.getElementById("search");
    let allPokemons = [];
    
    // Récupérer les paramètres de filtrage depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const genFilter = urlParams.get('gen');
    const gameFilter = urlParams.get('game');
    console.log(genFilter, gameFilter);

    searchInput.addEventListener("input", (event) => { // Filtre les pokémons en fonction de la recherche
        const searchValue = searchInput.value.toLowerCase();
        const filteredPokemons = allPokemons.filter(pokemon => {
            const englishName = pokemon.name.toLowerCase();
            const frenchName = pokemon.frenchName ? pokemon.frenchName.toLowerCase() : "";
            return englishName.includes(searchValue) || frenchName.includes(searchValue);
        });
        displayPokemons(filteredPokemons); // Affiche les pokémons filtrés
    });

    // Si un filtre de génération est actif
    if (genFilter) {
        fetch("https://pokeapi.co/api/v2/generation/" + genFilter).then(response => {
            return response.json();
        }).then(genData => {
            allPokemons = genData.pokemon_species.map(species => ({
                name: species.name,
                url: species.url.replace('pokemon-species', 'pokemon')
            }));
            displayPokemons(allPokemons);
        });
    } 
    // Si un filtre de jeu est actif
    else if (gameFilter) {
        fetch("https://pokeapi.co/api/v2/version/" + gameFilter).then(response => {
            return response.json();
        }).then(versionData => {
            // On récupère via le version-group
            return fetch(versionData.version_group.url);
        }).then(response => {
            return response.json();
        }).then(groupData => {
            // Récupère la génération associée pour avoir les Pokémon
            return fetch(groupData.generation.url);
        }).then(response => {
            return response.json();
        }).then(genData => {
            allPokemons = genData.pokemon_species.map(species => ({
                name: species.name,
                url: species.url.replace('pokemon-species', 'pokemon')
            }));
            displayPokemons(allPokemons);
        });
    } 
    // Sinon, récupérer tous les Pokémon
    else {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=3000").then(response => {
            return response.json();
        }).then(data => {
            allPokemons = data.results;
            displayPokemons(allPokemons);
        });
    }

    function displayPokemons(pokemons) {
        pokemonsDiv.innerHTML = ""; // vide la div avant de rajouter les pokémons

        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            const div = document.createElement("div");
            div.classList.add("card");
            const h2 = document.createElement("h2");
            h2.innerText = pokemon.name;
            pokemonsDiv.appendChild(div);
            div.addEventListener("click", () => {
                window.location.href = 'pokemonDetails.html?pokemon=' + pokemon.name;
            });

            fetch(pokemon.url).then(response => { // Récupère les détails de chaque pokémon
                return response.json();
            }).then(dataPokemon => {
                const img = document.createElement("img");
                if (dataPokemon.sprites.other.dream_world.front_default) { // Priorise cette image si elle est disponible
                    img.src = dataPokemon.sprites.other.dream_world.front_default;
                } else if (dataPokemon.sprites.front_default) { // Sinon, utilise l'image par défaut
                    img.src = dataPokemon.sprites.front_default;
                } else {
                    img.src = "../assets/logo.png"; // Image par défaut si aucune image n'est disponible (ici le favicon)
                }
                div.appendChild(img);
                div.appendChild(h2);
                
                // Récupérer le nom en français
                fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon.name).then(response => {
                    return response.json();
                }).then(speciesData => {
                    const frenchName = speciesData.names.find(name => name.language.name === "fr");
                    if (frenchName) {
                        h2.innerText = frenchName.name;
                        // Stocker le nom français dans l'objet pokemon pour la recherche
                        pokemon.frenchName = frenchName.name;
                    }
                });
            });
        }
    }
});