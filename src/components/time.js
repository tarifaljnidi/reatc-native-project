import React, { PureComponent } from 'react';
import moment from 'moment';
import {Text} from 'native-base';
export default class Time extends PureComponent{

    constructor(props){
        super(props);
        this.date = props.date;
    }

    render(){
      // console.log(this.date);
//       var tzoffset = (new Date(parseInt(this.date))).getTimezoneOffset() * 60000; //offset in milliseconds
// var localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
let  dateobj = new Date(parseInt(this.date+'000')).toISOString();
let date1 = new Date(dateobj);

      const time = (moment(date1).format("MMM Do YY")==moment().format("MMM Do YY"))?moment(date1).format('HH:mm'): moment(date1).format('MM[/]DD');
      // const time =moment(date1).format('MM[/]DD h:mm');
        return (
           <Text note numberOfLines={1} children={time} style={{ marginRight: -5}}/>
        )
    }
}
