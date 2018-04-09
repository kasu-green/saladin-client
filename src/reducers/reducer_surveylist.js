import {FETCH_SURVEYS} from '../actions/index';
import _ from 'lodash';

const initialState = {
  filter:'',
  data:[]
}

export default function (state=initialState,action){
  switch(action.type){
    case FETCH_SURVEYS:
      let   data = action.payload.data;

      if(_.isUndefined(action.payload.data) || action.error){
        data = []
      }

      return Object.assign({},state,{data:data,error:action.error,error_message:action.payload.message});
    break;
    default:
      return state;
  }
}
