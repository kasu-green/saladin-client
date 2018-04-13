import {AUTHENTICATED,UNAUTHENTICATED,AUTHENTICATION_ERROR} from '../actions/index';
import _ from 'lodash';


export default function (state={authenticated:false},action){
  console.log(action);
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, authenticated: false, error: action.payload };
  }
  return state;
}