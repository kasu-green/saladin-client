import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {addSubject,saveSubject} from '../actions';
class SubjectForm extends Component{

  constructor(props){
    super(props);
    this.state = {identifier:'0000',custom_field:'',redirect:false,loaded:false};

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount(){
    const promise = this.props.addSubject();

    promise.subject.then(data=>{
      debugger;
      this.setState({loaded:true,_id:data.data._id});
    });
  }

  submitForm(e){

    e.preventDefault();
    const{_id,custom_field} = this.state;
    const promise = this.props.saveSubject(_id,custom_field);
    
    promise.subject.then(data=>{
          this.props.history.push('/subjects');
    }).catch(error=>{
      alert('error occured');
    });


  }
  render(){
    if(!this.state.loaded){
      return (<div>fetching a subject number... please wait</div>)
    }else{
    return (
      <div>
        <h3>Créer un nouveau sujet</h3>
        <form onSubmit={this.submitForm} className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Placeholder" value={this.state._id} disabled  type="text" className="validate" />
              <label htmlFor="first_name">Numero patient</label>
            </div>
            <div className="input-field col s6">
              <input id="last_name" type="text" onChange={(e)=>{this.setState({custom_field:e.target.value})}}  className="validate" />
              <label htmlFor="last_name">Champ personnalisé</label>
            </div>
          </div>
          <button className="btn">Create</button>
          <Link to="/subjects" className="btn ">Cancel</Link>
        </form>
      </div>

    );
    }
  }
}

export default connect(null,{addSubject,saveSubject})(SubjectForm);
