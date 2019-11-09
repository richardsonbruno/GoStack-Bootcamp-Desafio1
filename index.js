const express = require("express");
const app = express();

app.use(express.json());

// Middleware Global
app.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url};`);
  console.timeEnd("Request");

  return next();
});

// Middleware
function VerifyIdExists(req, res, next) {
  const { index } = req.params;
  const task = tasks.find(task => task.id === index);

  if (!task) {
    return res.status(400).json({ message: "ID informado não existe" });
  }

  return next();
}

// Tarefas
let tasks = [
  {
    id: "1",
    title: "Minha Primeira Taks",
    tasks: ["Tarefa 1", "Tarefa 2", "Tarefa 3"]
  },
  {
    id: "2",
    title: "Segunda Taks",
    tasks: ["Tarefa 1", "Tarefa 2"]
  }
];

// Rotas
app.get("/projects", (req, res) => {
  return res.json(tasks);
});

app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  tasks.push({ id, title, tasks: [] });

  return res.json(tasks);
});

app.put("/projects/:index", VerifyIdExists, (req, res) => {
  const { index } = req.params;
  const newTitle = req.body.title;

  const task = tasks.find(task => task.id === index);

  task.title = newTitle;

  return res.json(tasks);
});

app.delete("/projects/:index", VerifyIdExists, (req, res) => {
  const { index } = req.params;
  const task = tasks.filter(task => task.id !== index);

  tasks = task;

  return res.json(tasks);
});

app.get("/projects/:index/tasks", VerifyIdExists, (req, res) => {
  const { index } = req.params;
  const { taskname } = req.body;

  const task = tasks.find(task => task.id === index);
  task.tasks.push(taskname);

  return res.json(tasks);
});

// Subiu o Servidor
app.listen(3000);
