import React, { Component, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import styles from "../src/assets/jss/material-kit-react/views/components.js";
import SectionCarousel from './SectionCarousel.js';
import { Slide } from 'material-auto-rotating-carousel';
const useStyles = makeStyles(styles);

export default function Home() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>

      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img height="700em"
            className="d-block w-100"
            src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Real Music
            for Real Stories
</h3>
            <p>From hit releases to rare finds to old gold. every song here is someone’s favorite.

.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
        <img height="700em"
            className="d-block w-100"
            src="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg "
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img height="700em"
            className="d-block w-100"
            src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img height="700em"
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2016/11/22/19/15/dark-1850120_1280.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img height="700em"
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2016/11/23/00/39/hands-1851500_1280.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel></div>
  )
}



