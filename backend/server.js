const express = require('express');
const port = 4500;
const app = express();
const cors = require('cors');
const routes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(port, () => console.log("Server running at port " + port))
