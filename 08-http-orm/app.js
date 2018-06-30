const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const models = require('./models')

const app = express();

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
	models.movie.findAll().then(movies => {
		res.render("index", {
			movies: movies
		});
	})
});

app.listen(3000, () => console.log('App listening on port 3000!'));
