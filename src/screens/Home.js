import React,{PureComponent,useState} from 'react';
import {AsyncStorage, Linking ,Share, View ,Image,ActivityIndicator, Alert ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { IMAGE } from '../constants/image';
import { CONSTANTS } from '../constants/constants';
// import { Fonts } from './src/constants/fonts';
import { getArticles,getArticleLinks , getMenusideGategory} from '../services/news';
 import HTML from 'react-native-render-html';
import  Time  from '../components/time';
import  Time1  from '../components/time1';
import moment from 'moment';
import  FeedDetail  from './FeedDetail';
import  ArticleLink  from './ArticleLink';
import  Comments  from './Comments';
import  AddComments  from './AddComments';

// import axios from 'axios';
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
  let {title,isHome}=this.props
    // let isHome=this.props
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
            url:CONSTANTS.URL,
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

     let view = this.state.isLoading ? (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <ActivityIndicator animating={this.state.isLoading} size="large" color="#00f0ff" />
             <Text style={{ marginTop: 8 }} children="" />
         </View>
     ) : (    <List
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

        if(index%4==0)    return (
                      <ListItem style={{backgroundColor: index%3==0 ? 'black' : 'white' ,marginLeft:0,paddingLeft:13,paddingRight:13}}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{justifyContent :'center',alignItems: 'center',flexDirection:'row'}} activeOpacity={0.5}>
                  <Body style={{ }}>
                  <Thumbnail style={{ marginBottom:7,marginLeft:0,paddingRight:0,width:null, height: 180, backgroundColor: '#eee'  }} square large  source={{ cache:'force-cache', uri:imageurlMedium!= null ? imageurlMedium : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
                      <Text numberOfLines={3}  style={{marginBottom:10,marginLeft:0,marginRight:0,paddingRight:0,fontFamily:'Pacifico',fontSize: 22 ,color: index%3==0 ? 'white' : 'black'}} >{item.title}</Text>
                      <Text  numberOfLines={3} style={{marginRight:0,marginBottom:10,color: index%3==0 ? 'white' : 'black',marginLeft:0,paddingRight:0,fontSize: 16 ,marginRight: 0}}>{body}</Text>
                      <View style={{ flexDirection: 'row', marginTop: 8 }}>
                        <Time style={{  }}date={time} />
                        <Text note style={{alignSelf:"center",marginLeft:0, marginBottom:0}}>{`\uff5c ${category}`}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 0, marginLeft: 0 ,marginRight: 2 ,justifyContent :'flex-end',alignItems: 'center'}}>
                   <Icon style={{ marginLeft: 10 }} name="bookmark" size={17} color={index%3==0 ? 'white' : 'black'}  />
                      <Icon style={{ marginLeft: 17 }} name="comment" size={17} color={index%3==0 ? 'white' : 'black'}  />
                         <Text style={{fontSize: 16,color:"white",marginLeft: 5 }}>{commentscount=commentscount>0?item.comments.count:null}</Text>
                <Icon style={{ marginLeft: 0 }} name="share-alt" size={17} color={index%3==0 ? 'white' : 'black'}  />
                      </View>
                        </View>
                  </Body>
                  </TouchableOpacity>
                    </ListItem>

                  )
                   else  return (
                     <ListItem style={{marginLeft: 0,paddingLeft:13,paddingRight:13,backgroundColor: index%3==0 ? 'black' : 'white'}}>
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{justifyContent :'center',alignItems: 'center',flexDirection:'row'}} activeOpacity={0.5}>
                 <View  style={{  flex: 1,
        flexDirection: 'column',alignSelf: 'flex-end', alignItems: 'flex-end' ,
marginBottom:0,paddingBottom:0}}>
                     <Text numberOfLines={3}  style={{marginBottom:5,marginLeft:0,paddingRight:0,fontSize: 18,color: index%3==0 ? 'white' : 'black' }} >{item.title}</Text>
                     <Text numberOfLines={2} style={{marginBottom:5,marginLeft:0,paddingRight:0,fontSize: 14,color: index%3==0 ? 'white' : 'black' }}>{body}</Text>
                     <View style={{ flex: 1, flexDirection: 'row' ,alignSelf: 'flex-start', marginLeft: 0 }}>
                       <Time date={item.pubDate} />
                         <Text note style={{ marginLeft: 0,marginBottom:0 }}>{`\uff5c ${item.mainDestinationName}`}</Text>
                     </View>
                     </View>
                    <View style={{  flexDirection: 'column',alignSelf: 'flex-end', alignItems: 'center' }}>
              <Thumbnail style={{ flexDirection: 'row',marginLeft:5,marginBottom:20,justifyContent: 'center',backgroundColor: '#eee' }} square large  source={{ cache:'force-cache', uri:imageurlSmall!= null ? imageurlSmall : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII='}}/>
                  <View style={{ flexDirection: 'row',alignSelf: 'stretch',justifyContent: 'space-between' }}>
                 <Icon style={{ marginLeft: 0 }} name="bookmark" size={12} color={index%3==0 ? 'white' : 'black'}  />
                   <View style={{ flexDirection: 'row',alignItems: 'flex-start',justifyContent: 'flex-start' }}>
                     <Icon name="comment" size={12} color={index%3==0 ? 'white' : 'black'} />
                     <Text style={{fontSize: 8,marginLeft: 2 ,paddingTop: 0 ,color:index%5==0 ? 'white' : 'black'}}>{item.comments.count=item.comments.count>0?item.comments.count:null}</Text>
                    </View>
                  <Icon name="share-alt" size={12} color={index%3==0 ? 'white' : 'black'} />
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
                   contentContainerStyle={{ backgroundColor:"white", width:Dimensions.get('window').width,flex:1,alignItems: 'center', justifyContent: 'center' }}
              children={view}  >
               </Content>
           </Container>
)

  }
}

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
                       <ListItem style={styles.row}onPress={() => this.props.navigation.navigate('Feed',{urll:`https://awstgb2.tageblatt.lu/${item.value}`}) &&this.props.navigation.closeDrawer()}>
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
              <ListItem  style={{  marginLeft: 20,marginRight: 20}}  onPress={() => this.props.navigation.navigate('Feed',{urll:`https://awstgb2.tageblatt.lu/${item.feed}`}) &&this.props.navigation.closeDrawer()}>
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
  Comments: {
    screen: Comments,
    navigationOptions:navOptionHandler
  },
  AddComments: {
    screen: AddComments,
    navigationOptions:navOptionHandler
  },
  ArticleLink: {
    screen: ArticleLink,
    navigationOptions:navOptionHandler
  },
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
   // alignItems: 'flex-end',
   // alignSelf:'center',
    // marginBottom: 20,
    // marginHorizontal:120,
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
