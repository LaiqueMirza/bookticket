import mongoose from 'mongoose';

 const moviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:String,
     cities: [{ type: String }],
    cinemas:[{type: String}],
    showtime: [{ type: String }],
})

const Movie = new mongoose.model("Movie", moviesSchema);

export default Movie;