const connection = require('./connection')
const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//All employees

app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error(err)
    } else {
      res.json(results)
    }
  })
})

// Get employee by id

app.get('/employees/:id', (req, res) => {
  connection.query(
    'SELECT * FROM employee WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        res.json(results)
      }
    }
  )
})

// Delete employee

app.delete('/employees/:id', (req, res) => {
  connection.query(
    'DELETE FROM employee WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        res.json(results)
      }
    }
  )
})

// Insert employee

app.post('/employees', (req, res) => {
  const { name, salary } = req.body
  connection.query(
    'INSERT INTO employee(name, salary) VALUES(?, ?)',
    [name, salary],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        res.json(results)
      }
    }
  )
})

// Update with patch employee

app.patch('/employees', (req, res) => {
  const emp = req.body
  connection.query(
    'UPDATE employee SET ? WHERE id =' + emp.id,
    [emp],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        res.json(results)
      }
    }
  )
})

// Update with put employee

app.put('/employees', (req, res) => {
  const emp = req.body
  connection.query(
    'UPDATE employee SET ? WHERE id =' + emp.id,
    [emp],
    (err, results) => {
      if (err) {
        console.error(err)
      } else {
        if (results.affectedRows === 0) {
          const { name, salary } = req.body
          connection.query(
            'INSERT INTO employee(name, salary) VALUES(?, ?)',
            [name, salary],
            (err, results) => {
              if (err) {
                console.error(err)
              } else {
                res.json(results)
              }
            }
          )
        } else {
          res.json(results)
        }
      }
    }
  )
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
