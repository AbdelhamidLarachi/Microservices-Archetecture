const app = require("./src/app");
const mongoose = require("mongoose");

const URI = 'mongodb://zizouLivreur:zizouLivreur@globalcluster-shard-00-00.sodgj.mongodb.net:27017,globalcluster-shard-00-01.sodgj.mongodb.net:27017,globalcluster-shard-00-02.sodgj.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-u20azu-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(URI);

app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
