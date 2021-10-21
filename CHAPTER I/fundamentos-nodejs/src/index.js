const express = require('express');
const app = express();
const port = 8080;

app.use(express.json())


app.get('/courses', (req, res) => {
    const query = req.query;
    console.log(query);
    res.json([
        "Curso 1",
        "Curso 2",
        "Curso 3"
    ])
});


app.post('/courses', (req, res) => {
    const body = req.body;
    console.log(body)
    res.json([
        "Curso 1",
        "Curso 2",
        "Curso 3",
        "Curso 4"
    ])
});

app.put('/courses/:id', (req, res) => {
    const params = req.params;
    console.log(params)
    res.json([
        "Curso 6",
        "Curso 2",
        "Curso 3",
        "Curso 4"
    ])
});

app.patch('/courses/:id', (req, res) => {
    res.json([
        "Curso 6",
        "Curso 7",
        "Curso 3",
        "Curso 4"
    ])
});

app.delete('/courses/:id', (req, res) => {
    res.json([
        "Curso 6",
        "Curso 7",
        "Curso 4"
    ])
})

app.listen(port, (req, res) => {
    console.log(`Servidor ativo. acesse: http://localhost: ${port}`)
})