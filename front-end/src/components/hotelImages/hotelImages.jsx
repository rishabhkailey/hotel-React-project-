import React, { Component } from "react";
import './hotelImages.css'
import getHotelImages from '../../api_calls/getHotelImages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'


class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
    this.changeImage = this.changeImage.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  moveLeft() {
    if (this.state.startIndex === 0) {

    }
    else {
      let index = this.state.startIndex - 1;
      let mainImgSrc = this.state.images[index];
      this.setState({ startIndex: index, mainImage: mainImgSrc })
    }
  }
  moveRight() {
    if (this.state.startIndex === (this.state.noOfImages - 1)) {

    }
    else {
      let index = this.state.startIndex + 1;
      let mainImgSrc = this.state.images[index];
      this.setState({ startIndex: index, mainImage: mainImgSrc })
    }
  }
  componentDidMount() {
    console.log(this.props);
    fetch('http://localhost:5000/hotel/getHotelImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({hotel_id: this.props.id})
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((res) => {
        console.log(res)
        this.setState({ images: res.images, mainImage: res.images[0], startIndex: 0, noOfImages: res.images.length })
      })
      .catch((err) => { console.log(err) })
  } 
  changeImage(x) {
    this.setState({ mainImage: x });
  }
  render() {
    let startIndex = this.state.startIndex;
    let film = this.state.images.filter((x, index) => {
      if (index >= startIndex)
        return true;
      return false;
    })
      .map((x, index) => {
        return <div key={index} className='col-2 film' style={{ overflow: 'hidden', paddingTop: '16.666%' }} onClick={() => { this.changeImage(x) }}>{/*for on hover size decrease else all images shift*/}
          <img style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', objectFit: 'cover' }} src={x} />
        </div>
      });
    return <div className='container-fluid' style={{ border: '1px solid #dedede', backgroundColor: '#fffdf7' }}>
      <div className='row' style={{ overflow: 'hidden', padding: '1%' }}>
        <div className='col-8' style={{ overflow: 'hidden', paddingTop: '66%', margin: 'auto' }}>
          <img src={this.state.mainImage} style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      <div className='row'>
        <div className='col-1 indicator' onClick={this.moveLeft}><FontAwesomeIcon icon={faAngleLeft} size='' /></div>
        <div className='col-10' style={{ display: 'flex', overflow: 'hidden', padding: '0' }}>{film}</div>
        <div className='col-1 indicator' onClick={this.moveRight}><FontAwesomeIcon icon={faAngleRight} size='' /></div>
      </div>
    </div>

  }
}

export default Images;