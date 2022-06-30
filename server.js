import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./backend/router/router.js";
dotenv.config({ path: 'config.env' });

const app = express();

app.use(cors());
app.use(express.json({limit:"30mb", extended:true}));
app.use(express.urlencoded({limit:"30mb", extended:true}));
app.use(cookieParser())
app.use(routes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL ='mongodb+srv://mirzalaique:L123456789@cluster0.w5olc.mongodb.net/bookTicket?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  useFindAndModify: false,
  useCreateIndex: true,
})
.then(() => {
  app.listen(PORT, () => {
    console.log("lsitening on port", PORT);
    })
  })
    .catch(err => {
      console.log(err);
});

// heroku hosting step
if(process.env.NODE_ENV === "production"){
  app.use(express.static("app/build"));
}
