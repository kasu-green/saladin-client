
//survey editor reducers

/*

  cf api for data structure;

*/

import moment from 'moment';
import _ from 'lodash';

import {ADD_SURVEY_DAY,ADD_SURVEY,FETCH_SURVEY,EMPTY_SURVEY,UPDATE_SURVEY} from '../actions';

const initialState = EMPTY_SURVEY;

export default function (state=initialState,action){
  let newState=null;
  switch(action.type){
    case ADD_SURVEY:
    case FETCH_SURVEY:
    case UPDATE_SURVEY:
      debugger;
      action.payload.data._date = new Date(action.payload.data.date);



      newState =  Object.assign({},action.payload.data);

      newState.diaries  = _.orderBy(newState.diaries, function(e){
        let ts = moment(e.date,'YYYY-MM-DD').unix();
        return ts ;
      },['asc']);

      return newState;
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


      debugger;

      let o = _.find(diaries, function(d) {
        debugger;
        return moment(d.date).startOf('day').isSame(moment(action.payload.data.date).startOf('day'));
      });

      if (_.isUndefined(o)){
        diaries.push(action.payload.data);
      }


      diaries  = _.orderBy(diaries, function(e){
        let ts = moment(e.date,'YYYY-MM-DD').unix();
        return ts ;
      },['asc']);

      newState = Object.assign({},state,{survey:state.survey,diaries:diaries});


      console.log(newState);
     return newState;
    break;
    default:
      return state;
  }
}
