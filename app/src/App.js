import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import NavBar from "./component/navBar/navBar";
import Home from "./component/home/home";
import SignUp from "./component/Log/signUp/signUp";
import LogIn from "./component/Log/logIn/logIn";
import { message } from "antd";
import axios from "axios";
import "./App.css";

import { HashRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    axios
      .get("/movies")
      .then((res) => {
        setMoviesData(res.data.result);
      })
      .catch((err) => {
        message.info('Error, refresh the page');
  });
  }, []);
 const onSearch =(value)=>{
  console.log(value)
   axios
     .get(`/movies?city=${value}`)
     .then((res) => {
       setMoviesData(res.data.result);
     })
     .catch((err) => {
       message.info('Error, refresh the page');
     });
}
  return (
    <HashRouter>
      <div className="App">
        <NavBar onSearch={onSearch}/>
        <Switch>
          <Route exact path="/" component={() => <Home moviesData={moviesData}/>} />
       
          <Route path="/logIn" component={LogIn} />
          <Route path="/signUp" component={SignUp} />
        
          <Route
            component={() => (
              <h2 style={{ textAlign: "center" }}>
                Page 404, You are lost go to {<Link to="/">Home</Link>}{" "}
              </h2>
            )}
          />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
