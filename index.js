const express = require('express')
// const path = require('path')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
// const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const flash = require('connect-flash')

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const validateMiddleWare = require('./middleware/validationMiddleware')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const expressSession = require('express-session')

const authMiddleware = require('./middleware/authMiddleware')

const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
// const customMiddleWare = (req,res,next)=>{
//     console.log('Custom middle ware called')
// }
// app.use(customMiddleWare)
app.use(fileUpload())
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())


app.use(expressSession({
    secret:'keyboard cat'
}))



// mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true})
mongoose.connect('mongodb+srv://bpadros:Rifle37504317@cluster2.sugglgz.mongodb.net/test',{useNewUrlParser:true})
const validateMiddleWare = (req,res,next) =>{
    if(req.files == null || req.body.title == null){
        return res.redirect('/posts/new')
    }
    next()
}
const newPostController = require('./controllers/newPost')



app.use('/posts/store',validateMiddleWare)



app.get('/posts/new',newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)
app.post('/posts/store',authMiddleware,storePostController)
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout',logoutController)
app.get('/posts/new',authMiddleware,newPostController)

global.loggedIn = null
app.use('*',(req,res,next)=>{
    loggedIn = req.session.userId;
    next()
})


app.use((req,res)=> res.render('notfound'))


// app.listen(4000,()=>{
//     console.log('App listening on port 4000')
// })

let port = process.env.PORT;
if(port==null||port==""){
    port = 4000
}

app.listen(port,()=>{
    console.log('App listening...')
})



// app.get('/about',(req,res)=>{
    
//     res.render('about')
// })

// app.get('/contact',(req,res)=>{
    
//     res.render('contact')
// })

// app.get('/post',(req,res)=>{
//     res.render('post')
// })

// app.get('/post/:id',async(req,res)=>{
   
//     const blogpost = await BlogPost.findById(req.params.id)
//     res.render('post',{
//         blogpost
//     })
// })

// app.get('/posts/new',(req,res)=>{    
//     res.render('create')
// })

