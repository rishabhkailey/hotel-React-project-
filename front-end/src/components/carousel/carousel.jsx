import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './carousel.css';
import getBannerImages from './../../api_calls/getBannerImages'

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
                    <div className='row image-cover'>
                        <img className='d-block banner' src={img.src} alt='slide' />
                        <Carousel.Caption>
                            <h3 style={{backgroundImage:'linear-gradient(90deg,transparent,black, transparent)'}}>{img.label}</h3>
                        </Carousel.Caption>
                    
                    </div>
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