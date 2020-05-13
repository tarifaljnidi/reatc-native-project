import React from 'react';
import {  View ,Image ,StyleSheet, TouchableOpacity,Dimensions,ScrollView,SafeAreaView, TextInput ,FlatList} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Title,Text,Content, List, ListItem,Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Comments extends React.Component {
 constructor(props) {
      super(props);
  }
 render() {
   const { params } = this.props.navigation.state;
   let list=params?params.list:null;
   console.log(list);
   return (
     <View  style={{ flex: 1}}>
               <ScrollView>
               <Header style={{ backgroundColor: 'black' }}>
                 <Left>
                   <Button transparent>
                     <Icon name='arrow-left' size={20} color="white" onPress={() => this.props.navigation.goBack()}/>
                   </Button>
                   </Left>
                 <Body><Title style={{ fontSize: 20 }}>Kommentare</Title></Body>
                 <Right>
                 </Right>
               </Header>
     <View style={{width:Dimensions.get('window').width-20 }}>
        <Text style={{ marginLeft: 20,marginTop: 15 }}>{params.title}</Text>
        <List
        showsVerticalScrollIndicator={false}
            dataArray={list}
        renderItem={({item})=>{
          console.log(item);
            return (
                      <ListItem  style={{marginLeft: 20,paddingRight:0}} >
                      <View style={{flexDirection: 'column'}}>
                      <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginBottom:5}}>
                        <Text   style={{left: 0, fontSize: 14 }} >_author_name</Text>
                        <Text   style={{right: 0,fontSize: 14 }} >{item.comment_date}</Text>
                      </View>
                      <Text  style={{fontSize: 12 }} >{item.comment_content}</Text>
                      </View>
                    </ListItem>

                  )
            }} />
     </View>
                   </ScrollView>
                   <View style={{ backgroundColor: 'white',justifyContent: 'center', alignItems: 'center',height:50 }}>
                       <Button style={{ backgroundColor: 'red',padding:20}} onPress={() => this.props.navigation.navigate('AddComments',params)}>
                       <Text style={{ color: 'white'}}>SCHREIBEN SIE EINEN KOMMENTAR</Text>
                       </Button>
                   </View>
       </View>
       );
 }
}
