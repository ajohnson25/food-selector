/*!
 * Food selector main
 */
import axios from 'axios';

let id: number = 0;
let resultArray: any[] = [];
let foodOrderArray: number[] = [];
let foodCount: number = 0;
let currentFoodItem: any = [];
let isLoaded = false;

class FoodItems {
  getCurrentFoodItem () {
    return currentFoodItem;
  }

  isLoaded() {
    return isLoaded;
  }

  async getResults () {
    try {
      const response = await axios.get(`/api/userFoodPreferences/${window.localStorage.getItem('uuid')}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getFoodOrderArray () {
    try {
      //reset the array
      id = 0;
      foodOrderArray = [];
      const response = await axios.get(`/api/foods/allUser/${window.localStorage.getItem('uuid')}`);
      foodCount = response.data.length;
      for (let i = 0; i < response.data.length; i++) {
        foodOrderArray = [response.data[i].food_id,...foodOrderArray];
      }
    } catch (error) {
      console.log(error);
    }
  }

  getFoodCount ():number {
    return foodCount;
  }

  async submitFood (id: number, foodName: string, response: string) {
    // store the results here
    try {
      await axios.post(`/api/userFoodPreferences/${window.localStorage.getItem('uuid')}`, { foodId: id, foodPreferenceId: response });
    } catch (error) {
      console.log(error);
    }
    resultArray = [...resultArray, { id, foodName, response }];
    window.localStorage.removeItem('results');
    window.localStorage.setItem('results', JSON.stringify(resultArray));
  }

  showFirstFood () {
    return new Promise((resolve, reject) => {
      this.getFoodOrderArray().then(() => {
        this.shuffle(foodOrderArray);
        this.showNextFood().then(() => resolve(isLoaded = true));
      });
    });
  }

  // Gets the source url based on what is provided.  Current options are local and gcp.
  getSourceURL (provider: string): string {
    let returnString:string;
    if (provider === 'gcp') {
      returnString = 'https://storage.googleapis.com/triple-nectar-274118.appspot.com/images/';
    } else if (provider === 'local') {
      returnString = 'images/';
    } else {
      console.log('Invalid provider supplied, returning local image source');
      returnString = 'images/';
    }
    return returnString;
  }

  /**
 * Get the next food item from the list until there are no more, then display the results
 */
  async showNextFood () {
    if (id < foodCount) {
      try {
        const currentFood = await axios.get(`/api/foods/${foodOrderArray[id]}`);
        currentFoodItem = currentFood.data;
        id = id + 1;
        return true;
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  }

  /**
 * Fisher-Yates / Knuth shuffle
 */
  shuffle (array: number[]) {
    let currentIndex: number = array.length; let temporaryValue: number; let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

export default FoodItems;
