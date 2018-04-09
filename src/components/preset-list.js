import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {fetchPresets,EMPTY_PRESET} from '../actions';
import  _ from 'lodash';
import CollectionItem from './collection-item';

import PresetForm from './preset-form';

class PresetList extends Component{
  constructor(props){
    super(props);

    this.state = {
      add:false
    }
  }
  componentDidMount(){
    this.props.fetchPresets();
  }

  renderPresets(){
    return _.map(this.props.presets,(preset)=>{
      //debugger;
      let icon = 'navigate_next';
      if(preset.user ==null){
        icon = 'lock_outline';
      }
      //<CollectionItem text={preset.name} subtext={preset.desc} icon={icon} onClick={()=>{alert('not yet')}}/>
      return (<li key={preset._id} className="collection-item">
          <PresetForm name={"preset_"+preset._id} edit={false} preset={preset}/>
        </li>)
    });
  }
  renderAdd(){
    if(this.state.add){
      return (<PresetForm name={"preset_new"} afterAdd={()=>{this.setState({add:false})}} edit={true} preset={EMPTY_PRESET}/>)
    }
  }
  render(){

    return (
      <div className="presets-list">
        <h3>Presets</h3>
        <ul className="collection">
          {this.renderPresets()}
          {this.renderAdd()}
          <button onClick={()=>{this.setState({add:true})}}>ajouter</button>
        </ul>
      </div>
    );
  }
}

PresetList = connect(
  (state)=>{
    return {
      presets:state.presets
    }
  }
  ,{fetchPresets})(PresetList);


export default  PresetList;
