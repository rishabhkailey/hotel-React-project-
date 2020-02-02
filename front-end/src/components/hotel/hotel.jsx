import React, { Component } from 'react'
import HotelImages from './../hotelImages/hotelImages'
import HotelReviews from '../hotelReviews/hotelReviews';
import HotelDetails from '../hotelDetails/hotelDetails';
import loader from '../loader/loader';

class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel_id: this.props.match.params.id,
            hotel: this.props.location.state.hotel,
            booked: false,
            wishlist: false,
            wishlist_loading: true,
            booking_loading: true
        }
        this.wishList = this.wishList.bind(this)
        this.bookHotel = this.bookHotel.bind(this)
        this.cancelBooking = this.cancelBooking.bind(this)
        this.removeFromWishlist = this.removeFromWishlist.bind(this)
    }

    redirectToLogin() {

    }
    cancelBooking() {
        
        fetch('http://localhost:5000/protected/deleteBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotel_id: this.state.hotel_id})
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                if (res)
                    this.setState({ booked: res.booked , booking_loading: false})
            })
            .catch((err) => { console.log(err) })
    }
    removeFromWishlist() {
        
        fetch('http://localhost:5000/protected/deleteFromWishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotel_id: this.state.hotel_id})
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                if (res){
                    console.log(res);
                    this.setState({ wishlist: res.wishlisted ,wishlist_loading: false})
                }
            })
            .catch((err) => { console.log(err) })
    }

    wishList() {
        fetch('http://localhost:5000/protected/wishlistHotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotel_id: this.state.hotel_id})
            
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                if (res)
                {
                    console.log(res);
                    if(res.loginRequired) {
                        this.props.history.push('/login')
                    }
                    else
                        this.setState({ wishlist: true })
                }
            })
            .catch((err) => { console.log(err) })
    }

    bookHotel() {
        fetch('http://localhost:5000/protected/bookHotel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotel_id: this.state.hotel_id})
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                console.log(res);
               
                if(res.loginRequired) {
                    this.props.history.push('/login')
                }
                else
                    this.setState({ booked: res.booked })
            })
    }
    componentDidMount() {

        fetch('http://localhost:5000/protected/isBooked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotel_id: this.state.hotel_id})
            
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                console.log(res);
                this.setState({ booked: res.booked ,booking_loading: false})
            })
            .catch((err) => { console.log(err) })


        fetch('http://localhost:5000/protected/isWishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotel_id: this.state.hotel_id})
            
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                console.log(res);
                this.setState({ wishlist: res.wishlisted , wishlist_loading: false})
            })
            .catch((err) => { console.log(err) })

    }
    render() {
        // if(this.props.match)
        //     console.log(this.props.match.params.id);
        // console.log('inside room');
        // console.log(this.props);
        let { hotel } = this.state;
        console.log(this.props.location.state.hotel);

        let Book, Wishlist
        if (!this.state.booked) {
            Book = <button onClick={this.bookHotel} style={{ width: "80%", marginLeft: '10%', fontSize: '24px', fontWeight: '400' }} className='btn btn-primary'>
                {this.state.booking_loading ? <loader /> : 'Book'}
            </button>
        }
        else {
            Book = <button onClick={this.cancelBooking} style={{ width: "80%", marginLeft: '10%', fontSize: '22px', fontWeight: '400' }} className='btn btn-primary'>
                {this.state.booking_loading ? <loader /> : 'Cancel booking'}
            </button>
        }
        if (!this.state.wishlist) {
            Wishlist = <button onClick={this.wishList} style={{ width: "80%", marginLeft: '10%', fontSize: '24px', fontWeight: '400' }} className='btn btn-primary'>
                Wishlist
                </button>
        }
        else {
            Wishlist = <button onClick={this.removeFromWishlist} style={{ width: "80%", marginLeft: '10%', fontSize: '22px', fontWeight: '400' }} className='btn btn-primary'>
                Remove from Wishlist
                </button>
        }


        return <div className='container-fluid' >
            <div className='row' >
                <div className='col-sm-6' >
                    <HotelImages id={this.state.hotel_id} />
                    <div className='row'>
                        <div className='col-6'>
                            {Book}
                        </div>
                        <div className='col-6'>
                            {Wishlist}
                        </div>
                    </div>
                </div>
                <div className='col-sm-6' >
                    <HotelDetails hotel={hotel} />
                    <HotelReviews hotel={hotel.hotel_id} />
                </div>
            </div>
        </div>
    }
}
export default Hotel;