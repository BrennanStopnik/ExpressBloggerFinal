
// This will validate all the info for the "post '/create-one'" on the routes page.
const validateBlogData = (blogData) => {
    
    // Validates whether title is defined, makes sure it's a string and under 30 char. Returns false and gives explanation if valitaion fails.
    if (blogData.title === undefined || typeof(blogData.title) !== "string" || blogData.title.length > 30) {
        return {
            isValid: false,
            message: "Title is a required field, must be a string and less than 30 char."
        }
    }

    // Validates whether text is defined and makes sure it's a string. Returns false and gives explanation if valitaion fails.
    if (blogData.text === undefined || typeof(blogData.text) !== "string") {
        return { 
            isValid: false,
            message: "Text is a required field and must be a string."
        }
    }

    // Validates whether author is defined, makes sure it's a string and under 30 char. Returns false and gives explanation if valitaion fails.
    if (blogData.author === undefined || typeof(blogData.author) !== "string") {
        return {
            isValid: false,
            message: "Author is a required field and must be a string."
        }
    }
    
    // Vaildates whether email is defined, makes sure it's a string and that it has a "@" in it. Returns false and gives explanation if validation fails.
    if (blogData.email !== undefined) {
        if (typeof(blogData.email) !== "string") {
            return {
                isValid: false,
                message: "Email must be a string."
            }
        }
        if (blogData.email.includes('@') === false) {
            return {
                isValid: false,
                message: "Email must contain @ to be valid."
            }
        }
    }

    // Validates whether categories is defined, makes sure it's an array and a length of 1 or greater. Then filters whether or not there are non strings in the categories. If there are non-strings returns false with the explanation of why.
    if (blogData.categories === undefined || blogData.categories.length < 1 || !Array.isArray(blogData.categories)) {
        return {
            isValid: false,
            message: "Categories must exist, must be an array and have items in it."

        }
    }
    const notStringCats = blogData.categories.filter((category) => {
        if(typeof(category) !== 'string') {
            return true
        } else {
            return false
        }
    })
    if (notStringCats.length > 0) {
        return {
            isValid: false,
            message: "Categories must be strings"
        }
    }

    // Validates whether starRating is defined and makes sure the rating is between 1 and 10. Returns false and gives explanation if validation fails.
    if (blogData.starRating === undefined || blogData.starRating < 1 || blogData.starRating > 10) {
        return {
            isValid: false,
            message: "Star Rating must be between 1 and 10."
        }
    }

    return {
        success: true,
    }

}


// Exporting the validations to the main page, routes/blogs
module.exports = {
    validateBlogData
}