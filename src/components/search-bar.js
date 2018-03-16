import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchSubjects} from '../actions';
 class SearchBar extends Component{
  render(){
    return (
      <form id="userSearchForm" onSubmit={(e)=>{e.preventDefault()}} action="" className="flex align-center">
          <input type="text" placeholder="Search here" onChange={(e)=>{this.props.searchSubjects(e.target.value)}}/>
          <button id="btnSearch" className="background bg-cover"></button>
      </form>
    );
  }
}


export default connect(null,{searchSubjects})(SearchBar);
