import {FETCH_SUBJECTS,SEARCH_SUBJECTS,ADD_SUBJECT} from '../actions/index';
import _ from 'lodash';

const initialState = {
  filter:'',
  data:[],
  error:false,
  error_message:''
}

export default function (state=initialState,action){
  console.log(action);
  debugger;
  switch(action.type){

    case FETCH_SUBJECTS:
      let   data = action.payload.data;

      if(_.isUndefined(action.payload.data) || action.error){
        data = []
      }



      return Object.assign({},state,{data:data,error:action.error,error_message:action.payload.message});

    break;
    case SEARCH_SUBJECTS:
      return Object.assign({},state,{filter:action.term});
    break;
    /*case ADD_SUBJECT:
      return  Object.assign({},state,{data: [...state.data, action.subject]})
*/
    default:
      return state;
  }
}
