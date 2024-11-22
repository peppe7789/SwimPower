const express = require("express")
const init = require("./db")
require("dotenv").config()
const path = require("path")



// dichiarazione route
const userRoute = require("./routes/user")
const checkInRoute = require("./routes/checkIn")


// dichiarazione middleware
const cors = require("cors")
const validateUserBody = require("./middleware/validateUserBody")



const PORT = 4047
const server = express()



server.use(express.json())


// utilizzo middleware
server.use(cors())
server.use(validateUserBody)




// utilizzo route
server.use("/", userRoute)
server.use("/", checkInRoute)





init()



server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

