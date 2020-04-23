import React, { PureComponent } from 'react';
import moment from 'moment';
import {Text} from 'native-base';
export default class Time1 extends PureComponent{

    constructor(props){
        super(props);
        this.date = props.date;
    }

    render(){

let  dateobj = new Date(parseInt(this.date+'000')).toISOString();
let date1 = new Date(dateobj);

  //   var now = moment(new Date()); //todays date
  //   var duration = moment.duration(now.diff(date1));
  //   var hours = duration.asHours();
  //   var minutes = duration.asMinutes();
  //   console.log(minutes);
  //   if(minutes<60&&hours <24)
  // {    var time ='VOR  '+parseInt(hours)+'  MINUTEN';}
  //      else   if(hours <24)
  //     {   var time ='VOR  '+parseInt(hours)+'  STUNDEN';}
  //
  //      else
  //   {   var time =   moment(date1).format('YYYY[/]MM[/]DD h:mm');}

    // const time = (hours <24)? 'VOR  '+parseInt(hours)+'  STUNDEN': moment(date1).format('YYYY[/]MM[/]DD');
const time = moment(date1).format('DD[/]MM[/]YYYY  HH:mm');
        return (
           <Text  numberOfLines={1} children={time} style={{ marginleft: 5}}/>
        )
    }
}
