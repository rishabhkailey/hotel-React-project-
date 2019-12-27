import React, { Component } from 'react'
import HotelImages from './hotelImages'

class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            hotel: this.props.location.state.hotel
        }
    }
    render() {
        // if(this.props.match)
        //     console.log(this.props.match.params.id);
        // console.log('inside room');
        // console.log(this.props);
        console.log(this.props.location.state.hotel);
        return <div className = 'container-fluid' >
            <
            div className = 'row' >
            <
            div className = 'col-sm-6' >
            <
            HotelImages id = { this.state.id }
        /> <
        /div>   <
        div className = 'col-sm-6' >
            <
            h3 > { this.state.hotel.name } < /h3> <
            h5 > { this.state.hotel.city + ',' + this.state.hotel.country } < /h5> <
            /div> <
            /div> <
            /div>
    }
}
export default Hotel;