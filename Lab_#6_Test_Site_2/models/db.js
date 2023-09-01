const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://catpuff:1234qwer@cluster0.dezim.mongodb.net/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { 
        console.log('MongoDB Connection Succeeded') 
    } else {
        console.log('Error in DB connection: ' + err)
    }
})

require('./employee.model')