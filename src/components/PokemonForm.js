import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  state = {
    name: '',
    hp: 0,
    sprites: {
      front: '',
      back: ''
    }
  }

  handleNameInputChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleHpInputChange = (event) => {
    this.setState({ hp: event.target.value })
  }

  handleFrontURLInputChange = (event) => {
    this.setState({ sprites: { ...this.state.sprites, front: event.target.value } })
  }

  handleBackURLInputChange = (event) => {
    this.setState({ sprites: { ...this.state.sprites, back: event.target.value } })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.props.handleFormSubmit( this.state )
    event.target.reset()
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={ this.handleFormSubmit }>
          <Form.Group widths="equal">
            <Form.Input onChange={ this.handleNameInputChange } fluid label="Name" placeholder="Name" name="name" />
            <Form.Input onChange={ this.handleHpInputChange } fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input onChange={ this.handleFrontURLInputChange } fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input onChange={ this.handleBackURLInputChange } fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
