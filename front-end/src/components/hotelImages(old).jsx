import React, { Component } from "react";
import '.././hotelImages.css'
import getHotelImages from '../api_calls/getHotelImages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons'


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
  
  moveLeft(){
    if(this.state.startIndex === 0)
    {

    }
    else{
      let index = this.state.startIndex-1;
      let mainImgSrc = this.state.images[index];
      this.setState({startIndex: index,mainImage: mainImgSrc})
    }
  }
  moveRight(){
    if(this.state.startIndex === (this.state.noOfImages-1))
    {

    }
    else{
      let index = this.state.startIndex + 1;
      let mainImgSrc = this.state.images[index];
      this.setState({startIndex: index,mainImage: mainImgSrc})
    }
  }
  componentDidMount() {
    console.log(this.props);
    getHotelImages(this.props.id)
      .then((res) => {
        this.setState({ images: res, mainImage: res[0] ,startIndex: 0,noOfImages:res.length})
      })
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
        return <div key={index} onClick={() => { this.changeImage(x) }} className='film-frame'>{/*for on hover size decrease else all images shift*/}
          <img className='film' src={x} />
        </div>
      });
    return <div className='container-fluid'>
      <div style={{width: '100%',backgroundColor:'grey',height: '10px'}}></div>
      <div className='row' style={{ overflow: 'hidden' }}>
        <img className='main-image' src={this.state.mainImage} />
      </div>

      <div className='row'>
        <div className='indicator' onClick={this.moveLeft}><FontAwesomeIcon icon={faAngleLeft} size='' /></div>
        <div className='preview' >{film}</div>
        <div className='indicator' onClick={this.moveRight}><FontAwesomeIcon icon={faAngleRight} size='' /></div>
      </div>
    </div>

  }
}

export default Images;