const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/analyze',((req,res)=>{
    const { numbers } =req.body; // const numbers = req.body.numbers
    try{
        if(!numbers){
            return res.status(400).json({
                error: "missing required field must be number"
            });

        }
        if(!Array.isArray(numbers)){
            return res.status(400).json({
                error: "number must be an array"
            });

        }
        if(!numbers.every(num => typeof num === 'number' && !isNaN(num))){
            return res.status(400).json({
                error: "all elements in array must be a valid number"
            });

        }
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        const sum = numbers.reduce((acc,cv)=> acc + cv);
        const avg = sum/numbers.length
        res.status(200).send(`{
            min : ${min},
            max : ${max},
            average: ${avg}
        }`)

    } catch(error){
        res.status(400).send({error: "something went wrong"});

    }

}))


app.listen(port,()=>{
    console.log( `server is running on port ${port}`);
});