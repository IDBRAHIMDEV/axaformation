const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const Joi    = require('joi');
const debugStartUp = require('debug')('app:startup');
const debugDB = require('debug')('app:db');
//const pug = require('pug');
const pug = require('ejs');
const app = express();

const courses = [
    {id: 1, name: 'Laravel'},
    {id: 2, name: 'Symfony'},
    {id: 3, name: 'VueJS'},
    {id: 4, name: 'Angular'},
    {id: 5, name: 'NodejS'}
];
//Middleware 1
app.use(express.json())
app.use(express.static('public'));
app.use(helmet());
app.set('views', './views');
app.set('view engine', 'ejs');

debugStartUp('debug start up ?....');
console.log('mode App: ', app.get('env'));
console.log('name: ', config.get('name'));
console.log('password', config.get('mail.password'))

if(process.env.NODE_ENV === 'production') {
    app.use(morgan('tiny'))
    debugDB('user lodded from database...');
}

//Middleware 2
app.use((req, res, next) => {
    console.log('user authenticating...');
    next()
})

app.get('/', (req, res) => {
    res.render('index', {
        myTitle: "Formation axa assurances",
        message: "lorem ipsum text bidon"
    })
})

app.get('/api/courses', (req, res) => {
    res.render('courses/index', {
        myTitle: "List of Courses",
        message: "lorem ipsum text bidon",
        courses: courses
    })
})

app.get('/api/courses/:id', (req, res) => {
    res.send('get one object method');
})

app.post('/api/courses', (req, res) => {
    
   const schema = {
       name: Joi.string().required().min(3),
   }

   const result = Joi.validate(req.body, schema);
   
   if(result.error) return res.status(400).send(result.error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    
    const id = req.params.id;
    console.log(id);
    const course  = courses.find((course) => course.id === +id);
    const myIndex = courses.indexOf(course);
    courses[myIndex].name = req.body.name;

    res.send(courses)
});

app.delete('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    const course  = courses.find((course) => course.id === +id);
    const myIndex = courses.indexOf(course);

    courses.splice(myIndex, 1);

    res.send(courses);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is connected on port ${ PORT }...`));