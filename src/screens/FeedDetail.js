import React from 'react';
import {AsyncStorage, Linking ,Share, View ,Image,ActivityIndicator, Alert ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
// import { getArticles } from '../../src/services/news';
 import HTML from 'react-native-render-html';
// import  Time  from '../../src/components/time';
import  Time1  from '../../src/components/time1';
// import CustomHeader  from './Home';


// class CustomHeader extends React.Component {
//  render() {
//  let title=this.props
//    return (
//        <Header style={{ backgroundColor: 'black' }}>
//          <Left>
//            <Button transparent>
//              <Icon name='arrow-left' size={20} color="white" onPress={() => this.props.navigation.goBack()}/>
//            </Button>
//            </Left>
//          <Body>
// <Text >{title}</Text>
//            </Body>
//          <Right>
//          </Right>
//        </Header>
//    )
//  }
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
          <Header style={{ backgroundColor: 'black' }}>
            <Left>
              <Button transparent>
                <Icon name='arrow-left' size={20} color="white" onPress={() => this.props.navigation.goBack()}/>
              </Button>
              </Left>
            <Body >
             <Title style={{ fontSize: 20 }}>{params.mainDestinationName}</Title></Body>
            <Right>
            </Right>
          </Header>
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
        <View
  style={{
    marginTop:5,
    borderBottomColor: "black",
     borderBottomWidth: 4,
     alignSelf:'stretch',
  width:Dimensions.get('window').width-30
  }}
/>
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
            <Button style = {styles.button_style} danger onPress={() =>this.props.navigation.navigate( page,params)} >
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
export default FeedDetail;
