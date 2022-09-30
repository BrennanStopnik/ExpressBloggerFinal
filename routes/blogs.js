const { uuid } = require('uuidv4');
var express = require('express');
var router = express.Router();

const {db} = require("../mongo")

// var { validateBlogData } = require('../validation/blogs')


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
        console.log(err)
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

        const blogDataCheck = validateBlogData(blogData)

        if (blogDataCheck.isValid === false) {
            res.json({
                success: false,
                message: blogDataCheck.message
            })
            return;
        }

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


router.put('/update-one/:id', async (req, res, next) => {
    try{
        const id = req.params.id
        const title = req.body.title
		const text = req.body.text
		const author = req.body.author
		const email = req.body.email
		const categories = req.body.categories
		const starRating = req.body.starRating
        const lastModified = new Date()

        const blogData = {
            lastModified: new Date()
        }

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


router.delete('/delete-one/:id', async (req, res, next) => {
    try {
        const blogId = req.params.id

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