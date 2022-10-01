// Generating new uuid's
const { uuid } = require('uuidv4');
// The express server
var express = require('express');
// The router
var router = express.Router();

// Establishing Mongo as the database
const {db} = require("../mongo")

// Importing the validations from the validations/blogs folder
var { validateBlogData } = require('../validations/blogs')

// The Example
router.get('/get-one-example', async (req, res, next) => {
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
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});


// A GET request to get a single blog post.
router.get('/get-one/:id', async (req, res, next) => {
    try {
        // Getting the id from the URL
        const blogId = req.params.id

        // Getting the single blogPost from the database
        const blogPost = await db().collection("posts").findOne({
            id: blogId
        })
        res.json({
            success: true,
            post: blogPost
        })
    
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});


// A POST request to create a single blog post
router.post('/create-one', async (req, res, next) => {
    try{
        // Getting the new info from postman
        const title = req.body.title
        const text = req.body.text
        const author = req.body.author
        const email = req.body.email
        const categories = req.body.categories
        const starRating = req.body.starRating
        const id = uuid()

        // The data variable for what's going to be input
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

        // Sending blogData to be validated in validation/blogs folder
        const blogDataCheck = validateBlogData(blogData)

        // If blogData fails, you get the message associated to the failure
        if (blogDataCheck.isValid === false) {
            res.json({
                success: false,
                message: blogDataCheck.message
            })
            return;
        }

        // Adding blogData to the database
        const blogPost = await db().collection("posts").insertOne(blogData)

        res.json({
            success: true,
            post: blogPost
        })

    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})


// A PUT request to modify a single blog post
router.put('/update-one/:id', async (req, res, next) => {
    try{
        // Getting the id from the URL
        const id = req.params.id

        // Getting the new info from postman
        const title = req.body.title
		const text = req.body.text
		const author = req.body.author
		const email = req.body.email
		const categories = req.body.categories
		const starRating = req.body.starRating
        const lastModified = new Date()

        // The variable for updating the blog post.
        const blogData = {
            lastModified: new Date()
        }

        // These are all the indivdual validations for changing a single piece of data
        if (title !== undefined) {
            if (typeof(title) === 'string' && title.length < 30) {
                blogData.title = title
            }
        }
        if (text !== undefined) {
            if (typeof(text) === "string") {
                blogData.text = text
            }
        }
        if (author !== undefined) {
            if (typeof(author) === "string" && author.length < 30) {
                blogData.author = author
            }
        }
        if (email !== undefined) {
            if (email.includes("@") === true) {
                blogData.email = email
            }
        }
        if (categories !== undefined && Array.isArray(categories) === true && categories.length > 0) {
            const notValid = categories.filter((category) => {
                if (typeof(category) !== 'string') {
                    return true
                } else {
                    return false
                }
            })
            if (notValid.length === 0) {
                blogData.categories = categories
            }
        }
        if (starRating !== undefined) {
            if (starRating >= 1 && starRating <= 10) {
                blogData.starRating = starRating
            }
        }

        // Adding blogData to the database
        const blogPost = await db().collection("posts").update({
            id:id
        }, {
            $set: blogData
        })
        
        res.json({
            success: true,
            post: blogPost
        })

    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
})


// A DELETE request to delete a single blog post
router.delete('/delete-one/:id', async (req, res, next) => {
    try {
        // Getting the id from the URL
        const blogId = req.params.id

        // Deleting blogPost from the database
        const blogPost = await db().collection("posts").deleteOne({
            id: blogId
        })
        res.json({
            success: true,
            post: blogPost
        })
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});


module.exports = router;