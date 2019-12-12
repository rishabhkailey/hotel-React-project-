import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import images from '../api_calls/getCarouselImages'
class SlideShow extends Component {
    constructor() {
        super();
    }
    render() {
        return <React.Fragment>
            <Carousel style={{padding: "5px",backgroundColor:"#d7d7d7"}}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height='300px'
                        src={images[0].src}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                            <h3>{images[0].label}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height='300px'
                        src={images[0].src}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{images[1].label}</h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        height='300px'
                        src={images[2].src}// src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{images[2].label}</h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </React.Fragment>
    }
}

export default SlideShow;