const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Food = require('./models/Food');
const cors = require('cors');

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost/food', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB....'))
        .catch(err => console.log('Failed...', err));

app.post('/insert', async (req,res) => {
        const foodName = req.body.foodName
        const days = req.body.days
        const food = new Food({foodName: foodName, daysSinceIAte: days});
        await food.save();
        res.send(food);
})

app.get('/read', async (req,res) => {
        const food = await Food.find()
        res.send(food);
})

app.put('/update', async (req,res) => {
       const newFoodName = req.body.newFoodName;
       const id = req.body.id;

       try {
        await Food.findById(id, (err,updatedFood) => {
               updatedFood.foodName = newFoodName;
               updatedFood.save();
               res.send("updated");
       });
        } catch (err) {
                console.error(err);
        }
})
console.log("**************")
app.listen(4545);

