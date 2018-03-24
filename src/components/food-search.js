import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchFood} from '../actions';
import cx from "classnames";
class FoodSearch extends Component {

  constructor(props){
    super(props);
    this.state = {term: 'Poulet',selectedElementId:-1, displayAutoComplete:false};
  }
  componentDidMount(){

    this.onInputChange(this.state.term);
  }
  translatedName(food){
    for(var translation of food.translation){
      //console.log(this.props.locale.language == translation.language);
      if(this.props.locale.language == translation.language){
        return translation.name;
      }
    }
    return food.translation[0].name;
  }

  selectElement(food){
    this.setState({selectedElementId:food._id,term:this.translatedName(food),displayAutoComplete:false});
  }

  renderAutoComplete(){


    const items = this.props.foods.data.map(food=>{
      return (
        <li onClick={(e)=>{this.selectElement(food)}} ref={food._id} key={food._id}>{this.translatedName(food)}</li>
      )
    });
    var classNames = cx({
      "autocomplete":true,
      "visible": this.state.displayAutoComplete
    });
    return(<ul className={classNames}>{items}</ul>);
  }

   render() {
     return (
       <div className="search-bar">
        <input
          onClick = {(e)=>{ e.currentTarget.select()}}
          value = {this.state.term}
          onChange={(e)=>this.onInputChange(e.target.value)} />
          {this.renderAutoComplete()}
        </div>
    )
   }

   onInputChange(term){
     this.setState({term,displayAutoComplete:true});
     this.props.searchFood(term);
   }

}

export default connect((state)=>{return {foods:state.foods,locale:state.locale}},{searchFood})(FoodSearch);
