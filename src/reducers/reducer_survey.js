
//survey editor reducers

/*

  cf api for data structure;

*/

import moment from 'moment';
import _ from 'lodash';

import {ADD_SURVEY_DAY,ADD_SURVEY,FETCH_SURVEY} from '../actions';
const initialState = {

    _id:-1,
    date: moment().format('DD/MM/YYYY'),
    subject_id: -1,
    comment:'',
    diaries:[]

}

export default function (state=initialState,action){
  switch(action.type){
    case ADD_SURVEY:
    case FETCH_SURVEY:
      return Object.assign({},action.payload.data);
    break;
    case ADD_SURVEY_DAY: // append a new day to the list

    //  var date = moment(action.payload);
      //var formattedPayload = date.format('DD-MM-YYYY');

      var diaries = [...state.diaries];
      /*var found = false;
      //looking for an existing diary
      for(let day of state.diaries){
        if(day.date == formattedPayload){
        //  days.push(day);
          found = true;
          break;
        }
      }
      if(!found){
        diaries.push({date:formattedPayload});
      }*/
      diaries.push(action.payload.data);
      diaries  = _.orderBy(diaries, function(e){
        let ts = moment(e.date,'DD-MM-YYYY').unix();
        return ts ;
      },['asc']);

      const newState = Object.assign({},state,{survey:state.survey,diaries:diaries});


      console.log(newState);
     return newState;
    break;
    default:
      return state;
  }
}
