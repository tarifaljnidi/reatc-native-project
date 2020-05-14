import React from 'react';
import {AsyncStorage, Linking ,Share, View ,Image,ActivityIndicator, Alert ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
import { getArticleLinks } from '../../src/services/news';
import HTML from 'react-native-render-html';
import moment from 'moment';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

//class shows detail of selected article in Home.js page
class FeedDetail extends React.Component {
  constructor(props) {
        super(props);
          this.state = {
             isLoading: true,
             data : null,
   }
 }
  onCancel() {
      console.log("CANCEL")
  }

  render() {
//receive params from home.js
const { params } = this.props.navigation.state;
if(params!=null) {
  //method to get json of one article
   getArticleLinks(params.nid).then(data => {
      this.setState({
    isLoading: false,
    data: data
      })
  }, error => {
      Alert.alert("Error", "Something happend, please try again")
  }
)
}

//array of links of one article
const output = [];
const tt= params ? params['object_relations']: null;
 tt.forEach(entry => {
  Object.keys(entry).forEach(key => {
  const entity = entry['object_type'];
  // console.log(entity);
     if (entity === 'links_list' ) {
      output.push(entry['uri']);
     }
  });
});
//check  links of one article is not empty and assign to var links
if(output) {var links = params ?params['object_definitions'][output[0]].links:null;}
//check  other parameters of one article  to variables
const imageurl = params ? params.imageurlMedium : null;
const urlshare = params ?params.urlshare : null;
const commentscount= params ? parseInt(params.commentscount):null;
const title= this.state.data ? this.state.data.title:null;
var freeaccess= params ? params.freeaccess.toString():null;
const foretitle= params ? params.foretitle:null;
const mainDestinationName= params ?params.mainDestinationName:null;
var pubDate=params?(new Date(parseInt(params.pubDate+'000')).toISOString()):null;
let date1 = new Date(pubDate);
const time = moment(date1).format('DD[/]MM[/]YYYY  HH:mm');
const caption = params ?params['object_definitions'][params['object_relations'][0]['uri']]['caption']:null;
const comments=this.state.data ? this.state.data['comments']:null;

  // let shareOptions = {
  //           message: title + '\n' + urlshare,
  //         };
  //   const onSharefacebook = async () => {
  //       try {
  //         const result = await Share.shareSingle(Object.assign(shareOptions, {
  //            "social": "twitter"
  //          }));
  //       } catch (error) {
  //         alert(error.message);
  //       }
  //     };

//general sharing (acebook, messages, whatsup, ...)
const onShare = async () => {
    try {
      const result = await Share.share({
        message:title + '\n' + urlshare,

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

  //share on facebook
  const openFacebookLink = facebookId => {
    const FANPAGE_URL_FOR_APP = `fb://page/159616034235`;
    //    const FANPAGE_URL_FOR_APP = `fb://faceweb/f?href=https%3A%2F%2Fm.facebook.com%2Fsharer.php%3Fu%3Dhttp%3A%2F%2Fwww.${urlshare.slice(12)}`;
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

//if comments count greater than zero show camments page otherwise go to add comments page
const page = commentscount > 0 ? "Comments" : "AddComments";

var styles = StyleSheet.create({
p: {
 fontSize: 16,
color: 'black', // pink links
},
});

//body variable of article
var htmlContent =params ? params.body: null;

const freeaccessComponenet =
 (
  <View style={{   flex:8,
width:Dimensions.get('window').width-30}}>
<HTML html={htmlContent}
alterNode={ (node) => {
    const { name, parent } = node;
    // If the tag is an <a> and we've found a parent to be a blockquote
    // (see the utils part of this documentation to know more about getParentsTagsRecursively)
    if (name === 'a') {
        // Let's assign a specific color to the node's attribs (if there already are)
        node.attribs = { ...(node.attribs || {}), style: `color:blue;` };
        return node;
    }
    // Don't return anything (eg a falsy value) for anything else so nothing is altered
}
}
 onLinkPress={(href, attribs)=>{
    Linking.openURL(attribs);
 }}

renderers={{
    // p :(htmlAttribs, children, convertedCSSStyles, passProps) =>
    // <Text  numberOfLines={2}  >{children}</Text>
}}
 imagesMaxWidth={Dimensions.get('window').width-30}
 tagsStyles={{
     p: { marginBottom:20,
fontSize:Dimensions.get('window').width*0.05,fontFamily:'',},
blockquote: {fontFamily:'',fontSize:Dimensions.get('window').width*0.05,},a: {fontFamily:'',fontSize:Dimensions.get('window').width*0.05},
img: {marginTop:10,}  ,figcaption:{marginBottom:20},iframe:{maxWidth: '100%'}
}}
classesStyles={{
  infobox: {marginTop:10,
    borderBottomColor: "red",borderBottomWidth: 1,   borderTopColor: 'red',
      borderTopWidth: 1, paddingTop: 16,marginBottom:20,paddingBottom:16},
  'author': { fontFamily:'',fontSize:Dimensions.get('window').width*0.05 },'function':{fontFamily:'',fontSize:Dimensions.get('window').width*0.05}  }}
 />
</View>);
  const MEHR =links?(<Text style={{flexDirection: 'row' ,fontSize: 26 }} >MEHR VOM TAGEBLATT</Text>):null;
  const bottomline =links?(<View
style={{
marginTop:5,
borderBottomColor: "black",
 borderBottomWidth: 4,
 alignSelf:'stretch',
width:Dimensions.get('window').width-30
}}
/>):null;

//show header and article details and footer for sharing
    return (

      <View style={{ flex: 1 }}>
      <ScrollView>
          <Header style={{ backgroundColor: 'black' }}>
            <Left>
              <Button transparent>
                <Icon name='arrow-left' size={22} color="white" onPress={() => this.props.navigation.goBack()}/>
              </Button>
              </Left>
            <Body >
             <Title style={{ fontSize: 22 }}>{mainDestinationName}</Title></Body>
            <Right>
            </Right>
          </Header>
      <View style={{ marginLeft: 15,flex: 1,fontFamily:'', flexDirection: 'column',  justifyContent: 'center',alignItems: 'flex-start' }}>
      <View   style={{ flex: 1, width:Dimensions.get('window').width-30}} >
        <Text style={{fontFamily:'',color:'red', flex: 1,fontSize: 24,marginTop: 15,marginBottom:5 }}>{foretitle}<Text style={{fontFamily:'',fontSize: 24,marginTop: 15,marginBottom:5}}>{' / '+title}</Text></Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', marginBottom:5}}>
        <Text style={{fontFamily:'',fontSize: 16 }}>{mainDestinationName}  |  </Text>
        <Text style={{ fontSize: 16}}>{time}</Text>
      </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Image
         style={{
           flex: 1,
         width:Dimensions.get('window').width-30,height: 288
         }}
         source={{uri:imageurl}}
         />
          <Text numberOfLines={2} style={{fontFamily:'',backgroundColor: '#3d3d3d',color:"#f2f2f2", padding: 10, left:0,right: 0,position: 'absolute', fontSize: 12,bottom:0,alignItems: 'center', justifyContent: 'center'}}>{caption}</Text>
     </View>
{freeaccessComponenet}
        {MEHR}
      {bottomline}
        <List  style={{marginBottom:50}}
            dataArray={links}
        renderItem={({item})=>{
          return (
                      <ListItem style={{marginLeft: 0}} noBorder>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('ArticleLink',item)} style={{flexDirection:'row'}} activeOpacity={0.5}>
                      <Text  numberOfLines={3} style={{fontSize: 16 }} numberOfLines={2}>{`\u25A0 ${item.title}`}</Text>
                          </TouchableOpacity>
                    </ListItem>
                  )
            }} />
            <View style = {{alignSelf: 'center',marginBottom:30}}  >
            <Button style = {styles.button_style} danger onPress={() =>this.props.navigation.navigate( page,comments)} >
      <Text>KOMMENTARE</Text>
          </Button>
      </View>
        </View>
        </ScrollView>
        <View  navigation={this.props.navigation}  style={{ paddingHorizontal:20,backgroundColor: '#c4c6ca',justifyContent: 'space-around', alignItems: 'flex-start',flexDirection:'row',height:50 }}>
          <View  style={{  flexDirection: 'row',alignItems: 'center'}}>
              <Button transparent>
                 <Icon name='comments' onPress={() =>this.props.navigation.navigate( page,comments)}    size={22} color='#939497'/>
              </Button>
               <Text style={{color:'#939497',fontSize: 16,marginLeft: 3 }}>{commentscount}</Text>
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
                   size={22} color='#939497'/>
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

            size={22} color='#939497'/>
        </Button>
        <Button transparent>
          <Icon name='share-alt' onPress={onShare} size={22} color='#939497'/>
        </Button>
        </View>
          </View>

    );

  }

}
const styles=StyleSheet.create({
square: {
  width: 100,
  height: 100,
  backgroundColor: 'red',
},
item: {
  width: screenWidth - 60,
  height: screenWidth - 60,
},
imageContainer: {
  flex: 1,
  marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  backgroundColor: 'white',
  borderRadius: 8,
},
image: {
  ...StyleSheet.absoluteFillObject,
  resizeMode: 'cover',
},
});
export default FeedDetail;
