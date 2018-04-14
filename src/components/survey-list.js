import React, {Component} from 'react';

import {fetchSurveys,newSurvey,fetchSubject} from '../actions';
import {Link} from 'react-router-dom';
import SubjectForm from '../components/subject-form';
import {SearchBar} from './search-bar';
import Header from './header';
import SurveyCell from './survey-cell';
import CollectionTitle from './collection-title';
import CollectionItem from './collection-item';
import Loading from "./loading";

class SurveyList extends Component {
  constructor(props){
    super(props);
  }

  newSurvey(){

    this.props.newSurvey(this.props.subject.preset);

    this.props.history.push("/survey/"+this.props.subject._id+"/add");


  }

  renderList(){

    return this.props.surveys.map(survey=>{
      const{subject} = survey;
      var link = `/survey/${subject}/edit/${survey._id}`;
      return <SurveyCell key={survey._id} subject_id={subject} survey={survey} onClick={()=>{this.props.history.push(link)}}/>
    });
  }

  renderEmptyList(){
    if(this.props.surveys.length == 0){
      return (<CollectionItem text="aucune enquête trouvée"/>)
    }
  }

  render(){
    const subject_id = this.props.subject._id;
    return (
      <div>

        <Header title="Enquêtes" backTo={()=>{this.props.history.goBack()}}/>
        <section className="with-header-nospace flex flex-column align-center just-center">

          <SubjectForm
            name={this.props.subject._id+"edit"}
            subject={this.props.subject}
            presets={this.props.presets}
            cancelForm={()=>{}}
            submitForm={()=>{}}
            edit={false}
            />

          {this.renderEmptyList()}
          <ul className="collection">
            {this.renderList()}
          </ul>

          <div className="fixed-action-btn">
              <i onClick={this.newSurvey.bind(this)} className="material-icons">add</i>
          </div>

        </section>
      </div>
    );
  }
}
export default SurveyList;
