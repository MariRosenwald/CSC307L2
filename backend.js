const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const res = require('express/lib/response');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
       
    ]
 }

 app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    var randId = randomGenerator(); 
    userToAdd.id = randId; 
    addUser(userToAdd);
     
    res.status(201).send(userToAdd).end();
    // console.log(userToAdd.name, " ", userToAdd.job, " ", userToAdd.id);
   
});

function randomGenerator(){
    var ret = ''; 
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var index; 
    for (var i = 0; i < 6; i++){
        index = Math.floor(Math.random() * characters.length); 
        ret += characters.substring(index, index+1); 
    }
    return ret;
}

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteId(id); 
        res.status(204).end(); 
    }
}); 

function deleteId(id){
    users['users_list'].splice(users['users_list'].findIndex((user) => user['id'] == id), 1);
}

app.get('/users/:name/:job', (req, res) => {
    const name = req.params['name']; 
    const job = req.params['job']; 
    if (name != undefined && job != undefined){
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByNameJob = (name, job) => { 
    return users['users_list'].filter((user) => user['name'] === name && user['job'] === job); 
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

