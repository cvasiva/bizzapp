/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path, Text as SvgText, TextPath} from 'react-native-svg';

const Stamp = ({company}) => {
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.innerCircle}>
          <Svg viewBox="0 0 500 500" style={styles.svg}>
            <Path
              id="curve"
              d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
              fill="white"
            />
            <SvgText>
              <TextPath href="#curve" style={styles.textPath}>
                &nbsp;|&nbsp;{company}
              </TextPath>
            </SvgText>
          </Svg>
        </View>
        <View style={styles.smallCircle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    alignItems: 'center',
    marginLeft: '2.8%',
  },
  circleContainer: {
    alignItems: 'center',
  },
  innerCircle: {
    color: 'black',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'darkblue',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    width: 54,
    height: 54,
    marginTop: 1,
  },
  textPath: {
    fontSize: 24,
    color: 'darkblue',
    fontWeight: 'bold',
  },
  smallCircle: {
    color: 'black',
    borderRadius: 12.5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'darkblue',
    width: 25,
    height: 25,
    marginTop: 1.1,
    position: 'absolute',
    left: -30,
  },
});

export default Stamp;
