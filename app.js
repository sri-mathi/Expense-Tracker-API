const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 8000
app.listen(port)
const Expense = require('./models/expense')
mongoose.connect('mongodb+srv://Srimathie:elthra@cluster0.mlqp5ee.mongodb.net/Track?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

app.get('/',async(req,res)=>{
   const expenses = await Expense.find();
   res.send(expenses);
})
app.get('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const result=await Expense.findById(id)
        console.log(req.params);
    if(result){
    res.send(result);
    }else{
        res.send("No such id found")
    }
}catch(err){
    res.send(err);
}
 })
 
app.delete('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const result=await Expense.findByIdAndDelete(id)
        console.log(req.params);
    if(result){
    res.send(result);
    }else{
        res.send("No such id found")
    }
}catch(err){
    res.send(err);
}
 })
 app.use(express.json())
 app.put('/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const updateObject = req.body;
        const result=await Expense.findByIdAndUpdate(id,{$set:updateObject},{new:true});
        if(result){
         res.send(result);
        }else{
        res.send("No such id found")
        }
}catch(err){
    res.send(err);
}
 })
app.post('/',async(req,res)=>{
    console.log(req.body);
    const newExpense = req.body;
    await Expense.create(newExpense);
    res.send("Created")
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})