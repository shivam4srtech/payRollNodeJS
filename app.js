require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyparser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000;
  
// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  
}));

app.use(express.static('public'));
app.use('/public/',express.static(path.join('./public/')));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute; 


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));
// Routes
app.get("/solution",function(req, res){
  res.render("solution");
})


// Enquiry form
app.post("/contact", function(req, res){
  const userName = req.body.userName;
  const companyName = req.body.companyName;
  const cityName = req.body.cityName;
  const empNum = req.body.empNum;
  const usereEmail = req.body.usereEmail;
  const phoneNum = req.body.phoneNum;
  const message = req.body.message;
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'shivam.srtech@gmail.com',
        pass: 'xcas lmgz ztan txaw'
    }

  })
  var mailOption = {
      form:'shivam.srtech@gmail.com',
      to: 'shivam.srtech@gmail.com',
      cc: 'shivam.srtech@gmail.com',
      subject: 'New enquiry from ' + ' ' +  userName,
      html: ` <h2>New Enquiry form ${userName}</h2>
              <h4> Name</h4> <p> ${userName}</p>
              <h4> Message</h4> <p> ${message}</p>
              <h4> Email</h4> <p> ${usereEmail}</p>
              <h4> Company Name</h4> <p> ${companyName}</p>
              <h4> Phone Number </h4> <p> ${phoneNum}</p>
              <h4> City </h4> <p> ${cityName}</p>
              <h4> Number of Employee </h4> <p> ${empNum}</p>`
  };
  var mailOptionUser ={
      from: 'shivam.srtech@gmail.com',
      to: req.body.usereEmail,
      cc: '',
      subject: 'Thank You for your Enquiry' + ' ' +  userName,
      html: `<h2> Hello ${userName}, your enquiry has been recorded a payRoll representative will respond you shortly </h2>
             <h3>Also you can directly approch to our team on phone call </h3>
             <a class="footer-call-to-action-link" href="tel:63003 47380" target="_self">+91 63003 47380</a>
             <p>Team charteredPayRoll</p> `
  } 
  transporter.sendMail(mailOptionUser, function(error, info){
      if(error){
          console.log(error);
      }
      else{
          res.redirect('/responce-submitted');
          console.log("email sent" + info.response);
      }
  })
  transporter.sendMail(mailOptionComment, function(error, info){
      if(error){
          console.log(error);
      }
      else{
          res.redirect('/responce-submitted');
          console.log("email sent" + info.response);
      }
  })
});

// Receive BlogPost Comment
app.post("/post", function(req, res){
  const comment = req.body.comment;
  const userComment = req.body.userComment;
  const commentEmail = req.body.commentEmail;
  const website = req.body.website;
  
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'shivam.srtech@gmail.com',
        pass: 'xcas lmgz ztan txaw'
    }

  })
  var mailOptionComment = {
      form:'shivam.srtech@gmail.com',
      to: 'shivam.srtech@gmail.com',
      cc: 'shivam.srtech@gmail.com',
      subject: 'New comment from ' + ' ' +  userComment,
      html: ` <h2>New comment form ${userComment}</h2>
              <h4> Name</h4> <p> ${userComment}</p>
              <h4> Comment Message</h4> <p> ${comment}</p>
              <h4> Email</h4> <p> ${commentEmail}</p>
              <h4> User Website </h4> <p> <a href='${website}'>${website}</a></p>`
  };
  var mailOptionUserComment ={
      from: 'shivam.srtech@gmail.com',
      to: req.body.commentEmail,
      cc: '',
      subject: 'Thank You for your Feedback' + ' ' +  userComment,
      html: `<h2> Hello ${userComment}, your Comment/ Feedback has been received thank you for you time</h2>
             <h3>For any further assistance you can directly approch to our team on phone call </h3>
             <a class="footer-call-to-action-link" href="tel:63003 47380" target="_self">+91 63003 47380</a>
             <p>Team charteredPayRoll</p> `
  } 
  transporter.sendMail(mailOptionUserComment, function(error, info){
      if(error){
          console.log(error);
      }
      else{
          res.redirect('/feedback-submitted');
          console.log("email sent" + info.response);
      }
  })
  transporter.sendMail(mailOptionComment, function(error, info){
      if(error){
          console.log(error);
      }
      else{
          res.redirect('/feedback-submitted');
          console.log("email sent" + info.response);
      }
  })
});





app.listen(PORT, ()=> {
  console.log(`App listening on port ${PORT}`);
});
