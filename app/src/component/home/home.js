import React, { useEffect, useState } from "react";
import './home.css';
import { Card, Col, Row, Tooltip, message, Image } from 'antd';
import axios from "axios";


const Home = ({ moviesData }) => {
  const [loginCheck, setLoginCheck] = useState('');

  useEffect(() => {
    setLoginCheck(JSON.parse(sessionStorage.getItem("login")));
  }, []);
  const bookTicketClicked = (item) => {
    axios
      .post("/bookTicket", {
        movieId: item._id,
        userId: loginCheck
      })
      .then((res) => {
        if (res) {
          return message.info('Ticket booked')
        }
      })
      .catch((err) => {
        message.info("Could not book the ticket")
      });
  }
  return (
    <div className="homeDiv">
      <Row gutter={[32, 32]} justify="space-around" align="top">
        {moviesData?.map(item => {
          return (
            <>
              <Col xs={24} md={6}>
                <Card
                  hoverable
                  cover={
                    <Image
                      src={item.image}
                      width={250}
                      height={450}
                      preview={false}
                    />
                  }

                  style={{ width: 250 }}
                  className="mt-4"
                >
                  <div className='cardhomeDiv'>

                    <h2 className="text-xl">{item.name}</h2>
                    <p className="infoHomeDiv">
                      Cities : {item.cities.map(city => <span> {city}{', '}</span>)}
                    </p>
                    <p className="infoHomeDiv">
                      Cinemas : {item.cinemas.map(cinema => <span> {cinema}{', '}</span>)}
                    </p>
                    <p className="infoHomeDiv">
                      Showtimes : {item.showtime.map(time => <span> {time}{', '}</span>)}
                    </p>
                    {
                      loginCheck ?
                        <button onClick={() => bookTicketClicked(item)}>
                          Book ticket
                        </button>
                        :
                        <>
                        </>
                    }
                  </div>
                </Card>
              </Col>


            </>
          )

        })

        }
      </Row>
    </div>
  );
}

export default Home;