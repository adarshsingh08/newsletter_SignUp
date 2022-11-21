const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    var jsondata=JSON.stringify(data);
    var url="https://us21.api.mailchimp.com/3.0/lists/6a50a2642f";
    var options={
        method:"POST",
        auth:"Adarsh:e16ca6aba8ab8051391d4ac4db7282c4-us21"
    }
    const request=https.request(url, options, function(response){

        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/faliure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsondata);
    request.end();
});
//e16ca6aba8ab8051391d4ac4db7282c4-us21

//6a50a2642f

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
});