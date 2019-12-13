import React, { Component } from 'react';
import getRooms from '../api_calls/getRooms';
import { throwStatement } from '@babel/types';
import {Switch,Route,Link,useRouteMatch} from 'react-router-dom'
class List extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        this.state = {
            show_list: false,
            longitude: -0.127634,
            latitude: 51.507391
        }
        // console.log(useRouteMatch());
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
        if ((!props.search.bbox_list[0]) || (props.search.bbox_list[0].longitude === state.longitude)) {
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
        if(this.state.update)
        {
            this.setState({update: false});
            this.loadHotels();//fetch nal jo  changes ho rhe ne oh detect nhi krda
        }
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
        // let { path, url } = useRouteMatch();// path used in Route , url used in link(matched)
        let path = '/search';
        let url = '/search';
        let list;
        if (this.state.show_list) {
            list = this.state.hotels.map((hotel, index) => {
                return <div key={index} className="card col-md-3" style={{ width: "18rem" }}>
                    <img src={hotel.image} className="card-img-top" style={{ height: '50%',objectFit:'cover' }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <p className="card-text">{hotel.address},{hotel.city},{hotel.country}</p>
                        <Link to={{
                            pathname: `search/hotel/${hotel.id}`,
                            state:{
                                hotel:hotel
                            }
                        }} className="btn btn-primary" /* onClick={this.props.hotel(hotel)} */>Check</Link>
                    </div>
                </div>
            })
        }
        return <div className='container-fluid'>
            <div className='row'>
                {list}
            </div>
            {/* routing after /search no need of ReactRouter parent kol a */}
            {/* <Switch>
                <Route path={`/search/room`}>
                    <Room />
                </Route>
            </Switch> */}
        </div>
        // return <h1>hello</h1>
    }
}
export default List;