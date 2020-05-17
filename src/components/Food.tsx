import * as React from 'react';
import ButtonRow from './ButtonRow';
import FoodItems from '../foodItems';
import FoodImage from './FoodImage';

const foodItems = new FoodItems();

class Food extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    foodItems.showFirstFood();
    console.log(foodItems.getCurrentFoodItem());
    this.state = {
      foodItem:
        foodItems.getCurrentFoodItem(),
      options:
         [{ shortText: 'like', text: 'Like' }, { shortText: 'havent-had', text: "Haven't Had" }, { shortText: 'dont-like', text: "Don't Like" }],
      imageLocation:
         ['images/' + foodItems.getCurrentFoodItem().image_file],
      foodName:
         [foodItems.getCurrentFoodItem().name],
      imageAttribution: [foodItems.getCurrentFoodItem().image_attribution_username, foodItems.getCurrentFoodItem().image_attribution_fullname]
    };
  }

  handleClick (e: any) {
    e.preventDefault();
    foodItems.submitFood(this.state.foodItem.id, this.state.foodName, e.target.value);
    this.props.hasMoreFoods(foodItems.showNextFood());
    // Set the information to the next food item retrieved through the submitFood called above
    this.setState({
      foodItem: foodItems.getCurrentFoodItem(),
      imageLocation: ['images/' + foodItems.getCurrentFoodItem().image_file],
      foodName: [foodItems.getCurrentFoodItem().name],
      imageAttribution: [foodItems.getCurrentFoodItem().image_attribution_username, foodItems.getCurrentFoodItem().image_attribution_fullname]
    });
  }

  render () {
    return <div className="container" id="content">
      <FoodImage imageLocation={this.state.imageLocation} foodName={this.state.foodName} imageAttribution={this.state.imageAttribution}/>
      <ButtonRow options={this.state.options} onClick={this.handleClick.bind(this)}/>
    </div>;
  }
}

export default Food;
