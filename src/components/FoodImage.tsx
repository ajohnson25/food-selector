import * as React from 'react';
import UnsplashTag from './UnsplashTag';

interface Props{
  imageLocation: string,
  foodName: string,
  imageAttribution: string[]
}

class FoodImage extends React.Component<Props> {
  render () {
    return <div id="food" className="col s12">
      <img className="responsive-img" id="food-image" src={this.props.imageLocation} />
      <div className="row">
        <p className="col s9" id="food-name">{this.props.foodName}</p>
        <div className="col s3">
          <UnsplashTag imageAttribution={this.props.imageAttribution} />
        </div>
      </div>
    </div>;
  }
}

export default FoodImage;
