import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchFood} from '../actions';
import cx from "classnames";

class FoodSearch extends Component {

  constructor(props){
    super(props);
    this.state = {term: '',selectedElementId:-1, displayAutoComplete:false};
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

    //redux form plug

    if(this.props.input){
      const { input: { value, onChange } } = this.props;

      onChange(food._id);
    }
  }

  renderAutoComplete(){

    if(!this.props.foods.data){
      return ;
    }
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
     const {
       input,
       label,
       type,
       meta: { touched, error, warning }
     } = this.props;
     return (
       <div className="search-bar food-search">
        <input

          placeholder= "Chercher un aliment"
          onClick = {(e)=>{ e.currentTarget.select()}}
          value = {this.state.term}
          onChange={(e)=>this.onInputChange(e.target.value)} />
          {this.renderAutoComplete()}
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
    )
   }

   onInputChange(term){


     this.setState({term,displayAutoComplete:true});
     this.props.searchFood(term);
   }

}

export default connect((state)=>{return {foods:state.foods,locale:state.locale}},{searchFood})(FoodSearch);
