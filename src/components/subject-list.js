import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSubjects} from '../actions';
import {Link} from 'react-router-dom';


import SubjectCell from './subject-cell';
import SearchBar from './search-bar';
import Header from './header';
class SubjectList extends Component{
  componentDidMount(){
    console.log('mount');
    this.props.fetchSubjects();
  }

  renderSubjects(){
    return this.props.subjects.map(subject=>{
      return <SubjectCell key={subject._id} subject={subject}/>
    });
  }
  render(){
    return (
      <div>
      <Header title="Sujets"/>

      <section className="flex flex-column align-center just-center">
        <SearchBar/>


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
        if(!item.custom_field){
          item.custom_field = "";
        }
        const number = item.number.toLowerCase();
        const custom_field = item.custom_field.toLowerCase();

        return (number.startsWith(filter) || (custom_field.includes(filter)))
      } )};
}

export default connect(mapStateToProps,{fetchSubjects})(SubjectList);
