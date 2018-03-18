import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class SurveyForm extends Component {



  submitForm(e){

    e.preventDefault();


  }
    render(){
      return (
        <div>
          <h3>Nouvelle enquête</h3>
          <form onSubmit={this.submitForm} className="col s12">
            <div className="row">

              <div className="input-field col s6">
                <input id="last_name" type="text" onChange={(e)=>{this.setState({custom_field:e.target.value})}}  className="validate" />
                <label htmlFor="last_name">Début</label>
              </div>
            </div>
            <div className="row">

              <div className="input-field col s6">
                <input id="last_name" type="text" onChange={(e)=>{this.setState({custom_field:e.target.value})}}  className="validate" />
                <label htmlFor="last_name">Fin</label>
              </div>
            </div>
            <div className="row">

              <div className="input-field col s6">
                <input id="last_name" type="text" onChange={(e)=>{this.setState({custom_field:e.target.value})}}  className="validate" />
                <label htmlFor="last_name">Commentaire</label>
              </div>
            </div>
            <button className="btn">Create</button>
            <Link to={"/survey/"+this.props.match.params.subject_number} className="btn ">Cancel</Link>
          </form>
        </div>

      )
    }
}

export default SurveyForm;
