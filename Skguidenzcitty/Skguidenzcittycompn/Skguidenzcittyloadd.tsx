import {Image, ScrollView, StyleSheet, View} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const skguidenzcittyloaddhtmlloader = `   <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }

          .loader {
            position: relative;
            width: 54px;
            height: 54px;
            border-radius: 10px;
          }

          .loader div {
            width: 8%;
            height: 24%;
            background: rgb(128, 128, 128);
            position: absolute;
            left: 50%;
            top: 30%;
            opacity: 0;
            border-radius: 50px;
            box-shadow: 0 0 3px rgba(0,0,0,0.2);
            animation: fade458 1s linear infinite;
          }

          @keyframes fade458 {
            from {
              opacity: 1;
            }

            to {
              opacity: 0.25;
            }
          }

          .loader .bar1 {
            transform: rotate(0deg) translate(0, -130%);
            animation-delay: 0s;
          }

          .loader .bar2 {
            transform: rotate(30deg) translate(0, -130%);
            animation-delay: -1.1s;
          }

          .loader .bar3 {
            transform: rotate(60deg) translate(0, -130%);
            animation-delay: -1s;
          }

          .loader .bar4 {
            transform: rotate(90deg) translate(0, -130%);
            animation-delay: -0.9s;
          }

          .loader .bar5 {
            transform: rotate(120deg) translate(0, -130%);
            animation-delay: -0.8s;
          }

          .loader .bar6 {
            transform: rotate(150deg) translate(0, -130%);
            animation-delay: -0.7s;
          }

          .loader .bar7 {
            transform: rotate(180deg) translate(0, -130%);
            animation-delay: -0.6s;
          }

          .loader .bar8 {
            transform: rotate(210deg) translate(0, -130%);
            animation-delay: -0.5s;
          }

          .loader .bar9 {
            transform: rotate(240deg) translate(0, -130%);
            animation-delay: -0.4s;
          }

          .loader .bar10 {
            transform: rotate(270deg) translate(0, -130%);
            animation-delay: -0.3s;
          }

          .loader .bar11 {
            transform: rotate(300deg) translate(0, -130%);
            animation-delay: -0.2s;
          }

          .loader .bar12 {
            transform: rotate(330deg) translate(0, -130%);
            animation-delay: -0.1s;
          }
        </style>
      </head>

      <body>
        <div class="loader">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
          <div class="bar6"></div>
          <div class="bar7"></div>
          <div class="bar8"></div>
          <div class="bar9"></div>
          <div class="bar10"></div>
          <div class="bar11"></div>
          <div class="bar12"></div>
        </div>
      </body>
    </html>`;

const Skguidenzcittyloadd = () => {
  const skguidenzcittyloaddNavigation = useNavigation();

  useEffect(() => {
    const skguidenzcittyloaddTimer = setTimeout(() => {
      skguidenzcittyloaddNavigation.navigate('Skguidenzcittyonbrd' as never);
    }, 6001);

    return () => {
      clearTimeout(skguidenzcittyloaddTimer);
    };
  }, [skguidenzcittyloaddNavigation]);

  return (
    <View style={styles.skguidenzcittyloaddimageBg}>
      <ScrollView
        contentContainerStyle={styles.skguidenzcittyloaddscrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Image source={require('../../assets/i/skguidenzcittloadr.png')} />
        </View>
        <View style={styles.skguidenzcittyloaddbottomWrap}>
          <WebView
            source={{html: skguidenzcittyloaddhtmlloader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 150, backgroundColor: 'transparent'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Skguidenzcittyloadd;

const styles = StyleSheet.create({
  skguidenzcittyloaddimageBg: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  skguidenzcittyloaddscrollContent: {
    flexGrow: 1,
  },

  skguidenzcittyloaddbottomWrap: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
