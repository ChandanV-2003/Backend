const express = require('express');
const app = express();
const port = 3333;
 
// enable configuration to parse incoming json
// application level middleware + in built middleware
app.use(express.json());

const productsDB = require('./product.json');

app.get('/products', (req, res) => {
    res.json(productsDB);
});

app.post('/products', (req, res) => {
    const product = req.body;
    product.id = Date.now();
    productsDB.push(product);
    res.status(201).json(product);
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const products = productsDB.find((ele) => {
        return ele.id === parseInt(id);
    });
    if(!products) { 
        return res.status(404).json({});
    }
    res.json(products); 
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const index = productsDB.findIndex(ele => ele.id == parseInt(id));
    if(index == -1) {
        return res.status(404).json({});
    }
    const removedItem = productsDB.splice(index, 1);
    res.json(removedItem[0]);
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const product = productsDB.find(ele => ele.id === parseInt(id));
    if(!product){
        return res.status(404).json({});
    }
    Object.assign(product, body);
    res.json(product);
});

app.get('/category-status', (req, res) => {
    const data = require('./data.json');
    function categoryStatus(){
        const freq = {};
        products.forEach(item => {
        freq[item.category] = (freq[item.category] || 0) + 1;
    });
  return freq;
}
categoryStatus();
});  

app.listen(port, () => {
    console.log(`server is running in port ${port}`)
});