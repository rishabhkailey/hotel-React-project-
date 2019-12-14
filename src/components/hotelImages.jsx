import React,{Component} from "react";
import '.././hotelImages.css'
import getHotelImages from '../api_calls/getHotelImages'

class Images extends Component{
  constructor(props){
    super(props);
    this.state={
        images: []
    }
    this.changeImage=this.changeImage.bind(this);
  }
  componentDidMount(){
      console.log(this.props);
      getHotelImages(this.props.id)
      .then((res)=>{
          this.setState({images: res.slice(0,7  ),mainImage: res[0]})
      })
  }
  changeImage(x){
    this.setState({mainImage: x});
  }
  render(){
    // let images = [
    //   'http://r-ec.bstatic.com/xdata/images/hotel/max1024x768/104139697.jpg?k=5d50bc13ebead74d480c7802309ed24cb77a7b91eb60f5c7802f646c0188d552&o=',
    //   'https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg',
    //   ,'https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-600w-721703848.jpg','https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-600w-721703848.jpg','https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-600w-721703848.jpg']
    let film = this.state.images.map((x,index)=>{
      return <img key={index} onClick={()=>{this.changeImage(x)}} className='film' src={x} />
    });
    return <div>
      <img className='row' style={{height:'400px',width:'400px',objectFit:'cover',margin: 'auto'}}src={this.state.mainImage}/>
      <div className='row'>{film}</div>
    </div>
  }
}

export default Images;