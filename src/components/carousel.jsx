import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import images from '../api_calls/getCarouselImages'
class SlideShow extends Component {
    constructor() {
        super();
    }
    render() {
        let items = images.map((img,index)=>{
            console.log(img);
            return <Carousel.Item key={index}>
                <img className="d-block w-100" style={{objectFit:'cover',objectPosition:'50% 65%'}} height='300px' src={img.src} alt='slide' />
                <Carousel.Caption>
                    <h3>{img.label}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        })
        return <React.Fragment>
            <Carousel style={{padding: "5px",backgroundColor:"#d7d7d7"}}>
                {items}
            </Carousel>
        </React.Fragment>
    }
}

export default SlideShow;