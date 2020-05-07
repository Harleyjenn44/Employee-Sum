const mysql = require('mysql')
const inquirer = require('inquirer')


const connection = mysql.createConnection({
  host: 'localhost',
  port: 8000,
  user: 'root',
  database: 'employee_sum',
  password: ''
})
connection.connect(function (err) {
  if (err) throw err
  start()
})

function start () {
inquirer
.prompt({
  type: "list",
  name: "initialList",
  message: "What would you like to do?",
  choices: [
  "View All Employees",  
  "View Department", 
  "View All Employees by Role",
  "Add Employee", 
  "Remove Employee", 
  "Update Employee Role",  
  "End Program"]
})

.then(function(response){
  switch (response.choices) {
    case "View All Employees" :
      viewEmployees()
      break

    case "View Department":
    departmentSearch()
    break

    case "View All Employees By Role":
      roleList()
      break
    
    case "Add Employee" :
      addEmployee()
      break

    case "Remove Employee" :
      removeEmployee()
      break

    case "Update Employee Role" :
      updateEmployee()
      break
    
    case "End Program" :
      connection.end()
      break
  }
})
}
function viewEmployees () {
  var query = `SELECT * FROM employee`

  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    start()
  })
}

function departmentSearch () {
  inquirer
  .prompt({
    type: 'list',
    name: 'choices',
    message: 'View Department?',
    choices: [
      'Human Resources',
      'IT Department',
      "Sales Department",
      "Warehouse Department"
    ]
  })
  .then (function (response) {
    connection.query(`SELECT * FROM department WHERE name = "${response.choices}"`, function (err, res){
      if (err) throw err
      console.table(res) 
      start()
    })
  })
}
function roleList(){
  inquirer 
  .prompt({
    type:'list',
    name: 'choices',
    message: 'View Role?',
    choices: [
      'Manager',
      'Computer Tech',
      'Salesman',
      'Laborer'
    ]
  })
  .then(function (choices) {
    connection.query(`SELECT * FROM role_id WHERE name = "${answer.choices}"`,function (err, res){
      if (err) throw err
      console.table(res)
      start
    })
  }
  )
}
function addEmployee (){
  inquirer.prompt([
    {
      type: "input",
      message:"What is the Employee's First Name?",
      name: "first_name"
    },
    {
      type: "input",
      message:"What is the Employee's Last Name?",
      name: "last_name"
    },
    {
      type: "input",
      message:"What is the Employee's Role?",
      name: "role_id"
    },
    {
      type: "input",
      message:"Who is the Employee's Manager?",
      name: "manager_id"
    }
  ])

  .then(response => {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${response.first_name}", "${response.last_name}", "${response.role_id}", "${response.manager_id}")`
    connection.query(query, function (err, res){
      if (err) throw err
      console.table(res)
      start()
    })
  })
}
