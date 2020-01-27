import React, { Component } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map'
import getDescription from '../../api_calls/getDescription';

class HotelDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            des: '',
            des_style: {
                height: '200px',
                overflow: 'hidden'
            },
            button: 'Read more'
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.state.button === 'Read more') {
            this.setState({ des_style: {}, button: 'Hide' })
        }
        else {
            this.setState({ des_style: { height: '200px', overflow: 'hidden' }, button: 'Read more' })
        }
    }

    componentDidMount() {
        console.log({ hotel_id: this.props.hotel.hotel_id })
        fetch('http://localhost:5000/hotel/getHotelDescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hotel_id: this.props.hotel.hotel_id })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((res) => {
                console.log(res)
                this.setState({des: res.desc})
            })
    }
    render() {
        let { hotel } = this.props;
        return <React.Fragment>
            <h3 > {hotel.hotel_name} </h3>
            <h5 > {hotel.city + ',' + hotel.country_trans} </h5>


            <div className='row pricing' style={{ padding: '8px', marginTop: '25px' }}>
                <div className='price' style={{ fontSize: '2em', fontWeight: '500' }}>
                    {getSymbolFromCurrency(hotel.currency_code)}{hotel.min_total_price}
                    /week
                </div>

            </div>


            <div className='description' style={{ marginTop: '25px' }}>
                <div style={this.state.des_style}>
                    {this.state.des}
                </div>
                <div style={{ margin: 'auto' }}>
                    <button onClick={this.onClick} style={{ border: '0px', fontSize: '1.1em', fontWeight: '500', backgroundColor: 'white', marginTop: '8px', color: '#007bff' }}>{this.state.button}</button>
                </div>
            </div>


            <div className="col-lg-6 rating" style={{ paddingTop: '9px', marginTop: '25px' }}>
                <div className='row'>
                    <div className='col-6'>
                        <div className='row'>
                            <span style={{ fontSize: '1.4em', fontWeight: '500' }}>Rating</span>
                            <span style={{ fontWeight: '400', fontSize: '1.4em', paddingLeft: '6px' }}>{hotel.review_word}</span>
                        </div>
                    </div>
                    <div className='col-6' style={{ padding: '10px' }}>
                        <div className='progress' style={{ paddingLeft: '0px' }}>
                            <div className='progress-bar' style={{ width: ('' + hotel.review_score * 10 + '%') }}>{hotel.review_score}</div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    }
}
export default HotelDetails;