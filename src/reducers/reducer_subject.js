import {SELECT_SUBJECT,ADD_SUBJECT,FETCH_SUBJECT} from '../actions/index';
import _ from 'lodash';

const initialState = {

}

export default function (state=initialState,action){
  switch(action.type){

    case SELECT_SUBJECT:

        return Object.assign({},action.payload);

    break;
    case FETCH_SUBJECT:
    case ADD_SUBJECT:
      return Object.assign({},action.payload.data);
    break;
    default:
    return state;
  }
}
