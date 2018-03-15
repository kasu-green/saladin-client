import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSubjects} from '../actions';
import {Link} from 'react-router-dom';


import SubjectCell from './subject-cell';
import SearchBar from './search-bar';

class SubjectList extends Component{
  componentDidMount(){
    this.props.fetchSubjects();
  }

  renderSubjects(){
    return this.props.subjects.map(subject=>{
      return <SubjectCell key={subject.id} subject={subject}/>
    });
  }
  render(){
    return (
      <div>
      <header>
        <nav className="flex align-center just-between">
          <div className="flex">
            <img src="img/salad.png" alt="logo Saladin"/>
            <h2 className="self-center">Sujets</h2>
          </div>
          <div className="flex">
            <div id="btnLinksList"></div>
            <button id="logout">logout</button>
          </div>
        </nav>
      </header>

      <section className="flex flex-column align-center just-center">
        <SearchBar/>
        <form id="userSearchForm" action="" className="flex align-center">

          <button id="btnSearch" className="background bg-cover"></button>
        </form>

        <ul id="listSubjects" className="collection">
          {this.renderSubjects()}
        </ul>

        <div className="fixed-action-btn">
          <Link to="/subjects/add" id="addSubject" className="btn-floating btn-large waves-effect waves-light red">
            <i className="material-icons">add</i>
          </Link>
        </div>

      </section>


      </div>
    );
  }
}

function mapStateToProps({subjects}){
  const {filter, data} = subjects;
  return {
    subjects: data.filter( (item) => {
        console.log(item);
        return (item.identifier.startsWith(filter) || item.custom_field.includes(filter))
      } )};
}

export default connect(mapStateToProps,{fetchSubjects})(SubjectList);
