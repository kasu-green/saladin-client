import {FETCH_PRESETS} from '../actions/index';
import _ from 'lodash';

const initialState = []

export default function (state=initialState,action){
  console.log(action);
  switch(action.type){

    case FETCH_PRESETS:
        // sort them by _id
        let presets = _.reduce(action.payload.data , function(obj,item) {
         obj[item._id] = item;
         return obj;
        }, {});
        return presets;

    break;
    default:
    return state;
  }
}
