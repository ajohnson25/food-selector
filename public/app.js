let id = 0;
let resultArray = [];
let resultString = '<h1>Results</h1>';
let foodCount = 0;
let foodImage;
let foodName;

function app(){
    foodImage = document.querySelector('#food-image');
    foodName = document.querySelector('#food-name');
    //want to call show next food to replace what is currently in the HTML due to the desire to randomize the starting value
    //food count then show next food

    setFoodCount();
    showNextFood();
}

function setFoodCount(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/api/foods/count`, false);

    xhr.onload = function(){
        if(this.status == 200){
            let count = JSON.parse(this.responseText);
            foodCount = count;
        } else if (this.status == 404) {
            document.getElementById('text').innerHTML = 'Not Found';
        }
    }

    xhr.onerror = function(){
        console.log('Request Error...');
    }

    xhr.send();
}

function submitFood(text){
    foodImage = document.querySelector('#food-image');
    foodName = document.querySelector('#food-name');
    name = foodName.innerText;
    //store the results here
    resultArray = [...resultArray,{id, name, text}]
    //show the next one and show the results if we went through all of the foods
    showNextFood()
}


function showNextFood(){
    console.log(foodCount);
    if (id < foodCount)
    {
        id = id + 1;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/api/foods/${id}`, true);
            
        xhr.onload = function(){
            if(this.status == 200){
                let currentFood = JSON.parse(this.responseText);
                foodImage.src = 'images/' + currentFood[0].image;
                foodName.innerText = currentFood[0].name;
            } else if (this.status == 404) {
                document.getElementById('text').innerHTML = 'Not Found';
            }
        }

        xhr.onerror = function(){
            console.log('Request Error...');
        }

        xhr.send();
    }
    else{
        let content = document.querySelector('#content');
        resultArray.forEach(element => resultString = resultString + `<p>${element.name} : ${element.text}</p>`);
        content.innerHTML = resultString;
    }
}