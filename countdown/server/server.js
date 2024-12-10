const express = require("express")
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

//route for backend api

app.get("/api", (req, res) => {
    res.json({ fruits: ["banana", "apple", "orange"]})
});

app.listen(5050, () => {
    console.log("Sever running on port 5050")
})