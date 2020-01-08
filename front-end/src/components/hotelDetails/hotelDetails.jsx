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
            }
        }
    }

    componentDidMount() {
        getDescription(this.props.hotel.id)
            .then((res) => { this.setState({ des: res }) })
    }
    render() {
        let { hotel } = this.props;
        return <React.Fragment>
            <h3 > {hotel.name} </h3>
            <h5 > {hotel.city + ',' + hotel.country} </h5>
            
            
            <div className='row pricing' style={{ padding: '8px' , marginTop: '25px'}}>
                <div className='price' style={{ fontSize: '2em', fontWeight: '500' }}>
                    {getSymbolFromCurrency(hotel.currency_code)}{hotel.price}
                    /week
                </div>

            </div>
            
            
            <div className='description' style={{ marginTop: '25px'}}>
                <div style={this.state.des_style}>
                    {this.state.des}
                </div>
                <div style={{margin: 'auto'}}>
                    <button className='btn btn-primary'>show more</button>
                </div>
            </div>

            
            <div className="col-lg-6 rating" style={{ paddingTop: '9px' ,marginTop: '25px'}}>
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