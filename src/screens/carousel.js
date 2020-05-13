import React from 'react';
import { Text,Dimensions, StyleSheet, View ,Image} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { getArticleLinks } from '../../src/services/news';
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
      data: data
        })
    }, error => {
        Alert.alert("Error", "Something happend, please try again")
    }
   )
   }
    render () {
      const { width: screenWidth } = Dimensions.get('window');
    var   str1=this.state.data?this.state.data.body:null;

      var m,
          urls = [],
          str = '<img src="http://awstgb2.tageblatt.lu/wp-content/uploads/2020/05/66189-759x493.jpg" /><img class="d-block mx-auto" src=\"http://awstgb2.tageblatt.lu/wp-content/uploads/2020/05/66189-759x493.jpg" />',
          rex = /<img[^>]+src=\"?([^"\s]+)"?\s*\/>/g,
// str2=str1.replace(/\\n/g, "<br />");

      while ( m = rex.exec( str ) ) {
          urls.push( m[1] );
      }
console.log( str1);

        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
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
