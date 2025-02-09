const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
const adminRoutes = require('./routes/adminRoutes');
const adminDashboard = require('./routes/adminDashboard');
const bookTicket = require('./routes/bookTicket');
const availableSeats = require('./routes/availableSeats');
const availableTrains = require('./routes/availableTrains');


app.use(express.json());
// const verifyAdmin = require('./middlewares/verifyAdmin');
app.use(cors()); 

//Auth and protected routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

//Admin routes
app.use('/admin', adminRoutes);
app.use('/admin/dashboard', adminDashboard);

// Train and ticket
app.use('/ticket', bookTicket);
app.use('/train/seats', availableSeats);
app.use('/train/info', availableTrains);

const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});