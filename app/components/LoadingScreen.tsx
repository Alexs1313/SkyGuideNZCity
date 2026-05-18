import {Image, Platform, ScrollView, StyleSheet, View} from 'react-native';

import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

const loadhtmlloader = `<!DOCTYPE html>
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
      overflow: hidden;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader {
      --fill-color: #5c3d99;
      --shine-color: #5c3d9933;
      transform: scale(0.5);
      width: 100px;
      height: 100px;
      position: relative;
      filter: drop-shadow(0 0 10px var(--shine-color));
    }

    .loader svg {
      width: 100px;
      height: 100px;
    }

    .loader #pegtopone {
      position: absolute;
      animation: flowe-one 1s linear infinite;
    }

    .loader #pegtoptwo {
      position: absolute;
      opacity: 0;
      transform: scale(0) translateY(-200px) translateX(-100px);
      animation: flowe-two 1s linear infinite;
      animation-delay: 0.3s;
    }

    .loader #pegtopthree {
      position: absolute;
      opacity: 0;
      transform: scale(0) translateY(-200px) translateX(100px);
      animation: flowe-three 1s linear infinite;
      animation-delay: 0.6s;
    }

    .loader svg g path:first-child {
      fill: var(--fill-color);
    }

    @keyframes flowe-one {
      0% {
        transform: scale(0.5) translateY(-200px);
        opacity: 0;
      }

      25% {
        transform: scale(0.75) translateY(-100px);
        opacity: 1;
      }

      50% {
        transform: scale(1) translateY(0px);
        opacity: 1;
      }

      75% {
        transform: scale(0.5) translateY(50px);
        opacity: 1;
      }

      100% {
        transform: scale(0) translateY(100px);
        opacity: 0;
      }
    }

    @keyframes flowe-two {
      0% {
        transform: scale(0.5) rotateZ(-10deg) translateY(-200px) translateX(-100px);
        opacity: 0;
      }

      25% {
        transform: scale(1) rotateZ(-5deg) translateY(-100px) translateX(-50px);
        opacity: 1;
      }

      50% {
        transform: scale(1) rotateZ(0deg) translateY(0px) translateX(-25px);
        opacity: 1;
      }

      75% {
        transform: scale(0.5) rotateZ(5deg) translateY(50px) translateX(0px);
        opacity: 1;
      }

      100% {
        transform: scale(0) rotateZ(10deg) translateY(100px) translateX(25px);
        opacity: 0;
      }
    }

    @keyframes flowe-three {
      0% {
        transform: scale(0.5) rotateZ(10deg) translateY(-200px) translateX(100px);
        opacity: 0;
      }

      25% {
        transform: scale(1) rotateZ(5deg) translateY(-100px) translateX(50px);
        opacity: 1;
      }

      50% {
        transform: scale(1) rotateZ(0deg) translateY(0px) translateX(25px);
        opacity: 1;
      }

      75% {
        transform: scale(0.5) rotateZ(-5deg) translateY(50px) translateX(0px);
        opacity: 1;
      }

      100% {
        transform: scale(0) rotateZ(-10deg) translateY(100px) translateX(-25px);
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <div class="loader">
    ${[1, 2, 3]
      .map(
        (_, index) => `
        <svg id="pegtop${
          index === 0 ? 'one' : index === 1 ? 'two' : 'three'
        }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <filter id="shine${index}">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <mask id="mask${index}">
              <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="white" />
            </mask>

            <radialGradient id="gradient-1-${index}" cx="50" cy="66" fx="50" fy="66" r="30" gradientTransform="translate(0 35) scale(1 0.5)" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="black" stop-opacity="0.3" />
              <stop offset="50%" stop-color="black" stop-opacity="0.1" />
              <stop offset="100%" stop-color="black" stop-opacity="0" />
            </radialGradient>

            <radialGradient id="gradient-2-${index}" cx="55" cy="20" fx="55" fy="20" r="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="white" stop-opacity="0.3" />
              <stop offset="50%" stop-color="white" stop-opacity="0.1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>

            <radialGradient id="gradient-3-${index}" cx="85" cy="50" fx="85" fy="50">
              <stop offset="0%" stop-color="white" stop-opacity="0.3" />
              <stop offset="50%" stop-color="white" stop-opacity="0.1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>

            <radialGradient id="gradient-4-${index}" cx="50" cy="58" fx="50" fy="58" r="60" gradientTransform="translate(0 47) scale(1 0.2)">
              <stop offset="0%" stop-color="white" stop-opacity="0.3" />
              <stop offset="50%" stop-color="white" stop-opacity="0.1" />
              <stop offset="100%" stop-color="white" stop-opacity="0" />
            </radialGradient>

            <linearGradient id="gradient-5-${index}" x1="50" y1="90" x2="50" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="black" stop-opacity="0.2" />
              <stop offset="40%" stop-color="black" stop-opacity="0" />
            </linearGradient>
          </defs>

          <g>
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="currentColor" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-1-${index})" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="none" stroke="white" opacity="0.3" stroke-width="3" filter="url(#shine${index})" mask="url(#mask${index})" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-2-${index})" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-3-${index})" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-4-${index})" />
            <path d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z" fill="url(#gradient-5-${index})" />
          </g>
        </svg>
      `,
      )
      .join('')}
  </div>
</body>
</html>`;

const LoadingScreen = () => {
  const loadNavigation = useNavigation();

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      loadNavigation.navigate('Onboarding' as never);
    }, 6001);

    return () => {
      clearTimeout(loadTimer);
    };
  }, [loadNavigation]);

  return (
    <View style={styles.loadimageBg}>
      <ScrollView
        contentContainerStyle={styles.loadscrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          {Platform.OS === 'android' ? (
            <Image
              source={require('../../assets/i/sky2.png')}
              style={{width: 210, height: 210, borderRadius: 45}}
            />
          ) : (
            <Image source={require('../../assets/i/skguidenzcittloadr.png')} />
          )}
        </View>
        <View style={styles.loadbottomWrap}>
          <WebView
            source={{html: loadhtmlloader}}
            scrollEnabled={false}
            originWhitelist={['*']}
            style={{width: 260, height: 150, backgroundColor: 'transparent'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loadimageBg: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  loadscrollContent: {
    flexGrow: 1,
  },

  loadbottomWrap: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
