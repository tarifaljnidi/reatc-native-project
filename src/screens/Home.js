import React,{PureComponent} from 'react';
import {SectionList,AppState,AsyncStorage, Linking ,Share, View ,Image,ActivityIndicator ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { IMAGE } from '../constants/image';
import { CONSTANTS } from '../constants/constants';
// import { Fonts } from './src/constants/fonts';
import { getArticles,getArticleLinks, getMenusideGategory} from '../services/news';
 import HTML from 'react-native-render-html';
// import  Time  from '../components/time';
//import  Time1  from '../components/time1';
import moment from 'moment';
import  FeedDetail  from './FeedDetail';
import  ArticleLink  from './ArticleLink';
import  Comments  from './Comments';
import  AddComments  from './AddComments';
 // import { RecyclerListView } from "recyclerlistview/web";
//import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import MyCarousel from './carousel';


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
// function timeout(milliseconds, promise) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error("timeout exceeded"))
//     }, milliseconds)
//     promise.then(resolve, reject)
//   })
// }


 class Feed extends PureComponent {
  constructor(props) {
       super(props);
        this.retrieveData();
         // this.removeEverything();
       this.state = {
           isLoading: true,
           // data1:null,
           data: null,
           isError: false,
            url:CONSTANTS.URL,
            page:"36",
         obj:{

         },
         // appState: AppState.currentState
            // token:"",
            // obj:{
            //   name:'tarif',
            //   password:'123456'
            // }

       }
   }


   removeEverything = async () => {
     try {
       await AsyncStorage.clear()
       // alert('Storage successfully cleared!')
     } catch (e) {
       // alert('Failed to clear the async storage.')
     }
   }
   save = async name => {
       try {
          this.setState({ token:'abc123' })
         // await AsyncStorage.setItem('token', 'abc123' )
         await AsyncStorage.setItem('obj', JSON.stringify( {obj:this.state.data}))
         // console.log(this.state.token)
         // console.log(this.state.data)

       } catch (e) {
         // alert('Failed to save name.')
       }
     }

     retrieveData = async () => {
    try {
      // const name = await AsyncStorage.getItem('token')
       const obj = await AsyncStorage.getItem('obj')
      const obj1 = JSON.parse(obj)
      // if (name !== null) {
      //   this.setState({ token:name })
      // }
      if (obj1 !== null) {
        this.setState({ data:obj1 })
      }
    } catch (e) {
     // alert('Failed to load name.')
    }
  }

  getdata = async name => {
      try {

        getArticles(this.state.url).then(data => {
            this.setState({
                isLoading: false,
              // data:   [...this.state.data.slice(this.state.page)]
          data: data
           // data: this.state.data.concat(data.slice(5,10))
         // data:[...this.state.data,...data.slice(this.state.page,this.state.page+5)]
            })
        }, error => {
            // Alert.alert("Error", "Something happend, please try again")
        })

      } catch (e) {
        // alert('Failed to save name.')
      }
    }

    // getdata1 = async name => {
    //     try {
    //       var dataArray1 = ["811581","810906","809912" ];
    //       dataArray1.forEach(function (item, index) {
    //         getArticleLinks(item).then(data => {
    //           this.setState({
    //         data1: data
    //           })
    //         }
    //       )
    // })
    //     } catch (e) {
    //       // alert('Failed to save name.')
    //     }
    //   }



   componentDidMount() {
     // let url="https://nux3.tageblatt.lu/dpijson/v1/section/0/Homepage";
     // if(this.state.data==null){
      this.getdata();
// this.getdata1();
 //     }
 //     else{
 //
 //     }
 // AppState.addEventListener('change', this._handleAppStateChange);
   }
   handleLoadMore = () => {
       // console.log("test");
       this.setState({page: this.state.page+15},
     this.getdata
       )

   };
   // _handleAppStateChange = (nextAppState) => {
   //     if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
   //       console.log('App has come to the foreground!')
   //     }
   //     this.setState({appState: nextAppState});
   //   }


  render() {
//     var dataArray1 = ["811581","810906","809912" ];
//     dataArray1.forEach(function (item, index) {
//        getArticleLinks(item).then(data => {
//          this.setState({
//        data1: data
//          })
// // console.log(data);
//       }
//     )
// });
// console.log(this.state.data1);

    const renderItem =({item, index}) => {
      let  dateobj = new Date(parseInt(item.pubDate+'000')).toISOString();
      let date1 = new Date(dateobj);
      const time = (moment(date1).format("MMM Do YY")==moment().format("MMM Do YY"))?moment(date1).format('HH:mm'): moment(date1).format('MM[/]DD');

          if(index%4==0)    return (
        <ListItem style={{backgroundColor: index%3==0 ? 'black' : 'white' ,marginLeft:0,paddingLeft:13,paddingRight:13}}>
                         <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={styles.TouchableOpacity} activeOpacity={0.5}>
                     <Body style={{ }}>
                     <Thumbnail style={styles.Thumbnail} square large  source={{ cache:'force-cache', uri:item.imageurlMedium!= null ? item.imageurlMedium : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
                       <Text numberOfLines={3}  style={[{color: index%3==0 ? 'white' : 'black'}, styles.textTitle]} >{item.title}</Text>
                         <Text  numberOfLines={3} style={[{color: index%3==0 ? 'white' : 'black'},styles.textBody]}>{item.body}</Text>
                         <View style={styles.viewTime}>
                           <Text style={{ color: index%3==0 ? 'white' : 'black',marginBottom:0,Bottom:0,marginLeft:0 , marginRight:1}} >{time}</Text>
                           <Text  style={[{color: index%3==0 ? 'white' : 'black'},styles.mainDestinationName]}>{`\uff5c ${item.mainDestinationName}`}</Text>
                     <View style={styles.viewIcon}>
                      <Icon style={styles.bookmarkIcon} name="bookmark" size={17} color={index%3==0 ? 'white' : 'black'}  />
                         <Icon style={styles.commentIcon} name="comment" size={17} color={index%3==0 ? 'white' : 'black'}  />
                            <Text style={styles.commentsCount}>{item.comments=item.comments>0?item.comments:null}</Text>
                   <Icon style={styles.shareIcon} name="share-alt" size={17} color={index%3==0 ? 'white' : 'black'}  />
                         </View>
                           </View>
                     </Body>
                     </TouchableOpacity>
                       </ListItem>
                     )
                      else  return (
                        <ListItem style={{paddingRight:13,marginLeft: 0,paddingLeft:13,backgroundColor: index%3==0 ? 'black' : 'white'}}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('FeedDetail',item)} style={{ flex:1}} activeOpacity={0.5}>
                              <View style={ { flexDirection: 'row', justifyContent: 'space-between'}}>
                              <View  style={{  flex: 2}}>
                               <Text numberOfLines={3}  style={{fontFamily:'Tageblatt Picto',marginBottom:5,fontSize: 18,color: index%3==0 ? 'white' : 'black' }} >{item.title}</Text>
                               <Text numberOfLines={2} style={{fontFamily:'Tageblatt Picto',marginRight: 10,marginBottom:5,fontSize: 14,color: index%3==0 ? 'white' : 'black' }}>{item.body}</Text>
                               </View>
                  <Thumbnail style={{ flex: 0.8,flexDirection: 'row',alignSelf: 'center',backgroundColor: '#eee' }} square large  source={{ cache:'force-cache', uri:item.imageurlSmall!= null ? item.imageurlSmall : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII='}}/>
                </View>
                <View style={ { marginTop: 10,flex: 1,flexDirection: 'row',alignSelf: 'center'}}>
                <View style={{ flex: 2, flexDirection: 'row' ,alignSelf: 'center', marginLeft: 0 }}>
                    <Text style={{ color: index%3==0 ? 'white' : 'black',marginBottom:0,Bottom:0 , marginRight:2}} >{time}</Text>
                     <Text  style={{ marginLeft: 0,color:index%3==0 ? 'white' : 'black'}}>{`\uff5c ${item.mainDestinationName}`}</Text>
                    </View>
                 <View style={{  flex: 0.8,flexDirection: 'row',alignSelf: 'center',justifyContent: 'space-between' }}>
                 <Icon style={{ marginLeft: 0 }} name="bookmark" size={14} color={index%3==0 ? 'white' : 'black'}  />
                    <View style={{ flexDirection: 'row',alignSelf: 'center' }}>
               <Icon name="comment" size={14} color={index%3==0 ? 'white' : 'black'} />
               <Text style={{fontSize: 8,marginLeft: 2 ,paddingTop: 0 ,color:index%3==0 ? 'white' : 'black'}}>{item.comments=item.comments>0?item.comments:null}</Text>
              </View>
              <Icon name="share-alt" size={14} color={index%3==0 ? 'white' : 'black'} />
                      </View>
                      </View>
                                 </TouchableOpacity>
                           </ListItem>
                      )
               }
               const getItemLayout = (data, index) => (
  {length: 200, offset: 200 * index, index}
);

    console.disableYellowBox = true;
    const { params } =  this.props.navigation.state;
    // let t2=(typeof params['object_relations'][0]['uri']!="undefined")?params['object_relations'][0]['uri']:null;
    // let imageurl = (typeof params['object_definitions'][t2]['crop_definitions']!="undefined")?params['object_definitions'][t2]['crop_definitions']['dpi_medium'].url:null;

if(params!=null) {
  getArticles(params.urll).then(data => {
      this.setState({
          isLoading: false,
    data: data,
// isSideMenuOpen: !this.state.isSideMenuOpen
      })
  }, error => {
      // Alert.alert("Error", "Something happend, please try again")
  }
)

}

// console.log(this.state.data);
     let view = this.state.isLoading ? (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
             <ActivityIndicator animating={this.state.isLoading} size="large" color="#00f0ff" />
             <Text style={{ marginTop: 8 }} children="" />
         </View>
     ) : (
         <FlatList
       showsVerticalScrollIndicator={false}
        style={{}}
            data={this.state.data}
            keyExtractor={(item,index) => index.toString()}
              // onEndReached={this.handleLoadMore.bind(this)}
            // onEndThreshold={0}
 renderItem = {renderItem}
   getItemLayout={getItemLayout}
  // removeClippedSubviews={true} // Unmount components when outside of window
  // initialNumToRender={10} // Reduce initial render amount
  // maxToRenderPerBatch={15} // Reduce number in each render batch
  // windowSize={10} // Reduce the window size
 />

    )
  // let IMAGEHEADER= <Image source={IMAGE.ICON_MENU} style={{ height:20,width:120 }}/>
return (
     <Container>
        <CustomHeader  title='Tageblatt'   isHome={true} navigation={this.props.navigation} />
     <Content
                   contentContainerStyle={{ backgroundColor:"white", width:Dimensions.get('window').width,flex:1,alignItems: 'center', justifyContent: 'center' }}
              children={view}  />
           </Container>
)
  }


};


const styles = StyleSheet.create({
    TouchableOpacity:{justifyContent :'center',alignItems: 'center',flexDirection:'row'},
  Thumbnail:  { marginBottom:7,marginLeft:0,paddingRight:0,width:null, height: 180, backgroundColor: '#eee'  },
  textTitle:{marginBottom:10,marginLeft:0,marginRight:0,paddingRight:0,fontFamily:'Tageblatt Picto',fontSize: 22 },
  textBody:{marginRight:0,marginBottom:10,marginLeft:0,paddingRight:0,fontSize: 18 ,marginRight: 0,fontFamily:'Tageblatt Picto'},
  viewTime:{ flexDirection: 'row', marginTop: 8 },
  mainDestinationName:{alignSelf:"center",marginLeft:0, marginBottom:0},
  viewIcon:{ flex: 1, flexDirection: 'row', marginTop: 0, marginLeft: 0 ,marginRight: 2 ,justifyContent :'flex-end',alignItems: 'center'},
bookmarkIcon:{ marginLeft: 10 },
commentIcon:{ marginLeft: 17 },
commentsCount:{fontSize: 16,color:"white",marginLeft: 5 },
shareIcon:{ marginLeft: 0 },
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

class SideMenu extends React.Component {
  constructor(props) {
       super(props);
       // this.toggleExpand=this.toggleExpand.bind(this);
       this.state = {
           isLoading: true,
           data: null,
           isError: false,
            expanded : false,
            selectedItem:''


       }
   }


   componentDidMount() {

       getMenusideGategory().then(data => {
           this.setState({
               isLoading: false,
         data: data,
 // expanded: (data && !!dataSource.length) ? data[3].label : null
           })
       }, error => {
           // Alert.alert("Error", "Something happend, please try again")
       })
   }

   // handleEnd = () => {
   //  console.log("index");
   //  };
    toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }
  onChangeLayout = (fruitName) => {
    this.setState({ selectedItem: fruitName,expanded : !this.state.expanded });
    this.componentDidMount();
  };

  render() {
    // console.log(this.state.selectedItem);
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
  <View style={{}}>
  <List style={{flex:1 }}
  dataArray={this.state.data}
    keyExtractor={(item,index) => index.toString()}
      onEndReachedThreshold={0}
      onEndReached = {() => {

           }}
renderItem={({item,index})=>{

if(item.childrens) return (
  <View>
       <ListItem style={styles.row} onPress={() => this.props.navigation.navigate('Feed',{urll:`http://awstgb2.tageblatt.lu/${item.feed}`}) &&this.props.navigation.closeDrawer()}>
           <Text style={[styles.title]}>{item.label}</Text>
           <Icon name={(this.state.selectedItem=== item.label)  && this.state.expanded ? 'minus' : 'plus'} size={14} color={"#474747"} onPress={() => this.onChangeLayout(item.label)}/>
       </ListItem>
       <View/>
       {
           (this.state.selectedItem=== item.label)  &&this.state.expanded &&
           <View style={{}}>
               <FlatList
               data={item.childrens}
               numColumns={1}
                 keyExtractor={(item,index) => index.toString()}
               renderItem={({item,index}) =>
                   <View>
                       <ListItem style={styles.row}onPress={() => this.props.navigation.navigate('Feed',{urll:`http://awstgb2.tageblatt.lu/${item.feed}`}) &&this.props.navigation.closeDrawer()}>
                           <Text >{item.label}</Text>
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
    </View>

):null;

    return (
      <View style={{ flex:1 }}>
        <View style={{ height:80,alignItems: 'center', justifyContent: 'center' }}>
        <Image source={IMAGE.ICON_MENU} style={{ height:60,width:160 }}/>
          </View>
          <ScrollView style={{ }}>
            <View style={{flexDirection: 'column',flex:1,  justifyContent: 'center',alignItems: 'stretch' }}>
          <List
           style={{marginBottom: 30}} >
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
       </View>
    );

  }
}


const navOptionHandler=(navigation)=>({
headerShown: false
})
const FeedStack = createStackNavigator({
  MyCarousel: {
    screen: MyCarousel,
    navigationOptions:navOptionHandler
  },
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



export default createAppContainer(MyDrawerNavigator);
