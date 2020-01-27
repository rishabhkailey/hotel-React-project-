import React, { Component } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import {Link} from 'react-router-dom'

class simpleList extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state={
            show_list: this.props.show_list,
            hotels: this.props.hotels
        }
    }
    getDerivedStateFromProps(props,state){
        console.log(props)
    }
    render() {
        let list;
        if (this.state.show_list) {
            list = this.state.hotels.map((x, index) => {
                return <Link to={{
                    pathname: `search/hotel/${x.hotel_id}`,
                    state: {
                        hotel: x
                    }
                }} style={{ textDecoration: 'none' }} className="row hotelLink" key={index}>
                    <div className="col-3" style={{ paddingTop: "25%", overflow: "hidden" }}>
                        <img style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", objectFit: "cover" }} src={x.photo_url} />
                    </div>
                    <div className="col-8" style={{ paddingLeft: "30px" }}>
                        <div className="row hotelHeading" style={{ fontSize: '2.2vw', fontWeight: '600' }}>
                            {x.hotel_name}
                        </div>
                        <div className="row" style={{ fontSize: "1.5vw", fontWeight: "" }}>
                            {x.address + "," + x.city + "," + x.country_trans}
                        </div>
                        <div className="col-lg-6 rating" style={{ paddingTop: '9px', paddingLeft: '0px' }}>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className='row'>
                                        <span style={{ fontSize: '1.4vw', fontWeight: '500' }}>Rating</span>
                                        <span style={{ fontWeight: '400', fontSize: '1.4vw', paddingLeft: '6px' }}>{x.review_word}</span>
                                    </div>
                                </div>

                                <div className='col-6' style={{ padding: '10px' }}>
                                    <div className='progress' style={{ paddingLeft: '0px' }}>
                                        <div className='progress-bar' style={{ width: ('' + x.review_score * 10 + '%') }}>{x.review_score}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row pricing' style={{ fontSize: '1.4vw', paddingTop: '8px' }}>
                            <div className='price' style={{ fontSize: '1.4vw', fontWeight: '500' }}>
                                {getSymbolFromCurrency(x.currency_code)}{x.min_total_price}
                            </div>
                            /week
                        </div>
                    </div>
                </Link >
            })
        }
        return <div>
            {this.state.show_list}
            {list}
        </div>
    }
}

export default simpleList