const mongoose = require('mongoose');


// Additionla Dependencies
// const express = require('express');
// const nodemailer = require('nodemailer');
// const multer = require('multer');
// const bodyparser = require('body-parser');
// const expressLayout = require('express-ejs-layouts');
// const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const path = require('path');


const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  // image:
  //   {
  //       data: Buffer,
  //       type: String,
  //       required: true
  //   },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);