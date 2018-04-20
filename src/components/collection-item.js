import _ from 'lodash';
import React,{Component} from 'react';


export default class CollectionItem extends Component{

  renderMainContent(){

  }
  renderAction(){
    const {text,subtext,icon,onClick} = this.props;
    if(!_.isUndefined(onClick)){
      return (<div className="tools-content self-center">
        <a className="secondary-content">
          <i className="material-icons">{icon}</i>
        </a>
      </div>)
    }
  }

  renderTextCenter(){
    const {centerText} = this.props;
    return (<div className="center-content self-base">{centerText}</div>)
  }

  render(){
    const {text,subtext,icon,onClick} = this.props;
    let classes = "collection-item-detail flex just-between";
    if(this.props.color){
      classes+= 'collection-item-color-'+this.props.color;
    }
    return (
      <div onClick={onClick}  className={classes}>
        <div className="flex wrap flex-column main-content self-base">
          <div>{text}</div>
          <div className="small_text">{subtext || ' '}</div>
        </div>
        {this.renderTextCenter()}
        {this.renderAction()}

      </div>
    )
  }
}
