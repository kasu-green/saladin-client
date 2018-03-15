import {FETCH_SUBJECTS,SEARCH_SUBJECTS,ADD_SUBJECT} from '../actions/index';
import _ from 'lodash';

const initialState = {
  filter:'',
  data:[]
}

export default function (state=initialState,action){
  console.log(action);
  switch(action.type){
    case FETCH_SUBJECTS:
      //this is for testing purpose. We want to keep track of added and deleted data without an api
      if(state.data.length == 0){
        return Object.assign({},state,{data:action.payload.data});
      }else{
        return state;
      }
    break;
    case SEARCH_SUBJECTS:
      return Object.assign({},state,{filter:action.term});
    break;
    case ADD_SUBJECT:
      return  Object.assign({},state,{data: [...state.data, action.subject]})

    default:
      return state;
  }
}
