import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    renderedPokemon: [],
    searchInput: ''
  }

  componentDidMount() {
    // On mount, fetch complete pokemon collection and initial pokemon to render
    const url = 'http://localhost:3000/pokemon'
    fetch(url)
      .then(resp => resp.json())
      .then(this.setInitialPokemon)
  }

  setInitialPokemon = (pokemonCollection) => {
    // helper function that sets state of entire pokemon collection and the initial rendered pokemon
    this.setState({
      pokemon: [...pokemonCollection],
      renderedPokemon: [...pokemonCollection]
    })
  }

  handleSearchInput = ( event ) => {
    // filter the pokemon cards by the query. If query is empty, display all cards
    this.setState({ searchInput: event.target.value })
    if (event.target.value === '') { this.setState({ renderedPokemon: [...this.state.pokemon] }) }
    else { this.setState({ renderedPokemon: this.filterPokemonBySearchInput(event.target.value) }) }
  }

  filterPokemonBySearchInput = (input) => {
    return this.state.pokemon.filter( pokemon => pokemon.name.includes( input ))
  }

  handleFormSubmit = (pokemonCollection) => {
    const url = 'http://localhost:3000/pokemon'
    const configObject = this.generatePostObjectFromCollection( pokemonCollection )
    fetch(url, configObject)
      .then( resp => resp.json() )
      .then( this.addNewPokemonToState )
  }

  addNewPokemonToState = ( pokemonObj ) => {
    // receive pokemon object as json and add to pokemon collection
    this.setState({ pokemon: [...this.state.pokemon, pokemonObj] })
    if (this.state.searchInput === '') { this.setState({ renderedPokemon: [...this.state.pokemon] }) }
    else { this.setState({ renderedPokemon: this.filterPokemonBySearchInput(this.state.searchInput) }) }
  }

  generatePostObjectFromCollection = ( collection ) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: collection.name,
        hp: parseInt( collection.hp, 10 ),
        sprites: collection.sprites
      })
    }
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleFormSubmit={ this.handleFormSubmit } />
        <br />
        <Search handleSearchInput={ this.handleSearchInput } />
        <br />
        <PokemonCollection pokemon={ this.state.renderedPokemon }/>
      </Container>
    )
  }
}

export default PokemonPage
