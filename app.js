// Requiring packages
const express = require('express');
const bodyParser = require('body-parser');
const { render } = require('ejs');
const app = express();

// Declaring varibales
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

// Using express package
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Handling routes
app.get('/', (req, res) => {
    let today = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    let day = today.toLocaleDateString('en-US', options);
    res.render('list', { listTitle: day, newListItems: items });
});


app.post('/', (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === 'Work list') {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }

});



app.get('/work', (req, res) => {
    res.render('list', { listTitle: 'Work list', newListItems: workItems });
});

app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});


// Running the port
app.listen(3000, () => {
    console.log('The server is running on port 3000...');
});