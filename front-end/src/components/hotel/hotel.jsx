import React, { Component } from 'react'
import HotelImages from './../hotelImages/hotelImages'
import getSymbolFromCurrency from 'currency-symbol-map'
import HotelReviews from '../hotelReviews/hotelReviews';

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
                            <button style={{ width: "80%", marginLeft: '10%', fontSize: '24px', fontWeight: '400' }} className='btn btn-primary'>
                                whishlist
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6' >
                    <h3 > {hotel.name} </h3>
                    <h5 > {hotel.city + ',' + hotel.country} </h5>

                    <div className="col-lg-6 rating" style={{ paddingTop: '9px' }}>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='row'>
                                    <span style={{ fontSize: '1.4em', fontWeight: '500' }}>Rating</span>
                                    <span style={{ fontWeight: '400', fontSize: '1.4em', paddingLeft: '6px' }}>{hotel.review_word}</span>
                                </div>
                            </div>
                            <div className='col-6'  style={{ padding: '10px' }}>
                                <div className='progress' style={{ paddingLeft: '0px' }}>
                                    <div className='progress-bar' style={{ width: ('' + hotel.review_score * 10 + '%') }}>{hotel.review_score}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row pricing' style={{ padding: '8px' }}>
                        <div className='price' style={{ fontSize: '2.4em', fontWeight: '500' }}>
                            {getSymbolFromCurrency(hotel.currency_code)}{hotel.price}
                            /week
                        </div>

                    </div>
                    <HotelReviews hotel={hotel.id}/>
                </div>
            </div>
        </div>
    }
}
export default Hotel;