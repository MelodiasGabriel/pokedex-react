import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar'
import { Box, Container, Grid} from '@mui/material'
import PokemonCard from '../Components/PokemonCard'
import Skeletons  from '../Components/Skeletons'
import { useNavigate } from 'react-router-dom';

const Home = ({ setPokemonData }) => {
        const [pokemons, setPokemons] = useState([]);

        const navigate = useNavigate();

    useEffect(() => {
        getPokemons()
    },[]);

    const getPokemons = () => {
        var endpoints = [];
        for (var i = 1; i < 10; i++){
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        /* console.log(endpoints); */
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
        return response;
        /* axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err)); */
    };

    const pokemonFilter = (name) => {
      var filteredPokemons = [];
      if(name === ""){
          getPokemons();
      }
      for (var i in pokemons) {
        if(pokemons[i].data.name.toLowerCase().includes(name.toLowerCase())) {
          filteredPokemons.push(pokemons[i]);
        }
      }
      console.log(filteredPokemons);
      setPokemons(filteredPokemons);
    };

    const pokemonPickHandler = (pokemonData) => {
      setPokemonData(pokemonData)
      navigate('/profile')

    };

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter}/>
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemons.length === 0 ? <Skeletons/>: 
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box onClick={()=>pokemonPickHandler(pokemon.data)}>
                  <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                  </Box>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </div>
  )
}

export default Home
