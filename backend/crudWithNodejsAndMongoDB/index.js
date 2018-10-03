//Importation 
const express  = require('express');
const mongoose = require('mongoose');
const Joi      = require('joi');
const helmet   = require('helmet');
const morgan   = require('morgan');

const app = express();


//Connection avec mongoDB
mongoose.connect('mongodb://localhost/school')
    .then(() => console.log('mongoDB is connected...'))
    .catch((err) => console.error(err))


//Create a schema for courses
const courseSchema = {
    name: String,
    author: String,
    tags: [ String ],
    price: Number,
    date: { 
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
}    

//Create a model Course
const Course = mongoose.model('Course', courseSchema);


//Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));


//api for getting courses
app.get('/api/courses', async (req, res) => {
   
   const courses = await Course.find()
    .sort({ name: 1 });

    res.send(courses);
})


//api for save a course
app.post('/api/courses', async (req, res) => {
   
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        price: Joi.number(),
        author: Joi.string().required(),
        tags: Joi.array(),
        isPublished: Joi.boolean()
    }

    const { error } = Joi.validate(req.body, schema);
    
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const course = Course({
        name: req.body.name,
        tags: req.body.tags,
        author: req.body.author,
        price: req.body.price,
        isPublished: req.body.isPublished
    });

    const newCourse = await course.save();
     res.send(newCourse);
 })

 //api update a course
app.put('/api/courses/:id', async (req, res) => {
    
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        price: Joi.number(),
        author: Joi.string().required(),
        tags: Joi.array(),
        isPublished: Joi.boolean()
    }

    const { error } = Joi.validate(req.body, schema);
    
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const id = req.params.id;
    const course = await Course.findById(id);

    if(course) {
        course.name = req.body.name;
        course.price = req.body.price;
        course.tags = req.body.tags;
        course.author = req.body.author;
        course.isPublished = req.body.isPublished;
    
        const reesult = await course.save();
        res.send(reesult);
    }else {
        res.status(404).send("course is not found in database...");
    }
    
});

//api delete a course
app.delete('/api/courses/:id', async (req, res) => {
    
    const id = req.params.id;
    const course = await Course.findById(id);

    if(course) {
        const result = await course.delete();
        res.send(result);
    }else {
        res.status(404).send("course is not found in database...");
    }
    
})

//Serveur nodeJS
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app running in port ${ PORT }`));
