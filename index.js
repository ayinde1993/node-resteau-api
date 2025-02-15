const express = require("express");
require("dotenv").config();
const app = express();
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoute");
const connectDB = require("./config/db");

////middleware pour parser les JSON
app.use(express.json()); 
//middleware pour parser les URL encoded 
app.use(express.urlencoded({extended: false})); 

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
//connect to database
 connectDB();


app.get("/", (req, res) => {
    res.send("Hello my World");
  }); 

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
