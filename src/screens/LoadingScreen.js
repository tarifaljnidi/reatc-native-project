// import React from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import * as Font from "expo-font";
// import downloadAsync  from 'expo-file-system';
//
//
// export default class LoadingScreen extends React.Component {
//     async componentDidMount() {
//         await Font.loadAsync({
//             light: require("../../assets/fonts/Montserrat-Light.ttf"),
//             regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
//             bold: require("../../assets/fonts/Montserrat-Bold.ttf")
//         });
//
//         this.props.navigation.navigate("HomeScreen");
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// });
