const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());

// -- Define your route listeners here! --

// chamando a api toda de pokemons
app.get("/pokemon", (req, res) => {
    return res.json(allPokemon);
  });

//filtrando os pokemons na api
  app.get("/contacts/search", (req, res) => {
    const queryParams = req.query;
    for (let key in queryParams) {
        const foundPokemon = allPokemon.find((pokemonElement) => {
          if (typeof pokemonElement[key] === "string") {
            return Math.round(pokemonElement[key]) === Math.round(queryParams[key]);
          }
          return pokemonElement[key]
            .toLowerCase()
            .includes(queryParams[key].toLowerCase());
        });
    
        if (foundPokemon) {
          return res.json(foundPokemon);
        } else {
          return res.json({ msg: "Contact not found." });
        }
      }
});

//chamando item da api por id
  app.get("/pokemon/:id", (req, res) => {
    const id = req.params.id;
    const foundPokemon = allPokemon.find((pokemonElement) => {
        return pokemonElement.id === id;
      });
    
      if (foundPokemon) {
        return res.json(foundPokemon);
      } else {
        return res.json({ msg: "Pokemon not found." });
      }
    });

    //criando um novo pokemon
    app.post("/pokemon", (req, res) => {
    
        const formData = req.body;
      
        const newPokemon = {
          id: "387",
          name: formData.name,
          type: formData.type,
          height: formData.height,
          weight: formData.weight,
          sprite: formData.sprite,
        };
      
       
        allPokemon.push(newPokemon);
      
        return res.json(newPokemon);
      });

//editando um pokemon
      app.put("/pokemon/:id", (req, res) => {

        const formData = req.body;
    
        const id = req.params.id;
        const foundPokemon = allPokemon.find((pokemonElement) => {
          return pokemonElement.id === id;
        });

        const index = pokemonElement.indexOf(foundPokemon);
        allPokemon[index] = { ...foundPokemon, ...formData };
      
        return res.json(allPokemon[index]);
      });
      
//deletando um pokemon
app.delete("/pokemon/:id", (req, res) => {
    const index = allPokemon.findIndex((pokemonElement) => {
      return pokemonElement.id === req.params.id;
    });
  
    if (index > 0) {
      allPokemon.splice(index, 1);
      return res.json({ msg: "Contact deleted successfully" });
    } else {
      return res.json({ msg: "Contact not found." });
    }
  });


app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
