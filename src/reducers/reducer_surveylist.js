import {FETCH_SURVEYS} from '../actions/index';
import _ from 'lodash';

const initialState = {
  filter:'',
  data:[]
}

export default function (state=initialState,action){
  switch(action.type){
    case FETCH_SURVEYS:
    
        return Object.assign({},state,{data:action.payload.data});
    break;
    default:
      return state;
  }
}
