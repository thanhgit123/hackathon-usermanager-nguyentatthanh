const expresss = require('express');
const app  = expresss();
const PORT = 7000;
const cors = require('cors');
const userManagerRouter = require('./router/UserManger');
const bodyPaser = require('body-parser')

app.use(cors());
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:true}))

// dinh tuyen router
app.use('/',userManagerRouter)

app.listen(PORT,()=>{
    console.log(`Server is running to http://localhost:${PORT}`)
})