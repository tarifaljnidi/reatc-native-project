import React,{PureComponent,useState} from 'react';
import {AsyncStorage, Linking ,Share, View ,Image,ActivityIndicator, Alert ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { IMAGE } from '../constants/image';
// import { Fonts } from './src/constants/fonts';
import { getArticles,getArticleLinks , getMenusideGategory} from '../services/news';
 import HTML from 'react-native-render-html';
// import  WebView from 'react-native-webview';
import  Time  from '../components/time';
import  Time1  from '../components/time1';
import moment from 'moment';
import axios from 'axios';
// import  HTMLView  from 'react-native-htmlview';
// import InfiniteScroll from 'react-native-infinite-looping-scroll';
 // import HTMLText from "react-htmltext";
// import * as Font from 'expo-font';
// import * as Expo from 'expo';
// import moment from 'moment';
// import DisplayHTML from 'react-native-display-html';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Ionicons from 'react-native-vector-icons/Ionicons';
 // import Icon from 'react-native-vector-icons/Fontisto';
// import DataItem from './src/components/list_item';


 class CustomHeader extends React.Component {
  render() {
    let {title,isHome,icon}=this.props
    return (
        <Header style={{ backgroundColor: 'black' }}>
          <Left>
        {isHome?
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='bars' size={20} color="white"/>
          </Button>:
            <Button transparent>
              <Icon name='arrow-left' size={20} color="white" onPress={() => this.props.navigation.goBack()}/>
            </Button>
          }
            </Left>
          <Body>
           <Image  style={{ marginTop: 20,backgroundColor: 'white' }} source={IMAGE.ICON_MENU2} style={{ height:35,width:125 }}/>
          </Body>
          <Right>
           {icon}
          </Right>
        </Header>

    )
  }
}

class Feed extends PureComponent {
  constructor(props) {
       super(props);
        this.retrieveData();
         // this.removeEverything();
       this.state = {
           isLoading: true,
           data: null,
           dataimage: null,
           isError: false,
            url:"https://nux3.tageblatt.lu/dpijson/v1/section/0/Homepage",
            token:"",
            obj:{
              name:'tarif',
              password:'123456'
            }

       }
   }
   removeEverything = async () => {
     try {
       await AsyncStorage.clear()
       alert('Storage successfully cleared!')
     } catch (e) {
       alert('Failed to clear the async storage.')
     }
   }
   save = async name => {
       try {
          this.setState({ token:'abc123' })
         await AsyncStorage.setItem('token', 'abc123' )
         await AsyncStorage.setItem('obj', JSON.stringify( {obj:this.state.data}))
         console.log(this.state.token)
         console.log(this.state.data)

       } catch (e) {
         alert('Failed to save name.')
       }
     }

     retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem('token')
      const obj = await AsyncStorage.getItem('obj')
      const obj1 = JSON.parse(obj)
      if (name !== null) {
        this.setState({ token:name })
      }
      if (obj1 !== null) {
        this.setState({ data:obj1 })
      }
    } catch (e) {
      alert('Failed to load name.')
    }
  }



   // async componentDidMount() {
   //     const photoStorage = await AsyncStorage.getItem('GalleryPhotos')
   //     console.log(photoStorage);
   //     if(photoStorage==null) {
   //       try {
   //         const photoResp = getArticles(this.state.url).then(data => {
   //               this.setState({
   //                   isLoading: false,
   //             data: data.packages
   //
   //               })
   //           }, error => {
   //               Alert.alert("Error", "Something happend, please try again")
   //           })
   //         const photoData = await JSON.stringify(photoResp.packages)
   //         await AsyncStorage.setItem('GalleryPhotos', photoData);
   //       } catch(e) {
   //         console.warn("fetch Error: ", error)
   //      }
   //        }
   //      else {
   //    console.log("Data was not fetched!");
   //        getArticles(this.state.url).then(data => {
   //            this.setState({
   //                isLoading: false,
   //          data: data.packages
   //
   //            })
   //        }, error => {
   //            Alert.alert("Error", "Something happend, please try again")
   //        })
   //
   //    }
   //  }
   //
   //
   // getPhotos = async()=> {
   //   try {
   //       data = JSON.parse(await AsyncStorage.getItem('GalleryPhotos'));
   //   }
   //   catch (error) {
   //     console.error(error);
   //   }
   // }
   //
   componentDidMount() {
     // let url="https://nux3.tageblatt.lu/dpijson/v1/section/0/Homepage";

     if(this.state.data==null){
       getArticles(this.state.url).then(data => {
           this.setState({
               isLoading: false,
         data: data.packages

           })
       }, error => {
           Alert.alert("Error", "Something happend, please try again")
       })
     }
     else{
 this.retrieveData()

     }
   }

  render() {

    console.disableYellowBox = true;
    const { params } =  this.props.navigation.state;
    // let t2=(typeof params['object_relations'][0]['uri']!="undefined")?params['object_relations'][0]['uri']:null;
    // let imageurl = (typeof params['object_definitions'][t2]['crop_definitions']!="undefined")?params['object_definitions'][t2]['crop_definitions']['dpi_medium'].url:null;

if(params!=null) {
  getArticles(params.urll).then(data => {
      this.setState({
          isLoading: false,
    data: data.packages,
// isSideMenuOpen: !this.state.isSideMenuOpen
      })
  }, error => {
      Alert.alert("Error", "Something happend, please try again")
  }
)

}


     let view =(
        <List
        style={{width: '100%'}}
            dataArray={this.state.data}
            keyExtractor={(item,index) => index.toString()}
 renderItem = {({item, index}) => {
          let t=item.body;
          let body=t.slice(44, 300);
          let t1=(typeof item['object_relations'][0]['uri']!="undefined")?item['object_relations'][0]['uri']:null;
        if(typeof item['object_definitions'][t1]['crop_definitions']!="undefined")
        {  var imageurlMedium = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_medium']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_medium'].url:null;}
        if(typeof item['object_definitions'][t1]['crop_definitions']!="undefined")
        {  var imageurlSmall = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_small']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_small'].url:null;}
         const time=  item.pubDate;
          const category= item.mainDestinationName;
          let commentscount=item.comments.count;
// const Imagecompone =imageurlSmall?(<Thumbnail style={{ backgroundColor: '#eee', alignSelf: 'center' }} square large  source={{ cache:'force-cache', uri:imageurlSmall!= null ? "http://image-api.suckup.de/image-api.php?file="+imageurlSmall+"&quality=25" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII='}}/>):null;
//           for (let key in item['object_definitions']) {
//           if((item['object_definitions'][key]['crop_definitions'])){
//               let value = item['object_definitions'][key];
//              // console.log(value);
//               for ( let i in value) {
//           if((i=='crop_definitions')&&(value['crop_definitions']!="undefined")){
//             var imgurl=value['crop_definitions']['dpi_small'].url;
//             // console.log(imgurl);
//           }
//           }
// }
//
//            }

             // Object.keys(item['object_definitions']).forEach(function(value, key) {
             //   console.log(value);
             //   // item['object_definitions'][value].forEach(function(v, k) {
             //  value.forEach(function(v, k) {
             //       console.log(v.crop_definition.dpi_small.url)
             //     })
             //    // console.log(value[0].crop_definitions.dpi_small)
             //   // })
             // });


        if(index%4==0)    return (
                      <ListItem style={{marginLeft: 0,marginRight: 0,backgroundColor: index%3==0 ? 'black' : 'white'}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{marginLeft: 0,justifyContent :'center',alignItems: 'center',flexDirection:'row'}} activeOpacity={0.5}>
                  <Body style={{ width:Dimensions.get('window').width}}>
                  <Thumbnail style={{ marginLeft:13,marginRight:0,width:null, height: 180, backgroundColor: '#eee'  }} square large  source={{ cache:'force-cache', uri:imageurlMedium!= null ? imageurlMedium : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
                      <Text  numberOfLines={3} style={{fontFamily:'Pacifico',fontSize: 20 ,color: index%3==0 ? 'white' : 'black'}} numberOfLines={2}>{item.title}</Text>
                      <Text note numberOfLines={3} style={{fontSize: 16 ,marginRight: 0}}>{body}</Text>
                      <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0 }}>
                        <Time date={time} />
                          <Text note>|  {category}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 0, marginLeft: 0 ,marginRight: 2 ,justifyContent :'flex-end',alignItems: 'center'}}>
                   <Icon style={{ marginLeft: 10 }} name="bookmark" size={14} color={index%3==0 ? 'white' : 'black'}  />
                      <Icon style={{ marginLeft: 17 }} name="comment" size={14} color={index%3==0 ? 'white' : 'black'}  />
                         <Text style={{fontSize: 12,color:"white",marginLeft: 5 }}>{commentscount=commentscount>0?item.comments.count:null}</Text>
                <Icon style={{ marginLeft: 0 }} name="share-alt" size={14} color={index%3==0 ? 'white' : 'black'}  />
                      </View>
                        </View>
                  </Body>
                  </TouchableOpacity>
                    </ListItem>

                  )
                   else  return (
                     <ListItem style={{marginLeft: 0,backgroundColor: index%3==0 ? 'black' : 'white'}}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{marginLeft: 0,justifyContent :'center',alignItems: 'center',flexDirection:'row',backgroundColor: index%3==0 ? 'black' : 'white'}} activeOpacity={0.5}>
                 <Body>
                     <Text  numberOfLines={3} style={{fontSize: 16,color: index%3==0 ? 'white' : 'black' }} numberOfLines={2}>{item.title}</Text>
                     <Text note numberOfLines={2}>{body}</Text>
                     <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0 }}>
                       <Time date={item.pubDate} />
                         <Text note>|  {item.mainDestinationName}</Text>
                     </View>
                 </Body>
                 <View style={{  flexDirection: 'column' }}>
              <Thumbnail style={{ backgroundColor: '#eee', alignSelf: 'center' }} square large  source={{ cache:'force-cache', uri:imageurlSmall!= null ? imageurlSmall : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII='}}/>
                 <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
                 <Icon style={{ marginLeft: 0 }} name="bookmark" size={10} color={index%3==0 ? 'white' : 'black'}  />
                   <View style={{ flexDirection: 'row',alignItems: 'flex-start',justifyContent: 'flex-start' }}>
                    <Icon name="comment" size={10} color={index%3==0 ? 'white' : 'black'} />
                    <Text style={{fontSize: 8,marginLeft: 2 ,paddingTop: 0 ,color:index%5==0 ? 'white' : 'black'}}>{item.comments.count=item.comments.count>0?item.comments.count:null}</Text>
                      </View>
                  <Icon name="share-alt" size={10} color={index%3==0 ? 'white' : 'black'} />
                 </View>
                 </View>
                         </TouchableOpacity>
                   </ListItem>

                   )
            }} />

    )
  // let IMAGEHEADER= <Image source={IMAGE.ICON_MENU} style={{ height:20,width:120 }}/>
return (
     <Container>
      <CustomHeader  title='Tageblatt'   isHome={true} navigation={this.props.navigation} />
               <Content
                   contentContainerStyle={{ marginLeft: 0,flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
              children={view}  >
               </Content>
           </Container>
)

  }
}


//
// class Category extends PureComponent {
//   constructor(props) {
//        super(props);
//        this.state = {
//            isLoading: true,
//            data: null,
//            dataimage: null,
//            isError: false,
//             url:"https://nux3.tageblatt.lu/dpijson/v1/section/0/Homepage"
//        }
//    }
//
//
//    // componentDidMount() {
//    //   // let url="https://nux3.tageblatt.lu/dpijson/v1/section/0/Homepage";
//    //     getArticles(this.state.url).then(data => {
//    //         this.setState({
//    //             isLoading: false,
//    //       data: data.packages
//    //
//    //         })
//    //     }, error => {
//    //         Alert.alert("Error", "Something happend, please try again")
//    //     })
//    // }
//
//   render() {
//
//
//     console.disableYellowBox = true;
//     const { params } =  this.props.navigation.state;
// // const imageurl = params ? params['object_definitions'][params['object_relations'][0]['uri']]['crop_definitions']['dpi_medium'].url : null;
//     // let t1=(typeof item['object_relations'][0]['uri']!="undefined")?item['object_relations'][0]['uri']:null;
//     // let imageurl = (typeof item['object_definitions'][t1]['crop_definitions']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_medium'].url:null;
//
// console.log(params);
//
//   if(params!=null) {
//   getArticles(params.urll).then(data => {
//       this.setState({
//           isLoading: false,
//     data: data.packages,
// // isSideMenuOpen: !this.state.isSideMenuOpen
//       })
//   }, error => {
//       Alert.alert("Error", "Something happend, please try again")
//   }
// )
//
// }
//
//      let view = this.state.isLoading ? (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
//         <Text style={{ marginTop: 8 }} children="" />
//     </View>
// ) : (
//         <List
//         style={{width: '100%'}}
//             dataArray={this.state.data}
//             keyExtractor={(item,index) => index.toString()}
//  renderItem = {({item, index}) => {
//           let t=item.body;
//           let t1=(typeof item['object_relations'][0]['uri']!="undefined")?item['object_relations'][0]['uri']:null;
//           let imageurl = (typeof item['object_definitions'][t1]['crop_definitions']['dpi_medium']!="undefined")?item['object_definitions'][t1]['crop_definitions']['dpi_medium'].url:null;
// console.log(item);
//
//        let result=t.slice(44, 300);
//         if(index%4==0)    return (
//                       <ListItem style={{ marginLeft: 0,backgroundColor: index%3==0 ? 'black' : 'white'}}>
//                       <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{marginLeft: 20,justifyContent :'center',alignItems: 'center',flexDirection:'row'}} activeOpacity={0.5}>
//                   <Body>
//                   <Thumbnail style={{ marginLeft:13,width:null, height: 180, backgroundColor: '#eee'  }} square large  source={{ cache:'force-cache', uri:imageurl!= null ? "http://image-api.suckup.de/image-api.php?file="+imageurl+"&quality=50" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
//                       <Text  numberOfLines={3} style={{fontFamily:'Pacifico',fontSize: 20 ,color: index%3==0 ? 'white' : 'black'}} numberOfLines={2}>{item.title}</Text>
//                       <Text note numberOfLines={3} style={{fontSize: 16 }}>{result}</Text>
//                       <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0 }}>
//                         <Time date={item.pubDate} />
//                           <Text note>|  {item.mainDestinationName}</Text>
//                   <View style={{ flex: 1, flexDirection: 'row', marginTop: 0, marginLeft: 0 ,marginRight: 20 ,justifyContent :'flex-end',alignItems: 'center'}}>
//                    <Icon style={{ marginLeft: 10 }} name="bookmark" size={14} color={index%3==0 ? 'white' : 'black'}  />
//                       <Icon style={{ marginLeft: 17 }} name="comment" size={14} color={index%3==0 ? 'white' : 'black'}  />
//                          <Text style={{fontSize: 12,color:"white",marginLeft: 5 }}>{item.comments.count=item.comments.count>0?item.comments.count:null}</Text>
//                 <Icon style={{ marginLeft: 0 }} name="share-alt" size={14} color={index%3==0 ? 'white' : 'black'}  />
//                       </View>
//                         </View>
//                   </Body>
//                   </TouchableOpacity>
//                     </ListItem>
//
//                   )
//                    else  return (
//                      <ListItem style={{marginLeft: 0,backgroundColor: index%3==0 ? 'black' : 'white'}}>
//                      <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{marginLeft: 20,justifyContent :'center',alignItems: 'center',flexDirection:'row',backgroundColor: index%3==0 ? 'black' : 'white'}} activeOpacity={0.5}>
//                  <Body>
//                      <Text  numberOfLines={3} style={{fontSize: 16,color: index%3==0 ? 'white' : 'black' }} numberOfLines={2}>{item.title}</Text>
//                      <Text note numberOfLines={2}>{result}</Text>
//                      <View style={{ flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 0 }}>
//                        <Time date={item.pubDate} />
//                          <Text note>|  {item.mainDestinationName}</Text>
//                      </View>
//                  </Body>
//                  <View style={{  flexDirection: 'column' }}>
//                  <Thumbnail style={{ backgroundColor: '#eee', alignSelf: 'center' }} square large  source={{ cache:'force-cache', uri:imageurl!= null ? "http://image-api.suckup.de/image-api.php?file="+imageurl+"&quality=25" : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
//                  <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
//                  <Icon style={{ marginLeft: 0 }} name="bookmark" size={10} color={index%3==0 ? 'white' : 'black'}  />
//                    <View style={{ flexDirection: 'row',alignItems: 'flex-start',justifyContent: 'flex-start' }}>
//                     <Icon name="comment" size={10} color={index%3==0 ? 'white' : 'black'} />
//                     <Text style={{fontSize: 8,marginLeft: 2 ,paddingTop: 0 ,color:index%5==0 ? 'white' : 'black'}}>{item.comments.count=item.comments.count>0?item.comments.count:null}</Text>
//                       </View>
//                   <Icon name="share-alt" size={10} color={index%3==0 ? 'white' : 'black'} />
//                  </View>
//                  </View>
//                          </TouchableOpacity>
//                    </ListItem>
//
//                    )
//             }} />
//
//     )
//   // let IMAGEHEADER= <Image source={IMAGE.ICON_MENU} style={{ height:20,width:120 }}/>
// return (
//      <Container>
//       <CustomHeader  title='Tageblatt'   isHome={true} navigation={this.props.navigation} />
//                <Content
//                    contentContainerStyle={{ marginLeft: 0,flex:1,alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
//               children={view}  >
//                </Content>
//            </Container>
// )
//
//   }
// }


class FeedDetail extends React.Component {
  constructor(props) {
        super(props);
          this.state = {
      supported : true,
   }
 }
  onCancel() {
      console.log("CANCEL")
      // this.setState({visible:false});
  }

  render() {

const { params } = this.props.navigation.state;
const imageurl = params ? params['object_definitions'][params['object_relations'][0]['uri']]['crop_definitions']['dpi_medium'].url : null;
const urlshare = params ? params['object_relations'][1].uri : null;
// const urlshareencoded = encodeURIComponent(JSON.stringify(urlshare));
const links=params ? params['object_definitions'][params['object_relations'][1]['uri']]['links']: null;
const commentscount= parseInt(params.comments.count);
// console.log(commentscount);
  // console.log(urlshare);
  let shareOptions = {
            message: params.title + '\n' + urlshare,
          };

    const onSharefacebook = async () => {
        try {
          const result = await Share.shareSingle(Object.assign(shareOptions, {
             "social": "twitter"
           }));
        } catch (error) {
          alert(error.message);
        }
      };

const onShare = async () => {
    try {
      const result = await Share.share({
        message:params.title + '\n' + urlshare,

      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //cancel method
  // const onCancel =  () => {
  //     console.log("CANCEL");
  // }

  const openFacebookLink = facebookId => {
    const FANPAGE_URL_FOR_APP = `fb://page/159616034235`;
    const FANPAGE_URL_FOR_BROWSER = `https://fb.com/sharer/sharer.php?u=${facebookId}`;

    Linking.canOpenURL(FANPAGE_URL_FOR_APP)
      .then(appSupported => {
        if (appSupported) {
          console.log(`Can handle native url: ${FANPAGE_URL_FOR_APP}`);
          return Linking.openURL(FANPAGE_URL_FOR_APP);
        } else {
          console.log(
            `Can't handle native url ${FANPAGE_URL_FOR_APP} defaulting to web URL ${FANPAGE_URL_FOR_BROWSER}`
          );
          return Linking.canOpenURL(FANPAGE_URL_FOR_BROWSER).then(
            webSupported => {
              if (webSupported) {
                console.log(`Can handle web url: ${FANPAGE_URL_FOR_BROWSER}`);
                return Linking.openURL(FANPAGE_URL_FOR_BROWSER);
              }
              return null;
            }
          );
        }
      })
      .catch(err => console.error("An error occurred", err));
  };




const page = commentscount > 0 ? "Comments" : "AddComments";
    // <HTML html={body}    />
var styles = StyleSheet.create({
p: {
 fontSize: 16,
color: 'black', // pink links
},
});
var htmlContent =params ? params.body: null;
  const MEHR =links?(<Text style={{flexDirection: 'row' ,fontSize: 26 }} >MEHR VOM TAGEBLATT</Text>):null;
    return (

      <View style={{ flex: 1 }}>
          <ScrollView>
        <CustomHeader  title={params.mainDestinationName}  navigation={this.props.navigation} />
      <View style={{ marginLeft: 15,flex: 1,fontFamily:'Tageblatt Picto', flexDirection: 'column',  justifyContent: 'center',alignItems: 'flex-start' }}>
        <Text style={{ flex: 1,fontSize: 24,marginTop: 15 }}>{params.title}</Text>
      <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', marginBottom:5}}>
        <Text style={{fontSize: 16 }}>{params.mainDestinationName}  |  </Text>
      <Time1 date={params.pubDate} style={{ fontSize: 16}}/>
      </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Image
         style={{
           flex: 1,
         width:Dimensions.get('window').width-30,height: 288
         }}
         source={{uri:this.props.navigation.state.params['object_definitions'][this.props.navigation.state.params['object_relations'][0]['uri']]['crop_definitions']['dpi_medium'].url}}
         />
         <Text numberOfLines={2} style={{backgroundColor: '#3d3d3d',color:"#f2f2f2", padding: 10, left:0,right: 0,position: 'absolute', fontSize: 12,bottom:0,alignItems: 'center', justifyContent: 'center'}}>{this.props.navigation.state.params['object_definitions'][this.props.navigation.state.params['object_relations'][0]['uri']]['caption']}</Text>
     </View>
      <View style={{   flex:8,
    width:Dimensions.get('window').width-30}}>
      <HTML html={htmlContent}
      imagesMaxWidth={Dimensions.get('window').width-30}
      tagsStyles={{
          p: {
            marginBottom:20,
    fontSize:Dimensions.get('window').width*0.05,
      // textAlign: 'left',
      // flexWrap: 'wrap',
// width: '6.5%'
},
blockquote: {fontSize:Dimensions.get('window').width*0.05,},a: {fontSize:Dimensions.get('window').width*0.05},img: {marginTop:10},figcaption:{marginBottom:20}

}}
 classesStyles={{ 'author': { fontSize:Dimensions.get('window').width*0.05 },'function':{fontSize:Dimensions.get('window').width*0.05}  }}
      />
      </View>
        {MEHR}
        <List  style={{marginBottom:50}}
            dataArray={links}
        renderItem={({item})=>{
          return (
                      <ListItem style={{marginLeft: 0}} noBorder>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('ArticleLink',item)} style={{flexDirection:'row'}} activeOpacity={0.5}>
                      <Text  numberOfLines={3} style={{fontSize: 16 }} numberOfLines={2}>{item.title}</Text>
                          </TouchableOpacity>
                    </ListItem>
                  )
            }} />
              <View style = {styles.button_style}>
            <Button danger onPress={() =>this.props.navigation.navigate( page,params)} >
      <Text>KOMMENTARE</Text>
          </Button>
            </View>
      </View>
              </ScrollView>
        <View  navigation={this.props.navigation}  style={{ marginTop:5,paddingHorizontal:20,backgroundColor: '#c4c6ca',justifyContent: 'space-around', alignItems: 'flex-start',flexDirection:'row',height:50 }}>
          <View  style={{  flexDirection: 'row',alignItems: 'center'}}>
              <Button transparent>
                 <Icon name='comments' onPress={() =>this.props.navigation.navigate( page,params)}    size={20} color='#939497'/>
              </Button>
               <Text style={{color:'#939497',fontSize: 14,marginLeft: 3 }}>{params.comments.count}</Text>
          </View>
        <Button transparent>
          <Icon name='facebook-square'
          // onPress={()=>{
          //
          //          setTimeout(() => {
          //           Share.shareSingle(Object.assign(shareOptions, {
          //              "social": "facebook"
          //            }));
          //          },300);}}
       onPress={() =>  openFacebookLink(urlshare)}
                   size={20} color='#939497'/>
        </Button>
        <Button transparent>
          <Icon name='twitter-square'
          // onPress={onSharefacebook}

          onPress={() => {
  let url = `fb://faceweb/f?href=https%3A%2F%2Fm.facebook.com%2Fsharer.php%3Fu%3Dhttp%3A%2F%2Fwww.${urlshare.slice(12)}`;
                // let url = 'fb://share?link=${urlshare}';
                Linking.openURL(url).then((data) => {
                  console.log('open whatsapp')
                }).catch(() => {
                  console.log('App not installed')
                });
              }}

            size={20} color='#939497'/>
        </Button>
        <Button transparent>
          <Icon name='share-alt' onPress={onShare} size={20} color='#939497'/>
        </Button>
        </View>
          </View>

    );
  }
}

//
//
//
//
// class ArticleLink extends React.Component {
//   constructor(props) {
//        super(props);
//          this.state = {
//       isLoading: true,
//       data: null,
//       isError: false,
//   }
// }
//
//   render() {
// const { params } = this.props.navigation.state;
//
// if(params!=null) {
//    getArticleLinks(params.nid).then(data => {
//       this.setState({
//           isLoading: false,
//     data: data
//       })
//   }, error => {
//       Alert.alert("Error", "Something happend, please try again")
//   }
// )
// }
// // const imageurl = this.state.data ? this.state.data['object_definitions'][this.state.data['object_relations'][0]['uri']]['crop_definitions']['dpi_medium'].url : null;
// const links=this.state.data? this.state.data['object_definitions'][this.state.data['object_relations'][1]['uri']]['links']: null;
// const title= this.state.data? this.state.data.title:null;
// // const  mainDestinationName= this.state.data? this.state.data.mainDestinationName:null;
// const author= this.state.data?this.state.data.authors[0].name:null;
// var pubDate=this.state.data?(new Date(parseInt(this.state.data.pubDate+'000')).toISOString()):null;
// let date1 = new Date(pubDate);
//  const time = moment(date1).format('DD[/]MM[/]YYYY  HH:mm');
// const imageurl= this.state.data?this.state.data['object_definitions'][this.state.data['object_relations'][0]['uri']]['crop_definitions']['dpi_small'].url: null;
// const captionimage= this.state.data?this.state.data['object_definitions'][this.state.data['object_relations'][0]['uri']]['caption']: null;
// const body=this.state.data? this.state.data.body: null;
//  const commentscount= this.state.data? parseInt(this.state.data.comments.count): null;
//  const page = commentscount > 0 ? "Comments" : "AddComments";
//
// // console.log(links);
// // console.log(pubDate);
//
// //  let  dateobj = new Date(parseInt(pubDate)).toISOString();
// //  let date1 = new Date(dateobj);
// // const time = (moment(date1).format("MMM Do YY")==moment().format("MMM Do YY"))?moment(date1).format('h:mm'): moment(date1).format('MM[/]DD');
//
//  return (
//
//       <View style={{ flex: 1 }}>
//           <ScrollView>
//         <CustomHeader   />
//       <View style={{ marginLeft: 15,flex: 1,fontFamily:'Tageblatt Picto', flexDirection: 'column',  justifyContent: 'center',alignItems: 'flex-start' }}>
//         <Text style={{ flex: 1,fontSize: 24,marginTop: 15 }}>{title}</Text>
//         <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', marginBottom:5}}>
//           <Text style={{ fontSize: 16}}>{author}  |  </Text>
//               <Text style={{ fontSize: 16}}>{time}</Text>
//         </View>
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
//         <Image
//          style={{
//            flex: 1,
//          width:Dimensions.get('window').width-30,height: 288
//          }}
//          source={{uri:imageurl}}
//          />
//          <Text numberOfLines={2} style={{backgroundColor: '#3d3d3d',color:"#f2f2f2", padding: 10, left:0,right: 0,position: 'absolute', fontSize: 12,bottom:0,alignItems: 'center', justifyContent: 'center'}}>{captionimage}</Text>
//      </View>
//       <View style={{   flex:8,
//     width:Dimensions.get('window').width-30}}>
//       <HTML html={body}
//       imagesMaxWidth={Dimensions.get('window').width-30}
//       tagsStyles={{
//           p: {
//     fontSize:Dimensions.get('window').width*0.05,
//       // textAlign: 'left',
//       // flexWrap: 'wrap',
// // width: '6.5%'
// },
// blockquote: {fontSize:Dimensions.get('window').width*0.05},a: {fontSize:Dimensions.get('window').width*0.05},img: {marginTop:10},figcaption:{marginBottom:20}
//
// }}
//  classesStyles={{ 'author': { fontSize:Dimensions.get('window').width*0.05 },'function':{fontSize:Dimensions.get('window').width*0.05}  }}
//       />
//       </View>
//             <Text style={{flexDirection: 'row' ,fontSize: 26 }} >MEHR VOM TAGEBLATT</Text>
//           <List  style={{marginBottom:50}}
//               dataArray={links}
//           renderItem={({item})=>{
//               return (
//                         <ListItem style={{marginLeft: 0}} noBorder>
//                         <TouchableOpacity onPress={() => this.props.navigation.navigate('ArticleLink',item)} style={{flexDirection:'row'}} activeOpacity={0.5}>
//                         <Text  numberOfLines={3} style={{fontSize: 16 }} numberOfLines={2}>{item.title}</Text>
//                             </TouchableOpacity>
//                       </ListItem>
//                     )
//               }} />
//                 <View style = {styles.button_style}>
//               <Button danger >
//         <Text>KOMMENTARE</Text>
//             </Button>
//               </View>
//         </View>
//               </ScrollView>
//               <View  navigation={this.props.navigation}  style={{ marginTop:5,paddingHorizontal:20,backgroundColor: '#c4c6ca',justifyContent: 'space-around', alignItems: 'flex-start',flexDirection:'row',height:50 }}>
//                 <View  style={{  flexDirection: 'row',alignItems: 'center'}}>
//                     <Button transparent>
//                        <Icon name='comments' onPress={() =>this.props.navigation.navigate( page,this.state.data)}  size={20} color='#939497'/>
//                     </Button>
//                      <Text style={{color:'#939497',fontSize: 14,marginLeft: 3 }}>{commentscount}</Text>
//                 </View>
//               <Button transparent>
//                 <Icon name='facebook-square' onPress={() => this.props.navigation.navigate('Comments')} size={20} color='#939497'/>
//               </Button>
//               <Button transparent>
//                 <Icon name='twitter-square' onPress={() => this.props.navigation.navigate('Comments')} size={20} color='#939497'/>
//               </Button>
//               <Button transparent>
//                 <Icon name='share-alt' onPress={() => this.props.navigation.navigate('Comments')} size={20} color='#939497'/>
//               </Button>
//               </View>
//                 </View>
//
//  );
//
//   }
// }
//
//
//
// class Comments extends React.Component {
//  constructor(props) {
//       super(props);
//   }
//  render() {
//    const { params } = this.props.navigation.state;
//    return (
//      <View  style={{ flex: 1 }}>
//     <CustomHeader  title='Kommentare'  navigation={this.props.navigation} />
//      <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ fontSize: 24,marginTop: 15, marginLeft: 13 }}>{params.title}</Text>
//         <List
//             dataArray={params.comments.list}
//         renderItem={({item})=>{
//             return (
//                 <ScrollView>
//                       <ListItem style={{ flexDirection: 'column'}}>
//                       <View style={{ flexDirection: 'row', marginBottom:5}}>
//                         <Text   style={{fontSize: 8 }} >{item.comment_author_name}</Text>
//                         <Text   style={{fontSize: 8 }} >{item.comment_date.slice(0,16)}</Text>
//                       </View>
//                       <View>
//                       <Text  style={{fontSize: 12 }} >{item.comment_content}</Text>
//                       </View>
//                     </ListItem>
//                       </ScrollView>
//                   )
//             }} />
//      </View>
//      <View style={{ backgroundColor: 'white',justifyContent: 'center', alignItems: 'center',height:50 }}>
//          <Button style={{ backgroundColor: 'red',padding:20}} onPress={() => this.props.navigation.navigate('AddComments',params)}>
//          <Text style={{ color: 'white'}}>SCHREIBEN SIE EINEN KOMMENTAR</Text>
//          </Button>
//      </View>
//        </View>
//        );
//  }
// }
//
// class AddComments extends React.Component {
//  constructor(props) {
//       super(props);
//       this.state = {
//          name: '',
//      email: ''
//   }
//   }
//   handleEmail = (text) => {
//      this.setState({ email: text })
//   }
//   handleName = (text) => {
//      this.setState({ name: text })
//   }
//  render() {
// const { params } = this.props.navigation.state;
// // console.log(this.state.email);
//    return (
//      <View  style={{ flex: 1 }}>
//      <Header style={{ backgroundColor: 'black' }} navigation={this.props.navigation}>
//        <Left>
//          <Button transparent>
//            <Icon name='arrow-left' size={25} color="white" onPress={() => this.props.navigation.goBack()}/>
//          </Button>
//          </Left>
//        <Body>
//          <Title style={{ fontSize: 16 }}>SCHREIBEN SIE EINEN KOMMENTAR</Title>
//        </Body>
//      </Header>
//      <View style={{ flex:1,justifyContent: 'center', alignItems: 'center' }}>
//      <Button style={{marginTop: 5, marginLeft:10,backgroundColor: 'red',padding:15}} onPress={() => this.props.navigation.navigate('Comments',params)}>
//      <Text style={{ color: 'white'}}>ABSENDEN</Text>
//      </Button>
//      <TextInput style = {styles.input}
//              underlineColorAndroid = "transparent"
//              placeholder = "Name"
//              placeholderTextColor = "#C8C8C8"
//              autoCapitalize = "none"
//              onChangeText = {this.handleName}/>
//      <TextInput style = {styles.input}
//              underlineColorAndroid = "transparent"
//              placeholder = "E-mail"
//              placeholderTextColor = "#C8C8C8"
//              autoCapitalize = "none"
//              onChangeText = {this.handleEmail}/>
//           <Text style={{ color: 'black',  margin: 10}}>Kommentar:</Text>
//           <TextInput style = {styles.textarea}
//                   underlineColorAndroid = "transparent"
//                   autoCapitalize = "none"
//                    numberOfLines={10}
//                   onChangeText = {this.handleEmail}/>
//      </View>
//      </View>
//        );
//  }
// }

class SideMenu extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
           isLoading: true,
           data: null,
           isError: false,
            expanded : false,


       }
   }


   componentDidMount() {

       getMenusideGategory().then(data => {
           this.setState({
               isLoading: false,
         data: data

           })
       }, error => {
           Alert.alert("Error", "Something happend, please try again")
       })
   }

   // handleEnd = () => {
   //  console.log("index");
   //  };
    toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

  render() {
    // console.log(this.state.data);
//     const lapsList =this.state.data? this.state.data.map((data) => {
//   return (
//     <ListItem  style={{  marginLeft: 20,marginRight: 20}}  onPress={() => this.props.navigation.navigate('Feed',{urll:`https://nux3.tageblatt.lu/${data.feed}`}) &&this.props.navigation.closeDrawer()}>
//     <Text style={{ marginLeft: 0 }}>{data.label}</Text>
//     </ListItem >
//   )
// }):null;
// const dataArray = [
//   { title: "First Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
// ];

 var SubCategory = [ {key:"Editorial",value:"dpijson/v1/section/27/editorial"},{key:"Forum",value:"dpijson/v1/section/29/forum"}
,{key:"Kommentar",value:"dpijson/v1/section/28/kommentar"},{key:"Leserbriefe",value:"dpijson/v1/section/30/leserbriefe"} ];
const lapsList =this.state.data?
(
  <List style={{flex:1 }}
  dataArray={this.state.data}
    keyExtractor={(item,index) => index.toString()}
      onEndReachedThreshold={0}
renderItem={({item,index})=>{

if(index==3) return (
  <View>
       <ListItem style={styles.row} onPress={() => this.props.navigation.navigate('Feed',{urll:`https://nux3.tageblatt.lu/dpijson/v1/section/26/meinung`}) &&this.props.navigation.closeDrawer()}>
           <Text style={[styles.title]}>Meinung</Text>
           <Icon name={this.state.expanded ? 'minus' : 'plus'} size={13} color={"#474747"} onPress={()=>this.toggleExpand()} />
       </ListItem>
       <View/>
       {
           this.state.expanded &&
           <View style={{}}>
               <FlatList
               data={SubCategory}
               numColumns={1}
                 keyExtractor={(item,index) => index.toString()}
               renderItem={({item,index}) =>
                   <View>
                       <ListItem style={styles.row}onPress={() => this.props.navigation.navigate('Feed',{urll:`https://nux3.tageblatt.lu/${item.value}`}) &&this.props.navigation.closeDrawer()}>
                           <Text >{item.key}</Text>
                       </ListItem>
                       <View />
                   </View>
               }/>
           </View>
       }
  </View>
        )
        else return (
              <ListItem  style={{  marginLeft: 20,marginRight: 20}}  onPress={() => this.props.navigation.navigate('Feed',{urll:`https://nux3.tageblatt.lu/${item.feed}`}) &&this.props.navigation.closeDrawer()}>
              <Text style={{ marginLeft: 0 }}>{item.label}</Text>
              </ListItem >
        )
  }} />
):null;

    return (
      <SafeAreaView style={{ flex:1 }}>
        <View style={{ height:80,alignItems: 'center', justifyContent: 'center' }}>
        <Image source={IMAGE.ICON_MENU} style={{ height:60,width:160 }}/>
          </View>
          <ScrollView style={{flex:1 }}>
            <View style={{flexDirection: 'column',flex:1,  justifyContent: 'center',alignItems: 'stretch' }}>
          <List  style={{marginBottom: 30}} >
          <ListItem  style={{ marginLeft: 0, marginBottom: 6,backgroundColor: 'red' }}  onPress={() => this.props.navigation.navigate('Politik')}>
         <Icon style={{marginLeft: 20}} name={'sign-in'} size={20} color={"white"} />
          <Text style={{ marginLeft: 10,color: 'white' }} >Anmelden</Text>
          </ListItem>
          <ListItem  style={{ marginLeft: 0,backgroundColor: 'red' }}  onPress={() => this.props.navigation.navigate('Politik')}>
          <Icon style={{marginLeft: 20}} name={'home'} size={20} color={"white"} />
          <Text style={{marginLeft: 10,  color: 'white' }}>Top-Nachrichten</Text>
          </ListItem>
          <ListItem  style={{ marginLeft: 0,backgroundColor: 'black' }} onPress={() => this.props.navigation.navigate('Politik')}>
    <Icon style={{marginLeft: 20}} name={'home'} size={20} color={"white"} />
          <Text style={{ marginLeft: 10 ,color: 'white' }}>Premium</Text>
          </ListItem>
          <ListItem  style={{  marginLeft: 0,marginRight: 20 }}  onPress={() => this.props.navigation.navigate('Politik')}>
  <Icon style={{marginLeft: 20}} name={'home'} size={20} color={"black"} />
  <Text style={{ marginLeft: 10 }}>E-Paper</Text>
          </ListItem>
          <ListItem  style={{  marginLeft: 0,marginRight: 20 }}  onPress={() => this.props.navigation.navigate('Politik')}>
    <Icon style={{marginLeft: 20}} name={'download'} size={20} color={"black"} />
          <Text style={{ marginLeft: 10 }}>Meine Downloads</Text>
          </ListItem>
          <ListItem   style={{ marginLeft: 0,marginRight: 20 }} onPress={() => this.props.navigation.navigate('Politik')}>
         <Icon style={{marginLeft: 20}} name={'star'} size={20} color={"black"} />
          <Text style={{ marginLeft: 10 }}>Meine Favoriten</Text>
          </ListItem>
          <ListItem  style={{  marginLeft: 0,marginRight: 20 }} onPress={() => this.props.navigation.navigate('Politik')}>
<Icon style={{marginLeft: 20}} name={'cog'} size={20} color={"black"} />
          <Text style={{ marginLeft: 10 }}>Einstellungen</Text>
          </ListItem>
          </List>
            </View>
              {lapsList}
                    </ScrollView>
       </SafeAreaView>
    );

  }
}


const navOptionHandler=(navigation)=>({
  header:null
})
const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions:navOptionHandler
  },

  // Category :{
  //   screen: Category,
  //   navigationOptions:navOptionHandler
  // },
  FeedDetail: {
    screen: FeedDetail,
    navigationOptions:navOptionHandler
  },
  // Comments: {
  //   screen: Comments,
  //   navigationOptions:navOptionHandler
  // },
  // AddComments: {
  //   screen: AddComments,
  //   navigationOptions:navOptionHandler
  // },
  // ArticleLink: {
  //   screen: ArticleLink,
  //   navigationOptions:navOptionHandler
  // },
});

const MyDrawerNavigator = createDrawerNavigator(
 {
     drawer: FeedStack,
 },
{
  contentComponent: SideMenu,
  drawerWidth:(Dimensions.get('window').width*3/4),
    hideStatusBar: true,
  contentOptions: {
         activeBackgroundColor: "rgba(212,118,207, 0.2)",
         activeTintColor: "#53115B",
         itemsContainerStyle: {
             marginTop: 16,
             marginHorizontal: 8
         }
     }
  },
);




const styles = StyleSheet.create({
background_Image: {
 backgroundColor: '#ccc',
 flex: 1,
 position: 'absolute',
 width: '100%',
 height: '100%',
 justifyContent: 'center',
},
 button_style: {
    flexDirection: 'row',
   justifyContent: 'flex-end',
   alignItems: 'flex-end',
    marginBottom: 20,
    marginHorizontal:120,
    // position: 'absolute', top: 0, left: 0, right: 0, height: 300, alignItems: 'center', justifyContent: 'center'
 },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    flexDirection: 'column',
   width: 350,
 },
 textarea: {
   borderWidth: 0,
backgroundColor: '#D8D8D8',
   flexDirection: 'column',
  width: 350,
  height:350,
    margin: 10,

},
  p: {
    fontWeight: '900',
    color: '#FF3366', // pink links
  },
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
listItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 50,
  margin: 2,
  borderColor: '#2a4944',
  borderWidth: 1,
  backgroundColor: '#d2f7f1'
},
button:{
    width:'100%',
    height:54,
    alignItems:'center',
    paddingLeft:35,
    paddingRight:35,
    fontSize: 12,
},
title:{
    fontSize: 16,
//   fontWeight:'bold',
},
itemActive:{
    fontSize: 12,
},
itemInActive:{
    fontSize: 12,
},
row:{
    flexDirection: 'row',
    justifyContent:'space-between',
    height:56,
    // paddingLeft:25,
    paddingRight:18,
    alignItems:'center',
},
childRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
},
parentHr:{
    height:1,
    width:'100%'
},
childHr:{
    height:1,
    width:'100%',
},
 });
export default createAppContainer(MyDrawerNavigator);
