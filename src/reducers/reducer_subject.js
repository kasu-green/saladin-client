import {FETCH_SUBJECTS,SEARCH_SUBJECTS} from '../actions/index';
import _ from 'lodash';

const initialState = {
  filter:'',
  data:[]
}

export default function (state=initialState,action){
  console.log(action);
  switch(action.type){
    case FETCH_SUBJECTS:
      return Object.assign({},state,{data:action.payload.data});
    break;
    case SEARCH_SUBJECTS:
      return Object.assign({},state,{filter:action.term});
    break;
    default:
      return state;
  }
}
