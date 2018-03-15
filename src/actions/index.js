
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const SEARCH_SUBJECTS = 'SEARCH_SUBJECTS';

export function searchSubjects(term){
  return {
    type: SEARCH_SUBJECTS,
    term: term
  }
}
export function fetchSubjects(){

  return {
    type:FETCH_SUBJECTS,
    payload:{
      data:[
        {
          id: 12,
          identifier: "498382",
          custom_field: "Mr Fabien Di Tore",
          last_survey: '2018-03-12'

        },
        {
          id: 13,
          identifier: "99898",
          custom_field: "Mr Fabien Di Tore",
          last_survey: '2018-03-12'
        },
        {
          id: 14,
          identifier: "303030303",
          custom_field: "Mr Fabien Di Tore",
          last_survey: '2018-03-12'
        }
      ]
    }
  }
}
