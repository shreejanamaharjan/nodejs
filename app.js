const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/practice_question", function(req, res){
    res.render("practice_question");
});

app.listen(3000);
