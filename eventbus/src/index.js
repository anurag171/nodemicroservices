const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const LISTENING_PORT = 4005
const events =[]
const deploy = false

/* const callPostApi = funtion(url,data,axios){

    axios.post(url,data).then((response) => {
        console.log(response);
        setComments(response.data)
      }, (error) => {
        console.log(error);
      });
} */

app.post('/events',(req,res)=>{

    const event = req.body;
    events.push(event)
    console.log('Event received ' +  req.body.type);
	if(deploy===true){
		axios.post('http://posts-clusterip-service:4000/events',event)
		/*axios.post('http://localhost:4001/events',event)
		axios.post('http://localhost:4002/events',event)
		axios.post('http://localhost:4003/events',event)*/
	}else{
		axios.post('http://localhost:4000/events',event)
		axios.post('http://localhost:4001/events',event)
		axios.post('http://localhost:4002/events',event)
		axios.post('http://localhost:4003/events',event)
	}
    
    res.send({status:'OK'})      
})

app.get('/events',(req,res)=>{
  res.send(events)
})

app.listen(LISTENING_PORT,()=>{
    console.log(`Listening on port ${LISTENING_PORT}`);
})