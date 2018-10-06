import React from 'react';
import { View, TouchableOpacity, Button, TextInput, Text } from 'react-native';
import { Animated } from 'react-native-web';

class BottomPanel extends React.Component {
  state = {
    pokemonName: '',
    translationY: new Animated.Value(100)
  };

  componentDidMount() {
    Animated.timing(this.state.translationY, {
      toValue: 0,
      duration: 400
    }).start();
  }

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
      <Animated.View
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
          width: '100%',
          transform: [{ translateY: this.state.translationY }]
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
      </Animated.View>
    );
  }
}

export default BottomPanel;
