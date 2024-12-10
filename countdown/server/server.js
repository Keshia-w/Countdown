const express = require("express")
const app = express();

//route for backend api

app.get("/api", (req, res) => {

});

app.listen(5050, () => {
    console.log("Sever running on port 5050")
})