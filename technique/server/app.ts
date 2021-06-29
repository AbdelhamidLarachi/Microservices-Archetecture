const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/log', require('./src/routes/log.ts'));
app.use('/components', require('./src/routes/components.ts'));
app.use('/performance', require("./src/routes/performance.ts"));


console.log(process.env.MONGO_DB_URI);
console.log("mongodb+srv://zizouLivreur:zizouLivreur@globalcluster.sodgj.mongodb.net/technique?retryWrites=true&w=majority" == process.env.MONGO_DB_URI)

// CONNECT TO DB 
mongoose.connect(process.env.MONGO_DB_URI);


// PORT LISTENING  
app.listen(process.env.PORT, () => console.log(`server is listening on ${process.env.PORT}`))

