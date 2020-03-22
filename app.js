const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"))

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages("basketball");
 
  var indxArry = randomImage(parsedData)
 res.render("index", {"image":parsedData, "rndArry":indxArry});
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orientation = req.query.orientation;
    
    let parsedData = await getImages(keyword, orientation);
    var indxArry = randomImage(parsedData);
    

    
   res.render("results", {"image":parsedData, "rndArry":indxArry});
    
});//results route

function randomImage(obj){
    var kyLength = Object.keys(obj.hits).length;
    var randomIndex = [];
    for(var i = 0; i < 4; i++){
        randomIndex.push(Math.floor(Math.random() * kyLength));
    }
    return randomIndex;
}

//Returns all data from the Pixabay API as JSON format
function getImages(keyword, orientation){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=15378494-0771d4b6ff5b97b38524077b4&q='+keyword +'&orientation=' + orientation,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});