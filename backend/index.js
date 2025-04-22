
require('dotenv').config();
const { initializeDatabase } = require('./db/db.connect')
const { Events } = require("./models/event.model")
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors())
initializeDatabase();

async function readAllEvents(){
    try{
        const allEvents = await Events.find()
        return allEvents
    }catch(error){
        throw(error)
    }
}

app.get('/events', async (req, res) => {
  try{
    const allEvents = await readAllEvents()
    if(allEvents){
        res.status(201).json(allEvents)
    }else {
        res.status(404).json({error: "Events not found."}) 
    }
  } catch(error){
    res.status(500).json({error: "An error occured while fetching events."})
  }
})

async function createNewEvent(newEvent){
    try{
        const event = new Events(newEvent)
        const saveEvent = await event.save()
        return saveEvent
    }catch(error){
        throw(error)
    }
}

app.post("/events", async (req, res) => {
    try{
        const savedEvent = await createNewEvent(req.body)
        if(savedEvent){
            res.status(201).json({message: "Event saved successfully."})
        } else {
            res.status(404).json({error: "Event not found"})
        }
    }catch(error){
        res.status(500).json({error: "An error ocured while sending data."})
        console.error("Error in readAllEvents:", error)
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

