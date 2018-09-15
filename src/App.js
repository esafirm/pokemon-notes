import React, { Component } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import Map from 'pigeon-maps';

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
const PokemonMap = ({ onShowNote }) => (
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
    />
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

const BottomPanel = ({ onCloseClick, selectedLocation }) => (
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
      placeholder={'Nama Pokemon'}
    />
    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
      <TouchableOpacity onPress={onCloseClick}>
        <Text style={{ padding: 10, marginRight: 10 }}>Close</Text>
      </TouchableOpacity>
      <Button title={'Submit'} onPress={() => console.log('onSubmit')} />
    </View>
  </View>
);

class App extends Component {
  state = {
    selectedLocation: {
      lat: 0,
      lng: 0
    },
    showNote: false
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

  render() {
    console.log('state', this.state);
    const showNote = this.state.showNote;
    return (
      <View>
        <Toolbar />
        <PokemonMap onShowNote={this.onOpenNote} />
        {showNote ? (
          <BottomPanel
            onCloseClick={this.onClose}
            selectedLocation={this.state.selectedLocation}
          />
        ) : null}
      </View>
    );
  }
}

export default App;
