
//survey editor reducers

/*

  cf api for data structure;

*/

import moment from 'moment';
import _ from 'lodash';

import {FETCH_DIARY} from '../actions';
const initialState = {

      "diary": [

      ],
      "_id": "-1",
      "date": "2018-02-02T00:00:00.000Z"


}

export default function (state=initialState,action){
  switch(action.type){
    case FETCH_DIARY:
      return Object.assign({},action.payload.data);
    break;
    default:
      return state;
  }
}
