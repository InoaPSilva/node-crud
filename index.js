const express = require('express');
const bodyParse = require('body-parser');

const sum = 10;


const userRoute = require('./routes/userRoutes.js');

const app = express();
const port = 3000;

app.use(bodyParse.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParse.json());

userRoute(app);

app.get('/', (req, res) => res.send("API funcionado"));

app.listen(port, () => console.log("working"));
