const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/axadb')
  .then(() => console.log('connected to mongoDB ...'))
  .catch((err) => console.error(err.message));


  const courseSchema = new mongoose.Schema({
      name: {
          required: true,
          type: String,
          trim: true,
          uppercase: true
      },
      author: String, 
      tags: [ String ],
      date: { type: Date, default: Date.now },
      price: {
          type: Number,
          get: v => Math.round(v),
          set: v => Math.round(v),
          required: function() {
              return this.isPublished;
          }
      },
      isPublished: Boolean
  });

  const Course = mongoose.model('Course', courseSchema);

 


  async function saveCourse() {
    
    const course = new Course({
        name: " Formation en PHP ",
        author: "Mohamed IDBRAHIM",
        tags: ['fullstack', 'php'],
        //price: 122.7,
        isPublished: false
    });
 
    const myCourse = await course.save();
    console.log(myCourse);
  }

  //eq equal,
  //neq not equal
  //le less than
  //gt geat than
  //in 
  //nin not in

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}


async function updateCourse() {
    // const course = await Course.findById(id);
    // course.name = "AdonisJS";

    // course.save();

    const course = await Course.updateMany({ isPublished: { $eq: true } }, {
        $set: {
            price: 100
        }
    });

    console.log(course);

}


async function deleteCourse(id) {
    // const course = await Course.findById(id);
    // const result = await course.delete();
    
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

  //deleteCourse("5bb3844aa3d59a3ab0bf4fcc");
  //updateCourse();
  //getCourses(); 
  saveCourse();
  