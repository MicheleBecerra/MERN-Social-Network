const express = require('express')
const morgan = require('morgan')
const path = require('path')
const { mongoose } = require('./database')
// const logger = require('morgan')
// const bodyParser = require('body-parser')
const app = express()

// Settings: se establece la configuracion del puerto, ya que puede tomar el puerto que nos indiquen al hacer el deployd o tomar el puerto local
app.set('port', process.env.PORT || 3000)
// Los Middelware: son funciones que se ejecutan cada vez que hay una peticion al servidor. Pero se ejecutan antes de que lleguen las rutas.
app.use(morgan('dev'))
app.use(express.json()) // Para entender un formato de intercambio de datos, va a funcionar cada vez que llegue una peticion al servidor, se tiene que asegurar que esta solicitud en formato .json

// Routes: se define  un rest API, para manejar las peticiones y obtener datos, actuualizarlo y eliminarlos
app.use('/api/tasks', require('./routes/task-routes'))

// Static files
app.use(express.static(path.join(__dirname, '/public')))
// console.log(path.join(__dirname, '/public'))

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`)
})
