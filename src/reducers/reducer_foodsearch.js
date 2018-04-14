import {FOOD_SEARCH} from '../actions/index';
import _ from 'lodash';

const initialState = {
  data:[]

}

export default function (state=initialState,action){

  switch(action.type){

    case FOOD_SEARCH:
        var newState = Object.assign({},{data:action.payload.data});
        return newState;

    break;

    default:
      return state;
  }
}
