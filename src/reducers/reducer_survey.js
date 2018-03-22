
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


  full example :


  {
    survey:
    {

    }
    diaries: [
      {
        date: "22-03-2018"
        diary: [
          {key: "breakfast",
            ingesta:[
              {
                food_id:3023,
                name:"Beef",
                quantity: 300,
                components:[
                  {
                    id:0,
                    name:"Energy",
                    unit: 'kcal',
                    value: 70
                  }
                ]
              }
            ]
          }
        ]

      }
    ]
  }

*/

import moment from 'moment';
import _ from 'lodash';

import {ADD_SURVEY_DAY} from '../actions';
const initialState = {
  survey:{
    _id:-1,
    survey_date: moment().format('DD/MM/YYYY'),
    subject_id: -1,
    comment:'prout'
  },
  days:[]
}

export default function (state=initialState,action){
  switch(action.type){
    case ADD_SURVEY_DAY: // append a new day to the list

      var date = moment(action.payload);
      var formattedPayload = date.format('DD-MM-YYYY');

      var days = [...state.days];
      var found = false;
      for(let day of state.days){
        if(day.date == formattedPayload){
        //  days.push(day);
          found = true;
          break;
        }
      }
      if(!found){
        days.push({date:formattedPayload});
      }
      days  = _.orderBy(days, ['date'],['asc']);

      const newState = Object.assign({},state,{survey:state.survey,days:days});


      console.log(newState);
     return newState;
    break;
    default:
      return state;
  }
}
