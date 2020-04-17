let id = 0;
let array = [];
let resultString = '<h1>Results</h1>'

function submitFood(text){
    let foodImage = document.querySelector('#food-image');
    let foodName = document.querySelector('#food-name');
    name = foodName.innerText
    //store the results here
    array.push({id, name, text})
    if (id < 3)
    {
        id = id + 1;

        console.log(id);
        foodImage.src = 'images/' + foods[id].image;
        foodName.innerText = foods[id].name;
    }
    else{
        let content = document.querySelector('#content');
        array.forEach(element => resultString = resultString + `<p>${element.name} : ${element.text}</p>`);
        content.innerHTML = resultString;
        console.log(array);
        alert('All done');
    }
}