import React from 'react';
import { ScrollView,Text,Dimensions, StyleSheet, View ,Image} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { getArticleLinks } from '../../src/services/news';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';

const { width: screenWidth } = Dimensions.get('window')


export default class MyCarousel extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
          name: '',
      email: '',
      data:null,
      entries: [
      { src: 'http://awstgb2.tageblatt.lu/wp-content/uploads/2020/05/66189-759x493.jpg' ,title:'444'},
      { src: 'http://awstgb2.tageblatt.lu/wp-content/uploads/2020/05/66189-759x493.jpg',title:'555' }
    ]
   }

   }
   componentDidMount() {
     getArticleLinks(811571).then(data => {
        this.setState({
      data: data.body
        })
    }, error => {
        Alert.alert("Error", "Something happend, please try again")
    }
   )
   }
    render () {
      const { width: screenWidth } = Dimensions.get('window');
    // var   str1=this.state.data?this.state.data.body:null;

      var m,
          urls = [],
          // urls1 = [],
          // str = '<img src="http://awstgb2.tageblatt.lu/wp-content/uploads/2020/05/66189-759x493.jpg" /><img class="d-block mx-auto" src=\"http://awstgb2.tageblatt.lu/wp-content/uploads/2020/05/66189-759x493.jpg" />',
          rex = /<img[^>]+src="?([^"\s]+)"?\s*\alt="First slide">/g,
            // rex1 = <p[^>]*>.*?</p>,
// str2=str1.replace(/\n\/g, "<br />");
str2=this.state.data;
      while ( m = rex.exec( str2 ) ) {
          urls.push( m[1] );
      }
      // while ( m = rex1.exec( str2 ) ) {
      //     urls1.push( m[1] );
      // }
 // console.log(this.state.data);

const   carousel    =  (<Carousel
            sliderWidth={screenWidth - 20}
            sliderHeight={screenWidth  - 20}
            itemWidth={screenWidth - 60}
            data={urls}
            renderItem= {({item, index}, parallaxProps)=>{
              return (
                  <View style={styles.item}>
                      <ParallaxImage
                          source={{ uri: item }}
                          containerStyle={styles.imageContainer}
                          style={styles.image}
                          parallaxFactor={0.4}
                          {...parallaxProps}
                      />
                      </View>
                    );
                    }}
                    hasParallaxImages={true}
                    />
                    );
const freeaccessComponenet = (
  <View style={{   flex:8,
width:Dimensions.get('window').width-30}}>
<HTML html={this.state.data}
ignoredTags= {urls?['div']:null}
renderers={{
   p :(_,children) => <Text  numberOfLines={2}  >{children}</Text>
}}
 imagesMaxWidth={Dimensions.get('window').width-30}
 tagsStyles={{
     p: {
       marginBottom:20,
fontSize:Dimensions.get('window').width*0.05,
fontFamily:'',
},
blockquote: {fontFamily:'',fontSize:Dimensions.get('window').width*0.05,},a: {fontFamily:'',fontSize:Dimensions.get('window').width*0.05},
img: {marginTop:10,}
    ,figcaption:{marginBottom:20},iframe:{maxWidth: '100%'}
}}
classesStyles={{
  infobox: {marginTop:10,
    borderBottomColor: "red",borderBottomWidth: 1,   borderTopColor: 'red',
      borderTopWidth: 1, paddingTop: 16,marginBottom:20,paddingBottom:16},
  'author': { fontFamily:'',fontSize:Dimensions.get('window').width*0.05 },'function':{fontFamily:'',fontSize:Dimensions.get('window').width*0.05}  }}
 />
 <WebView
    originWhitelist={["*"]}
    style={{width: "100%"}}
    javaScriptEnabled={true}
    source={{html: `
         <!DOCTYPE html>
         <html>
           <head></head>
           <body>
             <div id="baseDiv"><iframe
             src="https://datawrapper.dwcdn.net/Rr11t/4/"
             width="400" height="800"  allowtransparency="true" allow="encrypted-media"></iframe></div>
           </body>
         </html>
   `,
       }}
    startInLoadingState={true}
     scalesPageToFit={true}
  />
</View>);
const result=(urls!=[])?(<View>
         {carousel}
        {freeaccessComponenet}
        </View>):null;

        return (
          <View style={{ flex: 1 }}>
          <ScrollView>
          {result}
              </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
})
