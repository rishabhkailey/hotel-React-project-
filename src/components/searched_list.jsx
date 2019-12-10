import React, { Component } from 'react';
import getRooms from '../api_calls/getRooms';


class List extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        this.state = {
            show_list: false
        }
    }
    loadHotels() {
        console.log(this.props.search);
        let longitude=-0.127634,latitude=51.507391;
        if(this.props.search.bbox_list[0]){
            longitude = this.props.search.bbox_list[0].longitude;// -0.127634;
            latitude = this.props.search.bbox_list[0].latitude;// 51.507391;
        }
        console.log(longitude, latitude);
        
        getRooms(longitude,latitude)
        .then((list)=>{
            if(list)
                this.setState({show_list: true,hotels: list});
        })
    }
    componentDidMount() {
        console.log('inside componentdidmount', this.props.search);
        this.loadHotels();
    }
    render() {
        let list;
        if (this.state.show_list) {
            list = this.state.hotels.map((hotel, index) => {
                return <div key={index} className="card col-md-3" style={{ width: "18rem" }}>
                    <img src={hotel.image} className="card-img-top" style={{ width: '305px', height: '200px' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <p className="card-text">{hotel.address},{hotel.city},{hotel.country}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            })
        }
        return <div className='container-fluid'>
            <div className='row'>
                {list}
            </div>
        </div>
        // return <h1>hello</h1>
    }
}
export default List;