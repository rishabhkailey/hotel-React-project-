import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import '.././carousel.css';

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
        let fxn_arg;
        let imageHeight = '300px';
        let className = 'banner';
        if (this.props.id)//hotel images
        {
            fxn_arg = this.props.id;
            imageHeight = '100%'
            className = 'hotel-images';
        }
        this.props.getImages(fxn_arg)
            .then((res) => {
                this.setState({ images: res, className, fetched: true });
            })
        // console.log(this.state.images);
    }
    render() {
        let items;
        if (this.state.fetched)
            items = this.state.images.map((img, index) => {
                return <Carousel.Item key={index}>
                    <img className={`d-block ${this.state.className}`} style={{ objectFit: 'cover', objectPosition: '50% 65%' }} height='300px' src={img.src} alt='slide' />
                    <Carousel.Caption>
                        <h3>{img.label}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            })
        return <React.Fragment>
            {this.state.fetched && <Carousel style={{ padding: "5px", backgroundColor: "#d7d7d7" }}>
                {items}
            </Carousel>}
        </React.Fragment>
    }
}

export default SlideShow;