const express = require("express");
const app = express();
const PORT = 3000;

// 1) middleware JSON
app.use(express.json());

// 2) données en mémoire (NOTE: let, pas const)
let pokemons = [
  { id: 1, name: "Pikachu", type: "Electric" },
  { id: 2, name: "Bulbasaur", type: "Grass/Poison" }
];

// 3) routes
app.get("/", (req, res) => res.send("API ok"));

app.get("/api/pokemons", (req, res) => {
  res.json(pokemons);
});

app.get("/api/pokemons/:id", (req, res) => {        // utile pour débug
  const id = Number(req.params.id);
  const p = pokemons.find(x => x.id === id);
  if (!p) return res.status(404).json({ error: "Pokémon non trouvé" });
  res.json(p);
});

app.post("/api/pokemons", (req, res) => {
  const newPokemon = { id: Date.now(), ...req.body };
  pokemons.push(newPokemon);
  res.status(201).json(newPokemon);
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = Number(req.params.id);                          // ← cast en number correction du bug string vs number
  console.log("PUT id =", id, "types:", typeof id, pokemons.map(p=>typeof p.id));
  const index = pokemons.findIndex(p => p.id === id);        
  if (index === -1) return res.status(404).json({ error: "Pokémon non trouvé" });
  pokemons[index] = { ...pokemons[index], ...req.body };
  res.json(pokemons[index]);
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = pokemons.length;
  pokemons = pokemons.filter(p => p.id !== id);
  if (pokemons.length === before) return res.status(404).json({ error: "Pokémon non trouvé" });
  res.json({ message: "Pokemon supprimé" });
});

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));