import {FOOD_SEARCH} from '../actions/index';
import _ from 'lodash';

const initialState = {
  data:[]

}

export default function (state=initialState,action){

  switch(action.type){

    case FOOD_SEARCH:
          console.log('received food search', action.payload.data);
        var newState = Object.assign({},{data:action.payload.data});
        console.log(newState);
        return newState;

    break;

    default:
      return state;
  }
}
