const express = require("express")
const init = require("./db")
require("dotenv").config()
const path = require("path")



// dichiarazione route
const userRoute = require("./routes/user")
const checkInRoute = require("./routes/checkIn")
const subscriptionRoute = require("./routes/subscription")
const postEventRoute = require("./routes/postEvent")
const ticketServiceRoute = require("./routes/ticketService")


// dichiarazione middleware
const cors = require("cors")
const genericErrorHandler = require("./middleware/genericErrorHandler")
const badReqHandler = require("./middleware/badReqHandler")


const PORT = 4047
const server = express()



server.use(express.json())


// utilizzo middleware
server.use(cors())





// utilizzo route
server.use("/", userRoute)
server.use("/", checkInRoute)
server.use("/", subscriptionRoute)
server.use("/", postEventRoute)
server.use("/", ticketServiceRoute)

//generic error handler

server.use(genericErrorHandler)
server.use(badReqHandler)
init()



server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))