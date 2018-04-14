import {SELECT_SUBJECT,ADD_SUBJECT} from '../actions/index';
import _ from 'lodash';

const initialState = {

}

export default function (state=initialState,action){
  console.log(action);
  switch(action.type){

    case SELECT_SUBJECT:

        return Object.assign({},action.payload);

    break;
    case ADD_SUBJECT:
      return Object.assign({},action.payload.data);
    break;
    default:
    return state;
  }
}
