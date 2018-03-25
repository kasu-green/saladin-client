import {SELECT_SUBJECT} from '../actions/index';
import _ from 'lodash';

const initialState = {

}

export default function (state=initialState,action){
  console.log(action);
  switch(action.type){

    case SELECT_SUBJECT:

        return Object.assign({},action.payload);

    break;
    default:  
    return state;
  }
}
