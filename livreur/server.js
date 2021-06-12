const app = require("./src/app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_URI);

app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});
