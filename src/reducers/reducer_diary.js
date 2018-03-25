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

    /*  const {survey_id,values:{food_id,quantity,breakdown}} = action.payload;
      const newState = Object.assign({},state);
      let breakdown_idx = _.findIndex(newState.diary, { 'key':breakdown });

      //add the breakdown if it has not been added yet
      if(breakdown_idx == -1){
        newState.diary.push({key:breakdown,ingesta:[]});
        breakdown_idx=0;
      }

      newState.diary[breakdown_idx].ingesta.push({food_id,qty:quantity});

      const URL = getAPIUrl(`diary/${survey_id}`);
      axios.post(URL,newState);
      debugger;
      return newState;*/
      return Object.assign({},state,action.payload.data);
    break;
    case FETCH_DIARY:
      return Object.assign({},action.payload.data);
    break;
    default:
      return state;
  }
}
