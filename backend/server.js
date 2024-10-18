const mongoose = require('mongoose');

const app = require('./app');


const data = process.env.DATABASE

mongoose.connect(data,{
    useNewUrlParser:true,
    useUnifiedTopology:true
   
}).then(()=>{
    console.log('Connected to database')
}).catch(err => {
    console.log(err.message)
})

port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`listening at ${port}`)
})
