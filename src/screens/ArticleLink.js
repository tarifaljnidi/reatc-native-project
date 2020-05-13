import React from 'react';
import {AsyncStorage, Linking ,Share, View ,Image,ActivityIndicator, Alert ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
import { getArticleLinks } from '../../src/services/news';
import HTML from 'react-native-render-html';
import moment from 'moment';
import  {IMAGE}  from '../../src/constants/image';


export default class ArticleLink extends React.Component {
  constructor(props) {
       super(props);
       this.scrollView = null;
         this.state = {
      isLoading: true,
      data: null,
      isError: false,
  }
}
componentDidMount() {
// this.scrollView.scrollTo(0,0);
 // const _scrollView = this.scrollView;
//
//  if (_scrollView) {
//    _scrollView.scrollTo({x: 10});
//  }
// setTimeout(() => {
//     _scrollView.scrollTo(0, 0);
// }, 1);
}
// scrollListReftop=() => {
// this.scrollListReftop.scrollTo({x: 0, y: 0, animated: true})
// }
  render() {
const { params } = this.props.navigation.state;

if(params!=null) {
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
// const imageurl = this.state.data ? this.state.data['object_definitions'][this.state.data['object_relations'][0]['uri']]['crop_definitions']['dpi_medium'].url : null;
const links=this.state.data? this.state.data['object_definitions'][this.state.data['object_relations'][1]['uri']]['links']: null;
const title= this.state.data? this.state.data.title:null;
const foretitle= this.state.data ? this.state.data.foretitle:null;
// const  mainDestinationName= this.state.data? this.state.data.mainDestinationName:null;
const author= this.state.data?this.state.data.authors[0].name:null;
var pubDate=this.state.data?(new Date(parseInt(this.state.data.pubDate+'000')).toISOString()):null;
let date1 = new Date(pubDate);
 const time = moment(date1).format('DD[/]MM[/]YYYY  HH:mm');
const imageurl= this.state.data?this.state.data['object_definitions'][this.state.data['object_relations'][0]['uri']]['crop_definitions']['dpi_small'].url: null;
const body=this.state.data? this.state.data.body: null;
 const commentscount= this.state.data? parseInt(this.state.data.comments.count): null;
 const page = commentscount > 0 ? "Comments" : "AddComments";
 const caption = this.state.data ?this.state.data['object_definitions'][this.state.data['object_relations'][0]['uri']]['caption']:null;
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
// console.log(links);
// console.log(pubDate);

//  let  dateobj = new Date(parseInt(pubDate)).toISOString();
//  let date1 = new Date(dateobj);
// const time = (moment(date1).format("MMM Do YY")==moment().format("MMM Do YY"))?moment(date1).format('h:mm'): moment(date1).format('MM[/]DD');

 return (

      <View style={{ flex: 1 }}>
      <ScrollView ref={(ref) => { this.scrollView = ref; }}
  // ref='_scrollView'
  // onContentSizeChange={() => { this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true}); }}
 >
          <Header style={{ backgroundColor: 'black' }}>
            <Left>
              <Button transparent>
                <Icon name='arrow-left' size={20} color="white" onPress={() => this.props.navigation.goBack()}/>
              </Button>
              </Left>
            <Body><Image  style={{ marginTop: 20,backgroundColor: 'white' }} source={IMAGE.ICON_MENU2} style={{ height:35,width:125 }}/></Body>
            <Right>
            </Right>
          </Header>
      <View style={{ marginLeft: 15,flex: 1,fontFamily:'Tageblatt Picto', flexDirection: 'column',  justifyContent: 'center',alignItems: 'flex-start' }}>
        <Text style={{ flex: 1,fontSize: 24,marginTop: 15 }}>{title}</Text>
        <View style={{ flex: 1, flexDirection: 'row',alignItems: 'center', marginBottom:5}}>
          <Text style={{ fontSize: 16}}>{author}  |  </Text>
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
         <Text numberOfLines={2} style={{backgroundColor: '#3d3d3d',color:"#f2f2f2", padding: 10, left:0,right: 0,position: 'absolute', fontSize: 12,bottom:0,alignItems: 'center', justifyContent: 'center'}}>{caption}</Text>
     </View>
      <View style={{   flex:8,
    width:Dimensions.get('window').width-30}}>
      <HTML html={body}
      imagesMaxWidth={Dimensions.get('window').width-30}
      tagsStyles={{
          p: {
    fontSize:Dimensions.get('window').width*0.05,
      // textAlign: 'left',
      // flexWrap: 'wrap',
// width: '6.5%'
},
blockquote: {fontSize:Dimensions.get('window').width*0.05},a: {fontSize:Dimensions.get('window').width*0.05},img: {marginTop:10},figcaption:{marginBottom:20}

}}
 classesStyles={{ 'author': { fontSize:Dimensions.get('window').width*0.05 },'function':{fontSize:Dimensions.get('window').width*0.05}  }}
      />
      </View>
      {MEHR}
    {bottomline}
          <List  style={{marginBottom:50}}
              dataArray={links}
          renderItem={({item})=>{
              return (
                        <ListItem style={{marginLeft: 0}} noBorder>
                        <TouchableOpacity onPress={() => {this.scrollView.scrollTo(0);this.props.navigation.navigate('ArticleLink',item)}} style={{flexDirection:'row'}} activeOpacity={0.5}>
                        <Text  numberOfLines={3} style={{fontSize: 16 }} numberOfLines={2}>{`\u25A0 ${item.title}`}</Text>
                            </TouchableOpacity>
                      </ListItem>
                    )
              }} />
              <View style = {{alignSelf: 'center',marginBottom:30}}  >
              <Button danger >
        <Text>KOMMENTARE</Text>
            </Button>
              </View>
        </View>
              </ScrollView>
              <View  navigation={this.props.navigation}  style={{ marginTop:5,paddingHorizontal:20,backgroundColor: '#c4c6ca',justifyContent: 'space-around', alignItems: 'flex-start',flexDirection:'row',height:50 }}>
                <View  style={{  flexDirection: 'row',alignItems: 'center'}}>
                    <Button transparent>
                       <Icon name='comments' onPress={() =>this.props.navigation.navigate( page,this.state.data['comments'])}  size={20} color='#939497'/>
                    </Button>
                     <Text style={{color:'#939497',fontSize: 14,marginLeft: 3 }}>{commentscount}</Text>
                </View>
              <Button transparent>
                <Icon name='facebook-square' onPress={() => this.props.navigation.navigate('Comments')} size={20} color='#939497'/>
              </Button>
              <Button transparent>
                <Icon name='twitter-square' onPress={() => this.props.navigation.navigate('Comments')} size={20} color='#939497'/>
              </Button>
              <Button transparent>
                <Icon name='share-alt' onPress={() => this.props.navigation.navigate('Comments')} size={20} color='#939497'/>
              </Button>
              </View>
                </View>

 );

  }
}

const styles = StyleSheet.create({

 button_style: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
   // alignItems: 'flex-end',
   // alignSelf:'center',
    // marginBottom: 20,
    // marginHorizontal:120,
    // position: 'absolute', top: 0, left: 0, right: 0, height: 300, alignItems: 'center', justifyContent: 'center'
 },
button:{
    width:'100%',
    height:54,
    alignItems:'center',
    paddingLeft:35,
    paddingRight:35,
    fontSize: 12,
}

 });
