
import React, {Component} from 'react';

import  _ from 'lodash';


export default class CollectionTitle extends Component{



  render(){
    const{title, onClick} = this.props;
    return (


        <div onClick={onClick} className="collection-title flex flex-column just-center">


          <div>{title}</div>


        </div>

    );
  }
}
