/*!
 * Food selector main
 */

let id = 0;
let resultArray = [];
let foodOrderArray = [];
let resultString = '<h1 id="result-header">Results</h1>';
let unsplashTag;
let foodCount = 0;
let foodImage;
let foodName;
let content;
let currentFoodItem = [];

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
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/foods/count', false);
    xhr.onload = function () {
      if (this.status === 200) {
        const count = JSON.parse(this.responseText);
        foodCount = count;
      } else if (this.status === 404) {
        document.getElementById('text').innerHTML = 'Not Found';
      }
    };

    xhr.onerror = function () {
      console.log('Request Error from setFoodCount()...');
    };

    xhr.send();
  }

  submitFood (id, foodName, response) {
    // store the results here
    resultArray = [...resultArray, { id, foodName, response }];
    window.localStorage.removeItem('results');
    window.localStorage.setItem('results', JSON.stringify(resultArray));
  }

  showFirstFood () {
    this.showNextFood();
  }

  /**
 * Get the next food item from the list until there are no more, then display the results
 */
  showNextFood () {
    if (id < foodCount) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/foods/${foodOrderArray[id]}`, false);
      xhr.onload = function () {
        if (this.status === 200) {
          const currentFood = JSON.parse(this.responseText);
          currentFoodItem = currentFood[0];
        } else if (this.status === 404) {
          document.getElementById('text').innerHTML = 'Not Found';
        }
      };

      xhr.onerror = function () {
        console.log('Request Error from showNextFood()...');
      };

      xhr.send();
      id = id + 1;
      return true;
    } else {
      resultArray.forEach(element => { resultString = resultString + `<p class="result-name">${element.nameInHTML} : ${element.text}</p>`; });
      return false;
    }
  }

  /**
 * Fisher-Yates / Knuth shuffle
 */
  shuffle (array) {
    let currentIndex = array.length; let temporaryValue; let randomIndex;

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
