document.addEventListener('DOMContentLoaded', () => {
    const pokemonsDiv = document.getElementById("pokemons");
    const searchInput = document.getElementById("search");
    let allPokemons = [];

    searchInput.addEventListener("input", (event) => { // Filtre les pokémons en fonction de la recherche
        const filteredPokemons = allPokemons.filter(pokemon => {
            return pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase());
        });
        displayPokemons(filteredPokemons); // Affiche les pokémons filtrés
    });

    fetch("https://pokeapi.co/api/v2/pokemon?limit=3000").then(response => { // Récupère la liste de tous les pokémons
        return response.json();
    }).then(data => { // Récupère les données de la réponse
        allPokemons = data.results; // Stocke tous les pokémons dans une variable globale
        displayPokemons(allPokemons); // Affiche tous les pokémons au chargement de la page
    });

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
            });
        }
    }
});