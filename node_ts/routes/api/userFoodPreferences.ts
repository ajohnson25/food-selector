import express from 'express';
const router = express.Router();
let foodPrefs: any[] = [];

// Gets All Food Preferences
router.get('/', (req, res) => res.json(foodPrefs));

router.get('/count', (req, res) => res.json(foodPrefs.length));

// Get a user's preferences
router.get('/:userId', (req, res) => {
  const found = foodPrefs.some(foodPref => foodPref.userId === req.params.userId);

  if (found) {
    res.json(foodPrefs.filter(foodPref => foodPref.userId === req.params.userId));
  } else {
    res.status(400).json({ msg: `No member with the uuid of ${req.params.userId}` });
  }
});

// Store food preference
router.post('/', (req, res) => {
  const newFoodPref = {
    userId: req.query.userId,
    foodId: req.query.foodId,
    preference: req.query.preferenceId
  };
  console.log(req.query);
  foodPrefs.push(newFoodPref);
  res.json(foodPrefs);
});

// Delete food preferences
router.delete('/:userId', (req, res) => {
  const found = foodPrefs.some(foodPref => foodPref.userId === req.params.userId);

  if (found) {
    foodPrefs = foodPrefs.filter(foodPref => foodPref.userId !== req.params.userId);
    res.json({
      msg: 'Preferences deleted',
      foodPref: foodPrefs
    });
  } else {
    res.status(400).json({ msg: `No member with the uuid of ${req.params.userId}` });
  }
});

module.exports = router;
