import _ from 'lodash';
import React,{Component} from 'react';


export default class CollectionItem extends Component{

  renderMainContent(){

  }
  renderAction(){
    const {text,subtext,icon,onClick} = this.props;
    if(!_.isUndefined(onClick)){
      return (<div className="">
        <a className="secondary-content">
          <i className="material-icons">{icon}</i>
        </a>
      </div>)
    }
  }

  renderTextCenter(){
    const {centerText} = this.props;
    return (<div>{centerText}</div>)
  }

  render(){
    const {text,subtext,icon,onClick} = this.props;
    return (
      <div onClick={onClick}  className="collection-item-detail flex align-center just-between">
        <div className="flex wrap flex-column">
          <div>{text}</div>
          <div className="small_text">{subtext || ' '}</div>
        </div>
        {this.renderTextCenter()}
        {this.renderAction()}

      </div>
    )
  }
}
