import React, { Component, useState  } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import styles from "../src/assets/jss/material-kit-react/views/components.js";
import SectionCarousel from './SectionCarousel.js';
import { Slide } from 'material-auto-rotating-carousel';
const useStyles = makeStyles(styles);

 export default function Home () {

      const [index, setIndex] = useState(0);
  
      const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
    
    return (
      <div>
     
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
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
    )}
    
  
 
