import {FETCH_COMPONENTS} from '../actions';
const initialState = {}

export default function (state=initialState,action){
  switch(action.type){
    case FETCH_COMPONENTS:

      let components = _.reduce(action.payload.data , function(obj,item) {
       obj[item._id] = item;
       return obj;
      }, {});
      return components;
    break;
    default:
      return state;
  }
}
