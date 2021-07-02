const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/config/default.json');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();


app.use(cors())
// Bodyparser Middleware
app.use(bodyParser.json())
app.use(express.json());

// DB Config
const db = config.mongoURI;

// Connect to MongoDB
mongoose.set('useUnifiedTopology', true);
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));
// Use Routes
app.use('/api/articles', require('./src/routes/articles'));
app.use('/api/restaurateur', require('./src/routes/restaurateur'));
app.use('/api/commands', require('./src/routes/commands'));
app.use('/api/livraisons', require('./src/routes/livraisons'));
app.use('/api/notifications', require('./src/routes/notifications'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));