const { json } = require('express')
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const jsonParser = express.json()
const bodyParser = require('body-parser')
const publicPath = path.join(__dirname + '/public')
const filePath = 'employees.json'

var urlencodedParser = bodyParser.urlencoded({extended:false})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(publicPath))

app.get('/employees', (req, res) => {
    const content = fs.readFileSync(filePath, 'utf8')
    const employees = JSON.parse(content)
    res.send(employees)

    console.log('Server got empls')
})

app.get('/employees/:id', (req, res) => {
    const id = req.params.id
    const content = fs.readFileSync(filePath, 'utf8')
    const employees = JSON.parse(content)

    let employee = null

    for (let i = 0; i < employees.length && !employee; i++) {
        if (employees[i].id == id) {
            employee = employees[i]
        }
    }

    if (employee) {
        res.send(employee)
    } else {
        res.status(404).send()
    }

    console.log('Server received empl by id')
})

app.post('/employees', jsonParser, (req, res) => {
    if (!req.body.fullName) {
        return res.sendStatus(400)
    }

    let records = fs.readFileSync(filePath, 'utf8')
    let employees = JSON.parse(records)

    let employee = {
        id: Math.max.apply(Math, employees.map(o => o.id)) + 1,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
    }

    employees.push(employee)

    records = JSON.stringify(employees)

    fs.writeFileSync(filePath, records)
    res.send(employee)

    console.log('Server added a new empl')
})

app.delete('/employees/:id', (req, res) => {
    const id = req.params.id
    let records = fs.readFileSync(filePath, 'utf8')
    let empls = JSON.parse(records)
    let index = -1

    for (let i = 0; i < empls.length; i++) {
        const emp = empls[i];
        
        if (emp.id == id) {
            index = i
            break
        }
    }

    if (index > -1) {
        const emp = empls.splice(index, 1)[0]
        records = JSON.stringify(empls)
        fs.writeFileSync(filePath, records)
        res.send(emp)
    } else {
        res.status(404).send()
    }

    console.log('Server deleted an empl')
})

app.put('/employees', jsonParser, (req, res) => {
    if (!req.body.fullName) {
        return res.sendStatus(400)
    }

    const id = req.body.id
    const fullName = req.body.fullName
    const email = req.body.email
    const phone = req.body.phone
    const city = req.body.city

    let records = fs.readFileSync(filePath, 'utf8')
    const empls = JSON.parse(records)
    let empl = null

    for (let i = 0; i < empls.length; i++) {
        if (empls[i].id == id) {
            empl = empls[i];
            break
        }
    }

    if (empl) {
        empl.fullName = fullName
        empl.email = email
        empl.phone = phone
        empl.city = city
        records = JSON.stringify(empls)
        fs.writeFileSync(filePath, records)
        res.send(empl)
    } else {
        res.status(404).send(empl)
    }

    console.log('Server updated an empl')
})

app.listen(3000, console.log('Server started by link http://localhost:3000'))