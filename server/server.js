const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8081 ;

const app = express();
app.use(cors());
app.use(express.json());




const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected successfully with the db');
  release();
});




app.get('/', async (req, res) => {
  const sql = 'SELECT * FROM empdt';
  pool.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data.rows);
  });
});


app.put('/:num', async (req, res) => { 
    try {
        const { empid } = req.params; 
        const { empnum, empname, empsalary} = req.body;
        const sql = 'UPDATE empdt SET empnum = $1, empname = $2, empsalary = $3 WHERE empid = $4';
        const values =  [empnum, empname, empsalary, empid];

        pool.query(sql , values ,(err , data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error occurred while Updating data.');
              }
              console.log('Updated');
              res.status(200).send('Data Updated successfully.');
        })

        // res.json(updatedet.rows); 

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error'); 
    }
});

app.post('/', (req, res) => {
  const { empnum, empname, empsalary} = req.body;
  const sql = 'INSERT INTO empdt ( empnum, empname, empsalary) VALUES ($1, $2, $3)';
  const values = [ empnum, empname, empsalary];

  pool.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred while inserting data.');
    }
    console.log('Created');
    res.status(200).send('Data inserted successfully.');
  });
});


app.delete('/:num', (req, res) => {
  const numval = req.params.num;
  const sql = 'DELETE FROM empdt WHERE empnum = $1';

  pool.query(sql, [numval], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred while deleting data.');
    }
    console.log('Deleted');
    res.status(200).send('Data deleted successfully.');
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
