const express=require ('express')
const monogoose=require('mongoose')
const app=express()
const port=3040


app.use(express.json())
//db configuration 
monogoose.connect('mongodb://localhost:27017/nov-notes-app').then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

//schema 
const Schema=monogoose.Schema
const noteSchema=new Schema({
    title:{
        type :String,
        required:true
    },
    body:{
        type:String
    }
})

//model 
const Note=monogoose.model('Note',noteSchema)

//setup apis
app.get('/notes',(req,res)=>{
    Note.find().then((notes)=>{
        res.json(notes)
    }).catch((err)=>{
        console.log(err)
    })
})

app.post('/notes',(req,res)=>{
    const body=req.body
    const note=new Note(body)
    note.save().then((note)=>{
        res.json(note)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/notes/:id',(req,res)=>{
    const id=req.params.id
    Note.findById(id).then((note)=>{
        if(note){
            res.json(note)
        }else{
            res.json({})
        }
      
    }).catch((err)=>{
        console.log(err)
    })
})

app.put('/notes/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Note.findByIdAndUpdate(id,body,{new:true,runValidators:true}).then((note)=>{
        res.json(note)
    }).catch((err)=>{
        res.json(err)
    })

})

app.delete('/notes/:id',(req,res)=>{
    const id=req.params.id
    Note.findByIdAndDelete(id).then((note)=>{

        if(note){
            res.json(note)
        }else{
            res.json({})
        }
        
    }).catch((err)=>{
        res.json(err)
    })
})


app.listen(port,()=>{
    console.log('listening on port',port)
})