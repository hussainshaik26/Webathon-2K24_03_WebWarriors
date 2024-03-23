// create express app
const exp=require('express')
const app=exp()
require('dotenv').config()//process.env.PORT
const mongoClient=require('mongodb').MongoClient
const path=require('path')


// // deploy react build in this server
app.use(exp.static(path.join(__dirname,'../client/build')))
// to parse the body of req
app.use(exp.json())

// connect to DB
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    // get db object
    const webdb=client.db('webdb')
    // get collection object
    const usersCollection=webdb.collection('usersCollection')
    const articlesCollection=webdb.collection('articlesCollection')
    // share collection with express app
    app.set('usersCollection',usersCollection)
    app.set('articlesCollection',articlesCollection)
    // confirm db connection status
    console.log("DB connection success")
})
.catch(err=>console.log("err in db connection",err))


// import api routes
const userApp=require('./APIs/user-api')

// if path starts with user-api then send the request to userapp
app.use('/user-api',userApp)

// deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

// express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})

// assign port number
const port=process.env.PORT || 5000
app.listen(port,()=>console.log(`web server on port ${port}`))