const request=require('request');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const apikey="0220d6d21c2fb3f4e84ff6b10f08821d";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.get('/',function(req,res){
  res.render('index');
})
app.post('/',function(req,res){
  let city=req.body.city;
  let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  request(url,function(err,resp,body){
    if(err){
      res.render('display',{weather:null,error:'Error! Please try again.'});
    }
    else{
      let weather=JSON.parse(body);
      if(weather.main==undefined){
        res.render('display',{weather:null,error:'Error! Please try again.'});
      }
      else{
        let msg=`It's ${weather.main.temp} degree Celsius in ${weather.name}`;
        res.render('display',{weather:msg,error:null});
      }
    }
  })
})

app.listen(3000,function(){
  console.log("App are listening on 3000....");
})
