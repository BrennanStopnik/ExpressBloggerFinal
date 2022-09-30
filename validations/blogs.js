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

// This will validate all the info for the "post '/create-one'" on the routes page
const validateBlogData = (blogData) => {
    
    // Validates whether title is defined, makes sure it's a string and under 30 char. Returns false if valitaion fails and gives explanation.
    if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 30) {
        return {
            success: false,
            message: "Title is a required field, must be a string and less than 30 char."
        }
    }

    // Validates whether text is defined and makes sure it's a string. Returns false if valitaion fails and gives explanation
    if (blogData.text === undefined || typeof(blogData.text) !== "string") {
        return { 
            success: false,
            message: "Text is a required field and must be a string."
        }
    }

    // Validates whether author is defined, makes sure it's a string and under 30 char. Returns false if valitaion fails and gives explanation.
    if (blogData.author === undefined || typeof(blogData) !== "string") {
        return {
            success: false,
            message: "Author is a required field and must be a string."
        }
    }
    
    // Vaildates whether email is defined, makes sure it's a string and that it has a "@" in it. Returns false if validation fails and gives explanation.
    if (blogData.email !== undefined) {
        if (typeof(blogData.email) !== "string") {
            return {
                success: false,
                message: "Email must be a string."
            }
        }
        if (blogData.email.includes('@') === false) {
            return {
                success: false,
                message: "Email must contain @ to be valid"
            }
        }
    }

    // 

    return {
        success: true,
    }

}



module.exports = {
    validateBlogData
}