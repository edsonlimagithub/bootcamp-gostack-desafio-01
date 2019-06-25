const express = require('express');

const http = require("http")

const app = express();

app.use(express.json());

http.createServer(app).listen(3000);

projects = []  

//List projetos
app.get('/', (req, res) => {
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

    return res.json({ projects })
});

//List project
app.get('/project/:id', (req, res) => {
    projects.map()
})



