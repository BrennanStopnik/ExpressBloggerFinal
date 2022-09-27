const { uuid } = require('uuidv4');
var express = require('express');
var router = express.Router();

const {db} = require("../mongo")

// var { validateBlogData } = require('../validation/blogs')


router.get('/get-one-example', async function(req, res, next) {
    try{
        const blogPost = await db().collection("posts").findOne({
            id: {
                $exists: true
                }
        })
        res.json({
            success: true,
            post: blogPost
        })
    } catch (err) {
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});



router.get('/get-one/:id', async (req, res, next) => {
    try {
        const blogId = req.params.id

        const blogPost = await db().collection("posts").findOne({
            id: blogId
        })
        res.json({
            success: true,
            post: blogPost
        })
    
    } catch (err) {
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});


router.post('/create-one', async (req, res, next) => {
    try{
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const id = uuid()

        const blogData = {
            title,
            text,
            author,
            email,
            categories,
            starRating,
            id: id,
            createdAt: new Date(),
            lastModified: new Date()
        }

        // const blogDataCheck = validateBlogData(blogData)

        // if (blogDataCheck.isValid === false) {
        //     res.json({
        //         success: false,
        //         message: blogDataCheck.message
        //     })
        //     return;
        // }

        const blogPost = await db().collection("posts").insert(blogData)

        res.json({
            success: true,
            post: blogPost
        })

    } catch (err) {
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }

})

module.exports = router;