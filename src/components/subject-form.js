import React, {Component} from 'react';
import {Redirect} from 'react-router';

import {connect} from 'react-redux';
import {addSubject} from '../actions';
class SubjectForm extends Component{

  constructor(props){
    super(props);
    this.state = {identifier:'0000',custom_field:'',redirect:false};

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e){
    debugger;
    e.preventDefault();
    this.props.addSubject(this.state.identifier,this.state.custom_field);
    this.setState({redirect:true});
    <Redirect to="/subjects"/>
    //window.location.href='/subjects';
    this.props.history.push('/subjects');
  }
  render(){
    if(this.state.redirect){
    //  return <Redirect to="/subjects"/>
    }
    return (

        <form onSubmit={this.submitForm} className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Placeholder" onChange={(e)=>{this.setState({identifier:e.target.value})}} id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text" onChange={(e)=>{this.setState({custom_field:e.target.value})}}  className="validate" />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
          <button >Create</button>

        </form>


    );
  }
}

export default connect(null,{addSubject})(SubjectForm);
