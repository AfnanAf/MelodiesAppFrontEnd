import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function Home() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div >
      <Carousel activeIndex={index} onSelect={handleSelect}>

        <Carousel.Item>
          <img height="900em"
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2016/11/22/19/15/dark-1850120_1280.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Music is the great uniter. An incredible force. Something that people who differ on everything and anything else can have in common.</h3>
            <p>
              – Sarah Dessen
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img height="900em"
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2016/11/23/00/39/hands-1851500_1280.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Music gives color to the air of the moment.</h3>
            <p>
              – Karl Lagerfeld
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img height="900em"
            className="d-block w-100"
            src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>If Music is a Place — then Jazz is the City, Folk is the Wilderness, Rock is the Road, Classical is a Temple.</h3>
            <p>– Vera Nazarin</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img height="900em"
            className="d-block w-100"
            src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Music is the moonlight in the gloomy night of life.</h3>
            <p>
              – John Paul Friedrich Richter
            </p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </div>
  )
}



