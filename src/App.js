import React, { Component } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const Toolbar = () => (
  <Text
    style={{
      fontSize: 22,
      fontWeight: '600',
      padding: 20,
      height: 70,
      borderBottomWidth: 2,
      backgroundColor: '#b2dfdb'
    }}
  >
    Pokemon Notes
  </Text>
);

const position = [51.505, -0.09];
const getProvider = (x, y, z) =>
  `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

const PokemonMap = ({ onShowNote, markers }) => (
  <View style={{ flex: 1 }}>
    <Map
      width={window.innerWidth}
      height={window.innerHeight - 70}
      defaultCenter={position}
      defaultZoom={13}
      provider={getProvider}
      onClick={e => {
        const latLng = e.latLng;
        console.log('onMapClick', latLng[0]);
        onShowNote(latLng[0], latLng[1]);
      }}
    >
      {markers.map((m, index) => (
        <Marker
          key={index}
          anchor={m.position}
          payload={m}
          onClick={({ event, anchor, payload }) => {
            console.log('onMarkerClick', payload);
          }}
        />
      ))}
    </Map>
    <Text
      style={{
        marginTop: 20,
        borderRadius: 30,
        alignSelf: 'center',
        backgroundColor: '#0006',
        padding: 10,
        color: 'white',
        position: 'absolute'
      }}
    >
      Tap anywhere to add notes
    </Text>
  </View>
);

class BottomPanel extends Component {
  state = {
    pokemonName: ''
  };

  clearData = () => {
    this.setState({
      pokemonName: ''
    });
  };

  onUpdateName = text => {
    this.setState({
      pokemonName: text
    });
  };

  render() {
    const { onCloseClick, selectedLocation, onSubmit } = this.props;
    return (
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          shadowColor: '#000',
          shadowRadius: 20,
          shadowOpacity: 0.2,
          position: 'absolute',
          bottom: 0,
          width: '100%'
        }}
      >
        <Text style={{ fontWeight: '600' }}>
          {`${selectedLocation.lat}, ${selectedLocation.lng}`}
        </Text>
        <TextInput
          style={{ marginTop: 20, marginBottom: 10, padding: 10 }}
          placeholder={'Masukkan Nama Pokemon…'}
          onChangeText={this.onUpdateName}
        />
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={() => setTimeout(onCloseClick, 10)}>
            <Text style={{ padding: 10, marginRight: 10 }}>Close</Text>
          </TouchableOpacity>

          <Button
            title={'Submit'}
            onPress={() => {
              onSubmit(this.state.pokemonName);
              this.clearData();
            }}
          />
        </View>
      </View>
    );
  }
}

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
