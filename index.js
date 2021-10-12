const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const data = require('./data');
const { json } = require('express/lib/response');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/data', (req, res) => {
    res.status(200).json(data);
})

app.get('/data/:id', async(req, res) => {
    try {
        const result = await data.find((data => data.id == req.params.id))
        console.log(result);

        if (result) {
            res.status(200).json(result);
        } else {
            throw new Error()
        }

    } catch (error) {
        res.status(500).json({ message: `Not data id:${req.params.id}` })
    }
})

app.post('/create', async(req, res) => {
    try {
        await data.push(req.body);
        res.status(201).json(req.body)
    } catch (error) {
        res.status(500).json({ message: `Not Created` });
    }

})

app.put('/update/:id', (req, res) => {
    try {
        const updateIndex = data.findIndex(datas => datas.id == req.params.id)
        if (updateIndex) {
            res.status(201).json(req.body)
        } else {
            throw new Error()
        }


    } catch (error) {
        res.status(500).json({ message: `Not Updated` });
    }

})

app.delete('/delete/:id', (req, res) => {
    try {
        const deletedIndex = data.findIndex(data => data.id == req.params.id)
        data.splice(deletedIndex, 1)
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: `Not Deleted` });
    }

})

app.listen(PORT, () => {
    console.log("App run on port:" + PORT);
})