import * as React from 'react';
import ButtonRow from './ButtonRow';
import FoodItems from '../foodItems';
import FoodImage from './FoodImage';

interface DisplayFoodProps{
  imageLocation: any,
  foodName: any,
  imageAttribution: any[],
  options: any[],
  handleClick: any
}

const foodItems = new FoodItems();
const imageProviderURL = foodItems.getSourceURL('gcp');

class Food extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
    foodItems.showFirstFood().then(() => this.setState({
      foodItem: foodItems.getCurrentFoodItem(),
      imageLocation: [imageProviderURL + foodItems.getCurrentFoodItem().image_file],
      foodName: [foodItems.getCurrentFoodItem().name],
      imageAttribution: [foodItems.getCurrentFoodItem().image_attribution_username, foodItems.getCurrentFoodItem().image_attribution_fullname]
    }));

    this.state = {
      foodItem:
        '',
      options:
      // TODO: this should be a ws call
         [{ id: '1', shortText: 'like', text: 'Like' }, { id: '2', shortText: 'havent-had', text: "Haven't Had" }, { id: '3', shortText: 'dont-like', text: "Don't Like" }],
      imageLocation:
         '',
      foodName:
         '',
      imageAttribution: ''
    };
  }

  async handleClick (e: { preventDefault: () => void; target: { id: string; }; }) {
    e.preventDefault();
    foodItems.submitFoodPreference(this.state.foodItem.id, e.target.id);

    const hasMoreFoods = await foodItems.showNextFood();

    // Set the information to the next food item retrieved through the submitFood called above
    this.setState({
      foodItem: foodItems.getCurrentFoodItem(),
      imageLocation: [imageProviderURL + foodItems.getCurrentFoodItem().image_file],
      foodName: [foodItems.getCurrentFoodItem().name],
      imageAttribution: [foodItems.getCurrentFoodItem().image_attribution_username, foodItems.getCurrentFoodItem().image_attribution_fullname]
    });
    this.props.hasMoreFoods(hasMoreFoods);
  }

  render () {
    let currentFoodImage;
    if (foodItems.isLoaded() === true) {
      if (foodItems.getFoodCount() === 0) {
        currentFoodImage = <h1 id="result-header">All done</h1>;
      } else {
        currentFoodImage = <DisplayFood imageLocation={this.state.imageLocation} foodName={this.state.foodName} imageAttribution={this.state.imageAttribution} options={this.state.options} handleClick={this.handleClick.bind(this)} />;
      }
    } else {
      currentFoodImage = '';
    }

    return <div className="container" id="content">
      {currentFoodImage}
    </div>;
  }
}

class DisplayFood extends React.Component<DisplayFoodProps> {
  render () {
    return <>
      <FoodImage imageLocation={this.props.imageLocation} foodName={this.props.foodName} imageAttribution={this.props.imageAttribution}/>
      <ButtonRow options={this.props.options} onClick={this.props.handleClick}/>
    </>;
  }
}

export default Food;
