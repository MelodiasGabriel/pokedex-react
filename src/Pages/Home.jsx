import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar'
import { Box, Container, Grid} from '@mui/material'
import PokemonCard from '../Components/PokemonCard'
import Skeletons  from '../Components/Skeletons'
import { useNavigate } from 'react-router-dom';
import PaginationSelector from '../Components/SelectorPagination';
import Paginacao from '../Components/Pagination';

const Home = ({ setPokemonData }) => {

        const [pokemons, setPokemons] = useState([]);
        const [itensPerPage, setItensPerPage] = useState(24)
        const [currentPage, setCurrentPage] = useState(0)

        const pages = Math.ceil(pokemons.length / itensPerPage)
        const startIndex = currentPage * itensPerPage;
        const endIndex = startIndex + itensPerPage;
        const currentItens = pokemons.slice(startIndex, endIndex)

        const navigate = useNavigate();

    useEffect(() => {
        getPokemons()
    },[]);

    useEffect(() => {
      setCurrentPage(0)
    }, [itensPerPage])

    /* const [itens, setItens] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then(response => response.json())
        .then(data => setItens(data))

      setItens(result)
    }
    fetchData()
  }, []) */

    const getPokemons = () => {
        var endpoints = [];
        for (var i = 1; i < 500; i++){
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
            currentItens.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.data.id}>
                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                    <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                  </Box>
              </Grid>
            ))
          }
        </Grid>
        <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage} />
        <Paginacao setCurrentPage={setCurrentPage} pages={pages} currentPage={currentPage} />
      </Container>
    </div>
  )
}

export default Home
