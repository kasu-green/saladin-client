import axios from 'axios';
//survey editor reducers

/*

  cf api for data structure;

*/

import moment from 'moment';
import _ from 'lodash';
import {getAPIUrl} from '../actions';

import {FETCH_DIARY,ADD_INGESTA} from '../actions';
const initialState = {

      "diary": [

      ],
      "_id": "-1",
      "date": "2018-02-02T00:00:00.000Z"


}

export default function (state=initialState,action){
  switch(action.type){
    case ADD_INGESTA:
    case FETCH_DIARY:
      let diaryDay = action.payload.data.diary;
      //debugger;
      let diary = _.reduce(diaryDay , function(obj,item) {
       obj[item.key] = item;
       return obj;
      }, {});
      action.payload.data.diary = diary;
      return Object.assign({},action.payload.data);
    break;
    default:
      return state;
  }
}
