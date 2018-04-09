import {FETCH_PRESETS} from '../actions/index';
import _ from 'lodash';

const initialState = []

export default function (state=initialState,action){
  console.log(action);
  switch(action.type){

    case FETCH_PRESETS:

        return [...action.payload.data];

    break;
    default:
    return state;
  }
}
