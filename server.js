const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config()
const dgConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const doctorRoute = require('./routes/doctorRoute');
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorRoute);


const port = process.env.port || 5000;


app.get("/", (req, res) => {
    return res.json("hello server started")
})

app.listen(port, () => console.log(`Listening on port ${port}`))
