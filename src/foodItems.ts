/*!
 * Food selector main
 */
import axios from 'axios';

let id: number = 0;
let foodOrderArray: number[] = [];
let foodCount: number = 0;
let currentFoodItem: any = [];
let isLoaded = false;

class FoodItems {
  constructor () {
    axios.defaults.headers.common = { Authorization: `Bearer ${window.localStorage.getItem('bearer')}` };
  }

  getCurrentFoodItem () {
    return currentFoodItem;
  }

  /*
  * Check if the Food item has been loaded since the page shows All Done if not
  */
  isLoaded ():boolean {
    return isLoaded;
  }

  async getPreferenceResults (): Promise<any> {
    try {
      const response = await axios.get(`/api/userFoodPreferences/${window.localStorage.getItem('uuid')}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets the array of foods that the user hasn't had the preference recorded on yet
   */
  async getRemainingFoodList (): Promise<void> {
    try {
      // reset the array since if a user goes to show results and back it adds to the array
      id = 0;
      foodOrderArray = [];
      const response = await axios.get(`/api/foods/allUser/${window.localStorage.getItem('uuid')}`);
      foodCount = response.data.length;
      for (let i = 0; i < response.data.length; i++) {
        foodOrderArray = [response.data[i].food_id, ...foodOrderArray];
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Gets the count of the foods that haven't had the preference recorded
   */
  getFoodCount ():number {
    return foodCount;
  }

  /**
   * Posts the food preference to the web service
   * @param id The id number of the food
   * @param response The user's preference, Like/Haven't Had/Dislike
   */
  async submitFoodPreference (id: number, response: string): Promise<void> {
    try {
      await axios.post(`/api/userFoodPreferences/${window.localStorage.getItem('uuid')}`, { foodId: id, foodPreferenceId: response });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Initializes the food order array and then loads the first food in that array
   */
  showFirstFood () :Promise<any> {
    return new Promise((resolve) => {
      this.getRemainingFoodList().then(() => {
        this.shuffle(foodOrderArray);
        this.showNextFood().then(() => resolve(isLoaded = true));
      });
    });
  }

  /**
   *   Gets the source url based on what is provided.  Current options are local and gcp.
  */
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
  async showNextFood (): Promise<boolean> {
    if (id < foodCount) {
      try {
        const currentFood = await axios.get(`/api/foods/${foodOrderArray[id]}`);
        currentFoodItem = currentFood.data;
        id = id + 1;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  }

  /**
 * Fisher-Yates / Knuth shuffle
 */
  static shuffle (array: number[]):number[] {
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
