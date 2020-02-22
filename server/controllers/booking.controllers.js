const Booking = require('../models/booking');
const bookingController = {};

bookingController.getBookings = async (req, res) => {
    try{
        const booking = await Booking.find();
    res.json(booking);
    }catch(error){
        res.json({status: 'Get booking failed'});
    } 
    
};

bookingController.createBooking = async (req, res) =>{
    try{
        const booking = new Booking({
            user: req.body.user,
            company:  req.body.company,
            date:  req.body.date,
            time:  req.body.time
       });
        await booking.save();
        res.json({
            status: 'Booking save'
        }); 
    } catch(error){
        res.json({status: 'Create booking failed'});
    } 
       
};

bookingController.getBooking = async (req, res) =>{
    try{
        const booking = await Booking.findById(req.params.id);
    res.json(booking);
    }catch(error){
        res.json({status: 'Get booking failed'});
    }  
    
};

bookingController.editBooking = async (req, res) =>{
    try{
        const {id} = req.params;
        const booking = {
        user: req.body.user,
        company: req.body.company,
        date : req.body.date,
        time : req.body.time,
        price : req.body.price

    }
    await Booking.findByIdAndUpdate(id,{$set:booking},{new:true});
    res.json({status:'Booking update'});
    } catch(error){
        res.json({status: 'Update booking failed'});
    }
};

bookingController.deleteBooking = async (req, res) =>{
    try{
        await Booking.findByIdAndDelete(req.params.id);
        res.json({status:'Booking delete'});
    }catch(error){
        res.json({status: 'Delete booking failed'});
    }  
   
    
}

module.exports = bookingController;