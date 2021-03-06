// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
//
// import Button from 'react-native-smart-button'; // 2.0.0
// import TimerEnhance from 'react-native-smart-timer-enhance'; // 1.0.3
// import Toast from 'react-native-smart-toast'; // 1.1.1
//
// class LoadingToast extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   render() {
//     return (
//       <View style={{ paddingTop: 64, flex: 1, backgroundColor: '#fff' }}>
//         <Button
//           onPress={this._showBottomToast}
//           touchableType={Button.constants.touchableTypes.blur}
//           style={{
//             margin: 10,
//             justifyContent: 'center',
//             height: 40,
//             backgroundColor: 'red',
//             borderRadius: 3,
//             borderWidth: StyleSheet.hairlineWidth,
//             borderColor: 'red',
//           }}
//           textStyle={{ fontSize: 17, color: 'white' }}>
//           show bottom (底部显示)
//         </Button>
//
//
//         <Toast ref={component => (this._toast = component)} marginTop={64}>
//           Unable to connect to apple store
//         </Toast>
//       </View>
//     );
//   }
//
//   _showTopToast = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.top,
//     });
//   };
//
//   _showCenterToast = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.center,
//       children: (
//         <View>
//           <Text style={{ color: 'yellow' }}>Unalbe to download now</Text>
//         </View>
//       ),
//     });
//   };
//
//   _showBottomToast = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.bottom,
//       children: 'Unalbe to upload now',
//     });
//   };
//
//   _showFastToast = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.center,
//       duration: 255,
//       children: 'Unable to connect to apple store',
//     });
//   };
//
//   _showFastToastAndAnimatedHide = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.center,
//       duration: 255,
//       children: 'Unable to connect to google store',
//       animationEnd: () => {
//         this._toast._toastAnimationToggle = this.setTimeout(() => {
//           this._toast.hide({
//             duration: 0,
//             animationEnd: () => {
//               //do sth...
//             },
//           });
//         }, 3000);
//       },
//     });
//   };
//
//   _showImmediateToast = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.center,
//       duration: 0,
//       children: 'Unable to connect to wifi',
//     });
//   };
//   _showImmediateToastAndAnimatedHide = () => {
//     this._toast.show({
//       position: Toast.constants.gravity.center,
//       duration: 0,
//       children: 'Unable to connect to wlan',
//       animationEnd: () => {
//         this._toast._toastAnimationToggle = this.setTimeout(() => {
//           this._toast.hide({
//             animationEnd: () => {
//               //do sth...
//             },
//           });
//         }, 3000);
//       },
//     });
//   };
// }
//
// export default TimerEnhance(LoadingToast);
