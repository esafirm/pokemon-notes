import React, { Component } from 'react';
import { View } from 'react-native';

import BottomPanel from './components/BottomPanel';
import Toolbar from './components/Toolbar';
import PokemonMap from './components/PokemonMap';

class App extends Component {
  state = {
    selectedLocation: {
      lat: 0,
      lng: 0
    },
    showNote: false,
    pokemonData: []
  };

  onClose = () => {
    this.setState({
      showNote: false
    });
  };

  onOpenNote = (lat, lng) => {
    this.setState({
      selectedLocation: {
        lat: lat,
        lng: lng
      },
      showNote: true
    });
  };

  onSave = name => {
    const newMarker = {
      position: [
        this.state.selectedLocation.lat,
        this.state.selectedLocation.lng
      ],
      pokemonName: name,
      showNote: false
    };

    this.setState({
      showNote: false,
      pokemonData: [...this.state.pokemonData, newMarker]
    });
  };

  render() {
    console.log('state', this.state);
    const { showNote, pokemonData, selectedLocation } = this.state;
    return (
      <View>
        <Toolbar />
        <PokemonMap onShowNote={this.onOpenNote} markers={pokemonData} />
        {showNote ? (
          <BottomPanel
            onCloseClick={this.onClose}
            selectedLocation={selectedLocation}
            onSubmit={this.onSave}
          />
        ) : null}
      </View>
    );
  }
}

export default App;
