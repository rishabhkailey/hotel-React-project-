import React, { Component } from 'react'
import HotelImages from './../hotelImages/hotelImages'
import HotelReviews from '../hotelReviews/hotelReviews';
import HotelDetails from '../hotelDetails/hotelDetails';

class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            hotel: this.props.location.state.hotel
        }
        this.wishList = this.wishList.bind(this)
        this.bookHotel = this.bookHotel.bind(this)
    }
    
    wishList() {
        fetch('http://localhost:5000/protected/addWishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.hotel)
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .catch((err)=>{console.log(err)})
    }

    bookHotel() {
        fetch('http://localhost:5000/protected/bookHotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.hotel)
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .catch((err)=>{console.log(err)})
    }
    render() {
        // if(this.props.match)
        //     console.log(this.props.match.params.id);
        // console.log('inside room');
        // console.log(this.props);
        let { hotel } = this.state;
        console.log(this.props.location.state.hotel);
        return <div className='container-fluid' >
            <div className='row' >
                <div className='col-sm-6' >
                    <HotelImages id={this.state.id} />
                    <div className='row'>
                        <div className='col-6'>
                            <button style={{ width: "80%", marginLeft: '10%', fontSize: '24px', fontWeight: '400' }} className='btn btn-primary'>
                                book
                            </button>
                        </div>
                        <div className='col-6'>
                            <button onClick={this.wishList} style={{ width: "80%", marginLeft: '10%', fontSize: '24px', fontWeight: '400' }} className='btn btn-primary'>
                                whishlist
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6' >
                    <HotelDetails hotel={hotel} />
                    <HotelReviews hotel={hotel.id} />
                </div>
            </div>
        </div>
    }
}
export default Hotel;