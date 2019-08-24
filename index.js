const express = require('express');

const server = express();
server.use(express.json());

var projects = [];
var countRequests = 0;

// Middlewares

const existsProject = (req, res, next) => {
  const { id } = req.params;

  if (!projects.find(project => project.id == id))
    return res.status(400).json({ error: 'Project not found.' });

  return next();
};

const newRequestCount = (req, res, next) => {
  countRequests++;
  console.log('requests:' + countRequests);
  return next();
};

server.use(newRequestCount);

// Routes

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.get('/projects/:id', existsProject, (req, res) => {
  const { id } = req.params;

  const project = projects.filter(project => {
    return project.id == id;
  });

  return res.json(project);
});

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  const project = { id, title, tasks };

  projects.push(project);
  return res.json(projects);
});

server.put('/projects/:id', existsProject, (req, res) => {
  const { id } = req.params;
  const { title, tasks } = req.body;

  const project = projects.find(project => {
    return project.id == id;
  });

  project.title = title;
  project.tasks = tasks;

  return res.json(projects);
});

server.delete('/projects/:id', existsProject, (req, res) => {
  const { id } = req.params;

  const project = projects.find(project => {
    return project.id == id;
  });

  let indexOf = projects.indexOf(project);

  projects.splice(indexOf, 1);

  return res.json(projects);
});

server.post('/projects/:id/tasks', existsProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => {
    return project.id == id;
  });

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
