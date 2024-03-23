const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../middlewares/verifyToken')
const { ObjectId } = require('mongodb');

let usersCollection
let articlesCollection
// get user collection object
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

// user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    // get user resource from client
    const newUser=req.body
    // check for duplicate users based on username
    const dbUser=await usersCollection.findOne({username:newUser.username})
    // if user found in db
    if (dbUser!==null){
        res.send({message:"User already exists"})
    }
    else{
        // hash paasword
        const hashedPassword=await bcryptjs.hash(newUser.password,5)
        // replace plain password with hashed password
        newUser.password=hashedPassword
        // create new user
        await usersCollection.insertOne(newUser)
        // send repsonse
        res.send({message:"New user created"})
    }
}))

// user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get user credentails from client
    const userCred=req.body
    // check for username
    const dbUser=await usersCollection.findOne({username:userCred.username})
    if (dbUser===null){
        res.send({message:"Invalid username"})
    }else{
        // check for password
        const status=await bcryptjs.compare(userCred.password,dbUser.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            // create jwt token and encode it
            const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
             // send res
            res.send({message:"Login success",token:signedToken,user:dbUser})
        }
    }
}))

// Update user profile route
userApp.put('/user/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    // Get username from URL params
    const username = req.params.username;
    
    // Get modified user details from request body
    const modifiedUserDetails = req.body;
    
    try {
        // Update user details in the database
        await usersCollection.updateOne({ username: username }, { $set: { ...modifiedUserDetails } });
        
        // Fetch updated user details from the database
        const updatedUser = await usersCollection.findOne({ username: username });
        
        // Send response with updated user details
        res.send({ message: "User details updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).send({ message: "Error updating user details" });
    }
}));

// get all the articles
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get articles collection from express app
    const articlesCollection=req.app.get('articlesCollection')
    // get all articles
    let articlesList=await articlesCollection.find({status:true}).toArray()
    // send res
    res.send({message:"articles",payload:articlesList})
}))

// add articles
userApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get new article from client
    const newArticle=req.body
    // console.log(newArticle)
    // post to articles collection
    await articlesCollection.insertOne(newArticle)
    // send res
    res.send({message:"New article created"})

}))

// update article
userApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get modified article from client
    const modifiedArticle=req.body
    // update by article id
    let result=await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    // console.log(result)
    res.send({message:"Article modified"})
}))

// get articles of a user
userApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get name of the author from url params
    const nameOfAuthor=req.params.username
    // find articles by username and status is true
    const articlesList=await articlesCollection.find({username:nameOfAuthor,status:true}).toArray()
    // send res
    res.send({message:"articles",payload:articlesList})
}))

// add to favorites
userApp.post('/article/favorite/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    // Extract username from request body
    const {username} = req.body;
    const articleId=req.params.articleId
    console.log(username,articleId)
    try {
        // Update the user's favorites array
        await usersCollection.updateOne({ username }, { $addToSet: { favorites: articleId } });
        // Update the article's favorites array
        await articlesCollection.updateOne({ articleId }, { $addToSet: { favorites: username } });
        // Return success message
        res.status(200).json({ message: "Article added to favorites successfully" });
    } catch (error) {
        console.error("Error adding article to favorites:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}))

// add to reading list
userApp.post('/article/readingList/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    // Extract username from request body
    const {username} = req.body;
    const articleId=req.params.articleId
    console.log(username,articleId)
    try {
        // Update the user's favorites array
        await usersCollection.updateOne({ username }, { $addToSet: { readingList: articleId } });
        // Update the article's favorites array
        await articlesCollection.updateOne({ articleId }, { $addToSet: { readingList: username } });
        // Return success message
        res.status(200).json({ message: "Article added to reading list successfully" });
    } catch (error) {
        console.error("Error adding article to reading list : ", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}))


// follow users
// Follow user route
userApp.post('/user/follow/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    // Get the username of the user to follow from URL params
    const usernameToFollow = req.params.username;
    // Get the username of the current user from the decoded token
    const currentUserUsername = req.body.username;
    console.log(usernameToFollow,currentUserUsername)
    try {
        // Add the username of the user to follow to the following array of the current user
        await usersCollection.updateOne({ username: currentUserUsername }, { $addToSet: { following: usernameToFollow } });
        // Add the username of the current user to the followers array of the user to follow
        await usersCollection.updateOne({ username: usernameToFollow }, { $addToSet: { followers: currentUserUsername } });
        // Return success message
        res.status(200).json({ message: "User followed successfully" });
    } catch (error) {
        console.error("Error following user:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));

// Unfollow user route
userApp.post('/user/unfollow/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    // Get the username of the user to unfollow from URL params
    const usernameToUnfollow = req.params.username;
    // Get the username of the current user from the decoded token
    const currentUserUsername = req.body.username;
    try {
        // Remove the username of the user to unfollow from the following array of the current user
        await usersCollection.updateOne({ username: currentUserUsername }, { $pull: { following: usernameToUnfollow } });
        // Remove the username of the current user from the followers array of the user to unfollow
        await usersCollection.updateOne({ username: usernameToUnfollow }, { $pull: { followers: currentUserUsername } });
        // Return success message
        res.status(200).json({ message: "User unfollowed successfully" });
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));

// Add comment to an article route
userApp.post('/article/comment/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
    // Extract relevant information from the request
    const {username,content}=req.body;
    const articleId = req.params.articleId;
    // console.log(username,content,articleId)
    try {
        // Construct the comment object
        const comment = {
            _id: new ObjectId().toString(), // Generate a unique ID for the comment
            username: username,
            content: content,
            parentId: null // Indicates it's a top-level comment
        };

        // Find the specified article
        const article = await articlesCollection.findOne({ articleId: articleId });

        // Add the comment to the article's comments array
        article.comments.push(comment);

        // Update the article in the database with the new comment
        await articlesCollection.updateOne({ articleId: articleId }, { $set: { comments: article.comments } });

        // Return success message
        res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));


// Get favorites of a user
userApp.get('/user/favorites/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    try {
        // Find the user by username
        const user = await usersCollection.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Retrieve favorite articles from articlesCollection
        const favoriteArticles = await articlesCollection.find({ articleId: { $in: user.favorites } }).toArray();
        
        // Return favorite articles
        res.status(200).json({ favorites: favoriteArticles });
    } catch (error) {
        console.error("Error getting favorites:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));


// Get followers of a user
userApp.get('/user/followers/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    try {
        // Find the user by username
        const user = await usersCollection.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return user's followers
        res.status(200).json({ followers: user.followers });
    } catch (error) {
        console.error("Error getting followers:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));

// Get following of a user
userApp.get('/user/following/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    try {
        // Find the user by username
        const user = await usersCollection.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Return user's following
        res.status(200).json({ following: user.following });
    } catch (error) {
        console.error("Error getting following:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));

// Get reading list of a user
userApp.get('/user/readingList/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const username = req.params.username;
    try {
        // Find the user by username
        const user = await usersCollection.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Retrieve articles from reading list from articlesCollection
        const readingListArticles = await articlesCollection.find({ articleId: { $in: user.readingList } }).toArray();
        
        // Return articles in reading list
        res.status(200).json({ readingList: readingListArticles });
    } catch (error) {
        console.error("Error getting reading list:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
}));



// export user  App
module.exports=userApp
