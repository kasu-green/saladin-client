import {CHANGE_LOCALE} from '../actions/index';
import {availableLocales} from '../config';
const initialState = {

    language:"french",
    dateFormat:"DD/MM/YYYY"

}

export default function (state=initialState,action){
  //console.log(action);
  switch(action.type){

    case CHANGE_LOCALE:
        var newLocale = action.payload;
        if(typeof(availableLocales[newLocale])!="undefined"){
          return Object.assign({},availableLocales[newLocale]);
        }
        return state;

    break;

    default:
      return state;
  }
}
