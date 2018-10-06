import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const position = [51.505, -0.09];
const getProvider = (x, y, z) =>
  `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;

class PokemonMap extends React.Component {
  state = {
    dimension: Dimensions.get('window')
  };

  handler = dims => {
    const newDimension = Dimensions.get('window');
    const { dimension } = this.state;

    if (
      newDimension.width === dimension.width &&
      newDimension.height === dimension.height
    ) {
      return;
    }

    this.setState({ dimension: newDimension });
  };

  componentWillMount() {
    Dimensions.addEventListener('change', this.handler);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handler);
  }

  render() {
    const { onShowNote, markers } = this.props;
    const { dimension } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Map
          width={dimension.width}
          height={dimension.height - 70}
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
  }
}

export default PokemonMap;
