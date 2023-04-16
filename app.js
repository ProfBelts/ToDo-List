const express= require("express");

const app= express();

const port= 3000;

const bodyParser= require("body-parser");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

let items= [];
let workItems= [];

app.get("/", function (req, res) {
  
    let today= new Date();

    let options= {
        weekday: "long",
        day: 'numeric',
        month: 'long'
    }

    let day= today.toLocaleDateString("PST", options);

    res.render("list", {listTitle:day, newListItems:items});

});

app.get("/work", function(req,res) {
    res.render("list", {listTitle:"Work List", newListItems:workItems})
})

app.get("/about", function(req,res) {
    res.render("about")
});


app.post("/", function(req, res) {
    item= req.body.newItem;

    if (req.body.list==="Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
 
});

app.post("/work", function(req,res) {
    item= req.body.newItem;
    workItems.push(item);

    res.redirect("/work");
})

app.listen(port, function () {
    console.log(`The Server is running on port ${port}`);
})
