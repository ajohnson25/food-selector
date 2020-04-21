let id = 1;
let array = [];
let resultString = '<h1>Results</h1>'


function submitFood(text){
    let foodImage = document.querySelector('#food-image');
    let foodName = document.querySelector('#food-name');
    name = foodName.innerText;
    //store the results here
    array.push({id, name, text})
    //If we've gone through all of the foods replace the text at the end with the results
    if (id < 4)
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
        array.forEach(element => resultString = resultString + `<p>${element.name} : ${element.text}</p>`);
        content.innerHTML = resultString;
        console.log(array);
        alert('All done');
    }
}