'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Animated, Easing, View} from 'react-native';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.scaleValue = new Animated.Value(0);
    // Bindings
    this.scale = this.scale.bind(this);
    this._onPress = this._onPress.bind(this);

    this.buttonScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 0.8, 1],
      outputRange: [1, 0.8, 1.1, 1],
    });

    this.state = {
      showSelection: false,
    };
  }
  render() {
    return (
      <TouchableHighlight underlayColor="#00000000" onPress={this._onPress}>
        <View>
          <Animated.Image
            source={{uri: this.props.stateImageArray[0]}}
            style={[
              this.props.style,
              {
                transform: [{scale: this.buttonScale}],
              },
            ]}
          />
        </View>
      </TouchableHighlight>
    );
  }

  _onPress() {
    this.scale();

    // from https://facebook.github.io/react-native/docs/performance.html#my-touchablex-view-isn-t-very-responsive
    requestAnimationFrame(() => {
      this.props.onPress();
    });
  }
  scale() {
    this.scaleValue.setValue(0);
    Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeInOutBack,
      useNativeDriver: true,
    }).start(this.props.animationDoneCallBack());
  }
}

ListViewItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  stateImageArray: PropTypes.array.isRequired,
  style: PropTypes.any,
  selected: PropTypes.bool,
  animationDoneCallBack: PropTypes.func,
};

export default ListViewItem;
