import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSubjects} from '../actions';
import {Link} from 'react-router-dom';
import SubjectCell from './subject-cell';
import SearchBar from './search-bar';
import Header from './header';
import CollectionItem from './collection-item';

class SubjectList extends Component{


  renderSubjects(){

      return this.props.subjects.map(subject=>{
        return (<SubjectCell history={this.props.history} key={subject._id} subject={subject}/>)
      });

  }
  renderEmptyList(){
    if(this.props.subjects.length == 0){
      return (<CollectionItem text="aucune sujet trouvé"/>)
    }
  }
  renderList(){

    return (

        <ul id="listSubjects" className="collection">
          {this.renderSubjects()}
        </ul>
      )
  }
  renderError(){
    if(this.props.error){
      return (<div className="error">Une erreur est survenue: {this.props.error_message}</div>)
    }
  }
  render(){
    return (
      <div>

      <Header title="Sujets"/>
      <section className="main flex flex-column align-center just-center">

        <SearchBar searchCallback={this.props.searchCallback}/>
        {this.renderError()}
        {this.renderEmptyList()}
        {this.renderList()}

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
/*
function mapStateToProps({subjects}){
  const { data, error,error_message} = subjects;
  let {filter} = subjects;
  //debugger;
  return {
    error:error,
    error_message,
    subjects: data.filter( (item) => {
        //debugger;
        if(!item.custom_field){
          item.custom_field = "";
        }
        filter = filter.toLowerCase();
        const number = (''+item._id).toLowerCase();
        const custom_field = item.custom_field.toLowerCase();

        return (number.startsWith(filter) || (custom_field.includes(filter)))
      } )};
}

export default connect(mapStateToProps,{fetchSubjects})(SubjectList);*/

export default SubjectList;
