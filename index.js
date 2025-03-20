const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = 5000;

app.use(bodyParser.json());


const users = [
  { id: 1, firstName: "Daniel", lastName: "Calvo", email: "dcalvo@polpocr.com" },
  { id: 2, firstName: "Katherine", lastName: "Calvo", email: "kcalvo@polpocr.com" }
];

const todos = [
  { id: 1, title: "Universidad", keywords: ["estudios", "importante", "academia"], userId: 1 },
  { id: 2, title: "Casa", keywords: ["oficio", "necesario", "orden"], userId: 1 },
  { id: 3, title: "Trabajo", keywords: ["urgente", "proyecto", "cliente"], userId: 2 }
];

const tasks = [
  { id: 1, title: "Estudiar para el examen de programación", completed: 0, todoId: 1, userId: 1 },
  { id: 2, title: "Ir a clases", completed: 1, todoId: 1, userId: 1 },
  { id: 3, title: "Limpiar la cocina", completed: 0, todoId: 2, userId: 1 },
  { id: 4, title: "Terminar informe", completed: 0, todoId: 3, userId: 2 }
];

let nextUserId = 3;
let nextTodoId = 4;
let nextTaskId = 5;


app.get('/users', (req, res) => {
  res.json(users);
});


app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json(user);
});


app.post('/users', (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Se requieren los campos firstName, lastName y email' });
  }

  const newUser = {
    id: nextUserId++,
    firstName,
    lastName,
    email
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

app.get('/users/:id/todos', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const userTodos = todos.filter(t => t.userId === userId);
  res.json(userTodos);
});


app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo no encontrado' });
  }


  const todoTasks = tasks.filter(t => t.todoId === todoId);


  const todoWithTasks = {
    ...todo,
    todos: todoTasks
  };

  res.json(todoWithTasks);
});


app.post('/todos/:id/task', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo no encontrado' });
  }

  const { title, completed } = req.body;

  if (!title || completed === undefined) {
    return res.status(400).json({ error: 'Se requieren los campos title y completed' });
  }

  const newTask = {
    id: nextTaskId++,
    title,
    completed: parseInt(completed),
    todoId,
    userId: todo.userId
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});