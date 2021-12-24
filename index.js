require('dotenv').config()
const express = require('express')
const app = express()
const Routes = require('./src/routes/index')

const PORT = process.env.PORT 

app.use(express.json())

app.use('/api/v1', Routes)

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})