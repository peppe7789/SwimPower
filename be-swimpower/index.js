const express = require("express")
const init = require("./db")
require("dotenv").config()
const path = require("path")



// dichiarazione route




// dichiarazione middleware
const cors = require("cors")




const PORT = 4047
const server = express()



server.use(express.json())


// utilizzo middleware
server.use(cors())



// utilizzo route






init()



server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

