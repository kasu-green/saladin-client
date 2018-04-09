import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {addSubject,saveSubject,fetchPresets} from '../actions';
class SubjectForm extends Component{

  constructor(props){
    super(props);
    this.state = {identifier:'0000',custom_field:'',preset:null,redirect:false,loaded:false};

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount(){

    this.props.fetchPresets().then(()=>{
      var preset = this.props.presets[Object.keys(this.props.presets)[0]];

      var preset_id = preset._id;
      const promise = this.props.addSubject();

      promise.subject.then(data=>{
        //debugger;
        this.setState({loaded:true,_id:data.data._id,preset:preset_id});
      });

    })

  }

  submitForm(e){

    e.preventDefault();
    const{_id,custom_field,preset} = this.state;
    const promise = this.props.saveSubject(_id,custom_field,preset);

    promise.subject.then(data=>{
          this.props.history.push('/subjects');
    }).catch(error=>{
      alert('error occured');
    });


  }
  renderOptions(){
    return _.map(this.props.presets,(preset)=>{
      return (
          <option value={preset._id} key={preset._id}>{preset.name}</option>
        )
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
            <div className="input-field col s6">
              <select name="preset"  onChange={(e)=>{
                    this.setState({preset:e.target.value})}}  className="breakdown" >
                {this.renderOptions()}
              </select>
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

export default connect((state)=>{return {presets:state.presets}},{addSubject,fetchPresets,saveSubject})(SubjectForm);
