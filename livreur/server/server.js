const mongoose = require("mongoose");
const app = require("./src/app")



// Connect to MongoDB
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then((res) => {
        console.log('MongoDB Connected')

    })
    .catch((err) => console.log(err));

// Deploy express app server
app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
});