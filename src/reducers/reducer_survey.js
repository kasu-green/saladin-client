
//survey editor reducers

/*


  day structure is :

  {
    date: "2017-01-01",
    periods:[]
  }

  periods structure:

  {
    key="breakfast",
    foods:[]
  }


  food structure is :
    {
      id:1002,
      qty: 500,
      components:[],
    }


  component = {
    id:0,
    name:303,
    unit: 'mg',
    value: 70
  }


*/

import moment from 'moment';
import {ADD_SURVEY_DAY} from '../actions';
const initialState = {
  survey:{
    _id:0,
    survey_date: moment().format('DD/MM/YYYY'),
    comment:'prout'
  },
  days:[]
}

export default function (state=initialState,action){
  switch(action.type){
    case ADD_SURVEY_DAY:
    
    const newState = Object.assign({},state,{survey:state.survey,days:[{date:action.payload}, ...state.days]});
    console.log(newState);
     return newState;
    break;
    default:
      return state;
  }
}
