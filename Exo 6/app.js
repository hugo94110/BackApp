import express from 'express'
const app = express()
const port = 3000


function loggerMiddleware(req, res, next){
    console.log("Nouvelle requête entrante")
    next()
}

app.use(express.json())
app.use(loggerMiddleware)
app.use(express.static('templates'))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})