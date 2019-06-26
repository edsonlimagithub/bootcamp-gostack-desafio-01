const express = require('express');

const http = require("http")

const app = express();

app.use(express.json());

let requestNumber = 0;
projects = []  

function countRequest(req, res, next){
    requestNumber++;

    console.log(`Requisição número: ${requestNumber}`)

    next()
}

function validadeProject(req, res, next){
    const { id } = req.params;
    const project = projects.find(p => p.id === id)

    if(!project){
        return res.json({erro: "Project not found"})
    }

    next();
}

app.use(countRequest);
//List projetos
app.get('/projects', (req, res) => {
    return res.json(projects);
});

//Create projects
app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    var project = {
        id,
        title,
        tasks: []
    }
    projects.push(project)

    return res.json({ project })
});

//Show project
app.get('/projects/:id', validadeProject, (req, res) => {
    const { id } = req.params;

    const project = projects.find(p => p.id === id)

    return res.json(project);

})

//Upodate
app.put('/projects/:id', (req, res) => {
    const id = req.params.id;
    const { title } = req.body;

    const project = projects.find(p => p.id === id)

    project.title = title 

    return res.json(project)
})

//Delete
app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const index = projects.findIndex(p => p.id === id)

    projects.splice(index, 1);

    return res.send();
})

//Add tasks
app.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;

    const { task } = req.body;

    const project = projects.find(p => p.id === id)

    project.tasks.push(task)

    res.json(project)

})


http.createServer(app).listen(3000);


