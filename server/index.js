const express = require('express');
const app = express();
const morgan = require('morgan');
const { mongoose } = require('./database');
const cors = require('cors');

//Settings
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

//Routes
app.use('/api/users', require('./routers/users.routes'));
app.use('/api/companies', require('./routers/companies.routes'));
app.use('/api/booking',require('./routers/bookings.routes'));

//Starting the serve
app.listen(app.get('port'), ()=>{
});