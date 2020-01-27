import React, { Component } from 'react'
import getReviews from '../../api_calls/getReviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

class HotelReviews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: null
        }
    }
    componentDidMount() {
        fetch('http://localhost:5000/hotel/getHotelReviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hotel_id: this.props.hotel })
        })
        .then((response)=>{
            return response.json()
        })
        .then((res)=>{
            console.log(res)
            this.setState({reviews: res.reviews})
        })
    }

    render() {
        let { reviews } = this.state;
        let review_list = [];
        if (reviews) {
            console.log(reviews.length)
            if (reviews.length === 0) {
                review_list = [<div style={{ textAlign: 'center' }}>no reviews</div>]
            }
            else
                review_list = reviews.map((review, index) => {
                    return <div className='review' style={{ backgroundColor: 'white', border: '1px solid #dadada', borderRadius: '8px', padding: '10px', margin: '4px' }} key={index}>
                        <div className='row user' style={{ paddingLeft: '10px' }}>
                            <div className='col-1' style={{ borderRadius: '50%', paddingTop: '8.33%', overflow: 'hidden' }}>
                                <FontAwesomeIcon style={{padding: '5px',position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', top: '0px', left: '0px'}} icon={faUser}/>
                                {/* <img src={review.author.avatar} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', top: '0px', left: '0px' }} /> */}
                            </div>
                            <div style={{ fontSize: '1.5em', fontWeight: '400', paddingLeft: '10px' }}>{review.author_uname}</div>
                        </div>
                        <div className=''>
                            <div className=''>{review.average_rating_out_of_10}</div>
                            <div className='pros'>{review.message}</div>
                        </div>
                    </div>
                })
        }

        return <div style={{ backgroundColor: 'rgb(249, 249, 249)', border: '1px solid #eceef1', padding: '4px', borderRadius: '4px', marginTop: '25px' }}>
            <div style={{ fontSize: '1.5em', fontWeight: '500', padding: '8px', textAlign: 'center' }}>Reviews and Rating</div>
            {review_list}
        </div>
    }
}

export default HotelReviews;