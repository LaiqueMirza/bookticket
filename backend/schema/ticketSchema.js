import mongoose from 'mongoose';

const ticketsSchema = new mongoose.Schema({
   movieId:String,
   userId:String
})

const Ticket = new mongoose.model("Ticket", ticketsSchema);
export default Ticket;