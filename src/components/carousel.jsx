import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import '.././carousel.css';
import getBannerImages from './../api_calls/getBannerImages'

// import images from '../api_calls/getBannerImages'
class SlideShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            fetched: false
        }
    }
    componentDidMount() {
        getBannerImages()
            .then((res) => {
                this.setState({ images: res, fetched: true });
            })
    }
    render() {
        let items;
        if (this.state.fetched)
            items = this.state.images.map((img, index) => {
                return <Carousel.Item key={index}>
                    <img className={`d-block banner`} style={{ objectFit: 'cover', objectPosition: '50% 65%' }} height='300px' src={img.src} alt='slide' />
                    <Carousel.Caption>
                        <h3>{img.label}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })
        return <React.Fragment>
            {this.state.fetched && <Carousel style={{ backgroundImage: 'linear-gradient(90deg, #c5c5c5, transparent,#c5c5c5)',
    borderRadius: '6px' ,padding: "5px", backgroundColor: "white" }}>
                {items}
            </Carousel>}
        </React.Fragment>
    }
}

export default SlideShow;