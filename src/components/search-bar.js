import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchSubjects} from '../actions';
 class SearchBar extends Component{
  render(){
    return (
      <form className="subject_search_form" onSubmit={(e)=>{e.preventDefault()}} >
          <input type="text" placeholder="Chercher un sujet ici..." onChange={(e)=>{this.props.searchCallback(e.target.value)}}/>

      </form>
    );
  }
}


//export default connect(null,{searchSubjects})(SearchBar);
export default SearchBar;
