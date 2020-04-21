const express = require('express');
const router = express.Router();
const foods = require('../../Foods');

// Gets All Foods
router.get('/', (req, res) => res.json(foods));

router.get('/count', (req, res) => res.json(foods.length));

// Get Single Food
router.get('/:id', (req, res) => {
    const found = foods.some(food => food.id === parseInt(req.params.id));
    
    if(found){
        res.json(foods.filter(food => food.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }

});

module.exports = router;