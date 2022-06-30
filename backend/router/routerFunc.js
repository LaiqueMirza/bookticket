
import Movie from "../schema/moviesSchema.js";
import User from "../schema/usersSchema.js";
import Ticket from "../schema/ticketSchema.js";

const routerFun = {
    movies: async (req, res) => {
        try {
          const params = req?.query?.city?.toLowerCase();
          if(params){
            const result = await Movie.find({ cities: { $all: [params]}});
            res.json({ status: 200, result })

          }else{

            const result = await Movie.find();
            res.json({status: 200, result})
          }
      
        } catch (err) {
          res.json({ status: 500, err });
        }
      },
      loginUser: async (req, res) => { 
      try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({ "email": email });
        if (password == userData.password) {
          //remove the  previous token of the user and create a new one
         
          res.status(200).send(userData);
        } else {
          res.status(400).send({"message":"no user found"});
        }
      } catch (err) {
        res.status(500).send({"message":"server error"});
      }
      },
      signUpUser: async (req, res) => {
        try {

          const checkEmailPresent = await User.findOne({
            "email": req.body.email,
          });
          if (checkEmailPresent) {
            res.status(206).send({"message":"Email is already there. Go, Login"});
          } else {
            const newUser = new User({
                userName: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            const newUserRegistered = await newUser.save();
            res.status(201).send(newUserRegistered);
          }
        } catch (err) {
          res.status(400).send({"message":"Could Not Add You, Try Again"});
        }
      },
      bookTicket: async(req, res) => {
  try {
    
      const newTicket = new Ticket({
        userId: req.body.userId,
        movieId: req.body.movieId
      });
      const newTicketsaved = await newTicket.save();
    res.status(201).send(newTicketsaved);
  } catch (err) {
    res.status(400).send({ "message": "Could Not Add You, Try Again" });
  }
},
      }

export default routerFun;

