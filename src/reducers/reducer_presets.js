import {FETCH_PRESETS,UPDATE_PRESET,ADD_PRESET} from '../actions/index';
import _ from 'lodash';

const initialState = []

export default function (state=initialState,action){
  //console.log(action);
  switch(action.type){
    case UPDATE_PRESET:
    debugger;
      let newState = Object.assign({},state);
      let preset = action.payload.data;

      if(!_.isUndefined(newState[preset._id])){
        newState[preset._id]=preset;
      }
      return newState;
    break;
    case ADD_PRESET:
      newState = Object.assign({},state);
      preset = action.payload.data;
      newState[preset._id]=preset;
      return newState;
    break;
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
