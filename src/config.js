export const availableLocales= {
    "french":{
      language:"french",
      "dateFormat":"DD/MM/YYYY"
    }
  }
export const availableBreakdown = {
    "breakfast":{
      translation:[
        {
          name:"Petit Déjeuner",
          language:"french"
        }
      ]
    },
    "morning_collation":{
      translation:[
        {
          name:"Collation du matin",
          language:"french"
        }
      ]
    },
    "lunch":{
      translation:[
        {
          name:"Diner",
          language:"french"
        }
      ]
    },
    "afternoon_collation":{
      translation:[
        {
          name:"Gouter",
          language:"french"
        }
      ]
    },
    "supper":{
      translation:[
        {
          name:"Souper",
          language:"french"
        }
      ]
    }

}


export const _translate = (locale,translation_array,key)=>{
  for(var translation of translation_array){

    if(locale == translation.language){
      return translation[key];
    }
  }
  return "not translated";
}
