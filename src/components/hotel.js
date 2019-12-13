import React,{Component} from 'react'
import Carousel from './carousel'
import getHotelImages from '../api_calls/getHotelImages'

class Hotel extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            id: this.props.match.params.id,
            hotel: this.props.location.state.hotel
        }
    }
    render(){
        // if(this.props.match)
        //     console.log(this.props.match.params.id);
        // console.log('inside room');
        // console.log(this.props);
        console.log(this.props.location.state.hotel);
        return <React.Fragment>
            <Carousel id={this.state.id} getImages={getHotelImages} />
            <h3> {this.state.hotel.name}</h3>
            <h5> {this.state.hotel.city + ',' + this.state.hotel.country} </h5>
        </React.Fragment>
    }
}
export default Hotel;