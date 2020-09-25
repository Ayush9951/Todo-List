const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const items=[];
let finalDate="";

// setting up view engine
app.set('view engine','ejs');

// using middleware 
// body-parser :- to get the post request data
app.use(bodyParser.urlencoded({extended:true}));
// to use static files
app.use(express.static('public'));

// routes
app.get('/',(req,res) => {
    let date = new Date();

    let today = date.getDay();  // 0-6
    let thisMonth = date.getMonth(); // 0-11
    let todayDate = date.getDate(); // 1-31

    let week=['sunday','monday','Tuesday','wednesday','Thursday','friday','saturday']
    let months=['Jan','Feb','Mar','April','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    
    finalDate=week[today]+", "+months[thisMonth]+" "+todayDate;
    res.render('home',{Items:items,date:finalDate});
});

app.post('/',(req,res) => {
   
    console.log(req.body.delete);
    if(req.body.reset==='reset')
    {
        while(items.length>0)
        {
            items.pop();
        }
        res.render('home',{Items:items,date:finalDate});
    }
    if(req.body.enteredListItem.length >0)
    {
    items.push(req.body.enteredListItem);
    res.redirect('/');
    }
    else{
        res.render('home',{Items:items,date:finalDate});
    }
   
});

app.listen(process.env.PORT || 3000,()=>{console.log('server is running')});

