import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    side: 'front'
  }

  handleClick = () => {
    // toggle state on click between front and back of card.
    this.state.side === 'front' ? this.setState({ side: 'back' }) : this.setState({ side: 'front' })
  }

  render() {
    const { name, hp, sprites } = this.props.pokemon
    return (
      <Card>
        <div>
          <div onClick={ this.handleClick } className="image">
            <img src={ this.state.side === 'front' ? sprites.front : sprites.back } alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{ name }</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              { hp } hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
