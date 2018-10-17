const express = require('express')
const router = express.Router() // Se usa el metodo Router para devolver un objeto en que se ingresaran las rutas.
const Task = require('../models/task')
// Se define una ruta  del servidor a traves del metodo get, cuando se pide la ruta inicial de la app, el servido te manda una respuesta.

// Se usan las funciones asyn y await, await nos indica que una tarea tomará tiempo en ejecutarse y cuando le llegue la info, entonces se ejecuta la primera funcion.
router.get('/', async (req, res) => {
  const tasks = await Task.find() 
  res.json(tasks)
})

router.get('/:id', async (req, res) =>{
  const task = await Task.findById(req.params.id)
  res.json(task)
})

router.post('/', async (req, res) => {
  const { title, description } = req.body
  const task = new Task ({title, description})
  console.log(task)
  await task.save()
  res.json({status: 'Tarea guardada' })
})

router.put('/:id', async (req, res) => {
  const { title, description } = req.body
  const newTask = {title, description}
  // console.log(req.params.id)
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: 'Tarea actualizada' })
})
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id)
  res.json({ status: 'Tarea eliminada' })
})

module.exports = router
