const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    // Count is deprecated - please use countDocuments
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});




/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Seach",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * About
*/
router.get('/about', (req, res) => {
  res.render('about', {
    currentRoute: '/about'
  });
});



/**
 * GET /
 * Solution
*/
router.get('/solution', (req, res) => {
  res.render('solution', {
    currentRoute: '/solution'
  });
});

/**
 * GET /
 * blog
*/
router.get('/blog', (req, res) => {
  res.render('blog', {
    currentRoute: '/blog'
  });
});


/**
 * GET /
 * all-blogs
*/
router.get('/all-blogs', (req, res) => {
  res.render('all-blogs', {
    currentRoute: '/all-blogs'
  });
});


/**
 * GET /
 * careers
*/
router.get('/careers', (req, res) => {
  res.render('careers', {
    currentRoute: '/careers'
  });
});


/**
 * GET /
 * job-application
*/
router.get('/jobs', (req, res) => {
  res.render('job-application', {
    currentRoute: '/job-application'
  });
});


/**
 * GET /
 * contact
*/
router.get('/contact', (req, res) => {
  res.render('contact', {
    currentRoute: '/contact'
  });
});


/**
 * GET /
 * tankYou
*/
router.get('/responce-submitted', (req, res) => {
  res.render('thankYou', {
    currentRoute: '/thankYou'
  });
});

/**
 * GET /
 * comment-submitted
*/
router.get('/feedback-submitted', (req, res) => {
  res.render('commentResponce', {
    currentRoute: '/commentResponce'
  });
});




module.exports = router;
