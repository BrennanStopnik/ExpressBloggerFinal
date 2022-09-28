/*
- Add validation to the route to check the following conditions before inserting the blog object:
				- title is defined, is a string, and is no longer than 30 characters
				- text is defined and is a string
				- author is defined and is a string
				- if email is defined, it should be a string and must contain only a single @ symbol
				- if categories is defined, it must be an array, it must have non-zero length and it must only contain strings
				- if starRating is defined, it must be a number between 1 and 10
			- If any of the validations fail, the route should respond with an object containing success: false and a validation error message describing which validation failed

*/


const validateBlogData = (blogData) => {
    if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 30) {
        return {
            success: false,
            message: "Title is a required field, must be a string and less than 30 char."
        }
    }

    if (blogData.text === undefined || typeof(blogData.text) !== "string") {
        return { 
            success: false,
            message: "Text is a required field and must be a string."
        }
    }

    if (blogData.author === undefined || typeof(blogData) !== "string") {
        return {
            success: false,
            message: "Author is a required field and must be a string."
        }
    }

    
}



module.exports = {
    validateBlogData
}