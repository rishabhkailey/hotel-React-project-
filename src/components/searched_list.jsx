import React, { Component } from 'react';
import getRooms from '../api_calls/getRooms';
import { throwStatement } from '@babel/types';


class List extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        this.state = {
            show_list: false,
            longitude: -0.127634,
            latitude: 51.507391
        }
    }
    /*this method is now unsafe_componentWillRecieveProps , and in next update it will be removed so use getDerivedStateFromProps
     componentWillReceiveProps(new_props) // during update component life cycle =  componentWillReceiveProps -> shouldComponentUpdate ->(if true from scu) componentWillUpdate -> render -> componentDidUpdate
     {
         if(this.page_loaded){
             this.loadHotels();
         }
     }
     */

    // static method so this keyword cannot be used so props and state are send as arguments
    // and to setState return new state obj , or null if don't want to update state 

    static getDerivedStateFromProps(props, state) {
        console.log(props.search.bbox_list)
        if ((!props.search.bbox_list) || (props.search.bbox_list[0].longitude === state.longitude)) {
            return null;
        }
        else {
            console.log('rerender');
            return {
                longitude: props.search.bbox_list[0].longitude,
                latitude: props.search.bbox_list[0].latitude,
                update: true
            }
        }
    }
    componentDidUpdate() {
        console.log('component update');
    }
    loadHotels() {
        console.log(this.props.search);
        let longitude = -0.127634, latitude = 51.507391;
        if (this.props.search.bbox_list) {
            longitude = this.state.longitude;//this.props.search.bbox_list[0].longitude;// -0.127634;
            latitude = this.state.latitude;//this.props.search.bbox_list[0].latitude;// 51.507391;
        }
        console.log(longitude, latitude);

        getRooms(longitude, latitude)
            .then((list) => {
                if (list)
                    this.setState({ show_list: true, hotels: list });
            })
        this.setState({ page_loaded: true });
    }
    componentDidMount() {
        console.log('inside componentdidmount', this.props.search);
        this.loadHotels();//pehli var eh chalu 
        //nhi thik eh sirf ik var hi chalda
    }
    render() {
        if(this.state.update)
        {
            this.setState({update: false});
            this.loadHotels();
        }
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