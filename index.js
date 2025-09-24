import express from 'express'
const app=express()
const port=3000

app.use(express.json())

let tea=[]
let ids=1

app.post('/tea', (req,res) => {
    const {name,price}=req.body
    const newTea={id:ids++,name,price}
    tea.push(newTea)
    res.status(201).send(newTea)
})

app.get('/tea',(req,res) =>{
    res.status(200).send(tea);
})

app.get('/tea/:id',(req,res) =>{
    const check=tea.find(t=> t.id === parseInt(req.params.id))
    if(!check) {
        return res.status(404).send("Not Found")
    } else {
        return res.status(200).send(check)
    }
})

app.put('/tea/:id',(req,res) => {
    const data=tea.find(t=> t.id=== parseInt(req.params.id))
    if(!data) {
        return res.status(404).send("Not Found")
    } 
    const {name,price} =req.body
    data.name=name;
    data.price=price;
    res.status(200).send(data)
})

app.delete('/tea/:id',(req,res) => {
    const index=tea.find(t=> t.id=== parseInt(req.params.id))
    if(index===-1) {
        return res.status(404).send("Not Found")
    } else {
        tea.splice(index,1);
        return res.status(200).send("Deleted")
    }
    })

app.listen(port,() => {
    console.log(`server running at ${port}`);
    
}) 