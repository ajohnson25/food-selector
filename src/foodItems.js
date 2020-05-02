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
    M.AutoInit();
    foodImage = document.querySelector('#food-image');
    foodName = document.querySelector('#food-name');
    unsplashTag = document.querySelector('#unsplash-tag');
    content = document.querySelector('#content');

    

    this.setFoodCount();

    // create an array with the food count and then shuffle it to randomize
    for (let i = 1; i <= foodCount; i++) {
      foodOrderArray = [i, ...foodOrderArray];
    }
    this.shuffle(foodOrderArray);
    this.showNextFood();
    document.querySelector('#yes').addEventListener('click', () => this.submitFood('Like'));
    document.querySelector('#not-applicable').addEventListener('click', () => this.submitFood("Haven't Had"));
    document.querySelector('#no').addEventListener('click', () => this.submitFood("Don't Like"));
  }

  /**
  * Get the count of foods from the server
  */
  setFoodCount () {
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

  submitFood (text) {
    foodImage = document.querySelector('#food-image');
    foodName = document.querySelector('#food-name');
    const nameInHTML = currentFoodItem.name;
    // store the results here
    resultArray = [...resultArray, { id, nameInHTML, text }];
    // show the next one and show the results if we went through all of the foods
    this.showNextFood();
  }

  /**
 * Get the next food item from the list until there are no more, then display the results
 */
  showNextFood () {
    console.log(foodCount);
    console.log(resultArray);
    if (id < foodCount) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/foods/${foodOrderArray[id]}`, true);
  
      xhr.onload = function () {
        if (this.status === 200) {
          const currentFood = JSON.parse(this.responseText);
          currentFoodItem = currentFood[0];
          foodImage.src = 'images/' + currentFoodItem.image;
          foodImage.alt = currentFoodItem.name;
          foodName.innerText = currentFoodItem.name;
          unsplashTagConstructor(currentFoodItem.imageAttribution);
          content.style.display = 'block';
        } else if (this.status === 404) {
          document.getElementById('text').innerHTML = 'Not Found';
        }
      };
  
      xhr.onerror = function () {
        console.log('Request Error from showNextFood()...');
      };
  
      xhr.send();
      id = id + 1;
    } else {
      const content = document.querySelector('#content');
      console.log(resultArray);
      resultArray.forEach(element => { resultString = resultString + `<p class="result-name">${element.nameInHTML} : ${element.text}</p>`; });
      content.innerHTML = resultString;
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

function unsplashTagConstructor (imageAttribution) {
  unsplashTag.style = 'background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px';
  unsplashTag.href = `https://unsplash.com/${imageAttribution[0]}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`;
  unsplashTag.target = '_blank';
  unsplashTag.rel = 'noopener noreferrer';
  unsplashTag.title = `Download free do whatever you want high-resolution photos from ${imageAttribution[0]}`;
  unsplashTag.innerHTML = `<span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">${imageAttribution[1]}</span>`;
}

export default FoodItems;