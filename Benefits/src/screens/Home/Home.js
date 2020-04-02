import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import styles from './styles';

const Home = () => {
    return (
        <View style={ styles.body }>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <Text>I'm home</Text>
          </SafeAreaView>
        </View>
    );
};

Home.propTypes = {};

export default Home;
