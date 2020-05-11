import React, { Component } from 'react';
import ButtonRow from './ButtonRow';
import FoodItems from './foodItems';
import FoodImage from './FoodImage';

const foodItems = new FoodItems();

class Food extends Component {
  constructor (props) {
    super(props);
    foodItems.showNextFood();
    this.state = {
      foodItem:
        foodItems.getCurrentFoodItem(),
      optionText:
         ['Yes', "Haven't Had", 'No'],
      optionId:
         ['yes', 'havent-had', 'no'],
      imageLocation:
         ['images/' + foodItems.getCurrentFoodItem().image],
      foodName:
         [foodItems.getCurrentFoodItem().name],
      imageAttribution: [foodItems.getCurrentFoodItem().imageAttribution[0], foodItems.getCurrentFoodItem().imageAttribution[1]]
    };
  }

  handleClick (e) {
    e.preventDefault();
    foodItems.submitFood(this.state.foodItem.id, this.state.foodName, e.target.id);
    this.setState({
      foodItem: foodItems.getCurrentFoodItem(),
      imageLocation: ['images/' + foodItems.getCurrentFoodItem().image],
      foodName: [foodItems.getCurrentFoodItem().name],
      imageAttribution: [foodItems.getCurrentFoodItem().imageAttribution[0], foodItems.getCurrentFoodItem().imageAttribution[1]]
    });
    console.log(foodItems.getCurrentFoodItem());
  }

  render () {
    return <div className="container" id="content">
      <FoodImage imageLocation={this.state.imageLocation} foodName={this.state.foodName} imageAttribution={this.state.imageAttribution}/>
      <ButtonRow optionText={this.state.optionText} optionId={this.state.optionId} onClick={this.handleClick.bind(this)}/>
    </div>;
  }
}

export default Food;
