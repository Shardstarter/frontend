import React from 'react';
import {useState} from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import {Box} from '@mui/material'
import ProjectCard from 'components/ProjectCard'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function MySwiper() {
  
  
    return (
        <Carousel>
            <Box width="350px" height="400px"><ProjectCard></ProjectCard></Box>
            <Box width="350px" height="400px"><ProjectCard></ProjectCard></Box>
            <Box width="350px" height="400px"><ProjectCard></ProjectCard></Box>
            <Box width="350px" height="400px"><ProjectCard></ProjectCard></Box>
            <Box width="350px" height="400px"><ProjectCard></ProjectCard></Box>
        </Carousel>
    );  
  } 