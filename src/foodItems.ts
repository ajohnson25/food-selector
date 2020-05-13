/*!
 * Food selector main
 */

let id: number = 0;
let resultArray: any[] = [];
let foodOrderArray: number[] = [];
let foodCount: number = 0;
let currentFoodItem: any[] = [];

class FoodItems {
  constructor () {
    this.getFoodCount();

    // create an array with the food count and then shuffle it to randomize
    for (let i = 1; i <= foodCount; i++) {
      foodOrderArray = [i, ...foodOrderArray];
    }
    this.shuffle(foodOrderArray);
  }

  getCurrentFoodItem () {
    return currentFoodItem;
  }

  /**
  * Get the count of foods from the server
  */
  getFoodCount () {
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', '/api/foods/count', false);
    xhr.onload = function () {
      if (this.status === 200) {
        const count = JSON.parse(this.responseText);
        foodCount = count;
      } else if (this.status === 404) {
        console.log('Not Found');
      }
    };

    xhr.onerror = function () {
      console.log('Request Error from setFoodCount()...');
    };

    xhr.send();
  }

  submitFood (id: number, foodName: string, response: string) {
    // store the results here
    resultArray = [...resultArray, { id, foodName, response }];
    window.localStorage.removeItem('results');
    window.localStorage.setItem('results', JSON.stringify(resultArray));
  }

  showFirstFood (): boolean {
    return this.showNextFood();
  }

  /**
 * Get the next food item from the list until there are no more, then display the results
 */
  showNextFood (): boolean {
    if (id < foodCount) {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('GET', `/api/foods/${foodOrderArray[id]}`, false);
      xhr.onload = function () {
        if (this.status === 200) {
          const currentFood = JSON.parse(this.responseText);
          currentFoodItem = currentFood[0];
        } else if (this.status === 404) {
          console.log('Not Found');
        }
      };

      xhr.onerror = function () {
        console.log('Request Error from showNextFood()...');
      };

      xhr.send();
      id = id + 1;
      return true;
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
