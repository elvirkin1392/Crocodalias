import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from "react-native-webview";
import { useState } from "react";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState({
    status: "light",
    top: "#272727",
    bottom: "#121212",
  });

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <StatusBar style="auto" />

      {/*<WebView*/}
      {/*    style={*/}
      {/*      loaded*/}
      {/*          ? { flex: 1, backgroundColor: themeColors.bottom }*/}
      {/*          : { flex: 0, height: 0, opacity: 0 }*/}
      {/*    }*/}
      {/*    source={{*/}
      {/*      uri: "http://192.168.1.108:5173/",*/}
      {/*    }}*/}
      {/*    javaScriptEnabled={true}*/}
      {/*    domStorageEnabled={true}*/}
      {/*    hideKeyboardAccessoryView={true}*/}
      {/*    originWhitelist={["*"]}*/}
      {/*    startInLoadingState={true}*/}
      {/*    onLoad={() => {*/}
      {/*      setTimeout(() => {*/}
      {/*        setLoaded(true);*/}
      {/*      }, 1000);*/}
      {/*    }}*/}
      {/*    onMessage={(event) => {*/}
      {/*      const { type, payload } = JSON.parse(event.nativeEvent.data);*/}

      {/*      switch (type) {*/}
      {/*        case "SWITCH_THEME": {*/}
      {/*          setThemeColors(payload);*/}
      {/*          break;*/}
      {/*        }*/}
      {/*        default:*/}
      {/*      }*/}
      {/*    }}*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
