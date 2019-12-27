import React, { Component } from 'react';
import getRooms from '../api_calls/getRooms';
import { throwStatement } from '@babel/types';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import './../searchedList.css'
class List extends Component {
    constructor(props) {
        super(props);
        console.log('contructor');
        console.log(this.props);
        const{longitude,latitude} = this.props.location.state.bbox[0];
        this.state = {
            show_list: false,
            longitude,
            latitude
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

    // static getDerivedStateFromProps(props, state) {
    //     // eh har var chalda after constructor
    //     console.log(props.search)
    //     if ((!props.search.bbox_list[0]) || (props.search.bbox_list[0].longitude === state.longitude)) {
    //         return null;
    //     }
    //     else {
    //         console.log('rerender');
    //         return {
    //             longitude: props.search.bbox_list[0].longitude,
    //             latitude: props.search.bbox_list[0].latitude,
    //             update: true
    //         }
    //     }
    // }
    componentDidUpdate() {
        console.log('component update');
        if (this.state.update) {
            this.setState({ update: false });
            this.loadHotels();//fetch nal jo  changes ho rhe ne oh detect nhi krda
        }
    }
    loadHotels() {
        // console.log(this.props.location);
        // let longitude = -0.127634, latitude = 51.507391;
        // if (false && this.props.location.search.bbox_list) {
        //     longitude = this.state.longitude;//this.props.search.bbox_list[0].longitude;// -0.127634;
        //     latitude = this.state.latitude;//this.props.search.bbox_list[0].latitude;// 51.507391;
        // }
        let {longitude,latitude} = this.state;
        console.log(longitude, latitude);

        getRooms(longitude, latitude)
            .then((list) => {
                if (list) {
                    console.log(list);
                    this.setState({ show_list: true, hotels: list });
                }
            })
        this.setState({ page_loaded: true });
    }
    componentDidMount() {
        console.log('inside componentdidmount + this.props.search');
        this.loadHotels();
        //nhi thik eh sirf ik var hi chalda
    }
    render() {
        // let { path, url } = useRouteMatch();// path used in Route , url used in link(matched)
        // let path = '/search';
        // let url = '/search';
        console.log(this.props.location);

        let list;
        if (this.state.show_list) {
            list = this.state.hotels.map((x, index) => {
                return <Link to={{
                    pathname: `search/hotel/${x.id}`,
                    state: {
                        hotel: x
                    }
                }} style={{textDecoration:'none'}} className="row hotelLink" key = { index }>
            <div className="col-3" style={{paddingTop: "25%",backgroundColor: "grey",border: "1px solid black",overflow: "hidden"}}>
                <img style={{position: "absolute",top: "0px",left: "0px",width: "100%",height: "100%",objectFit: "cover"}} src={x.image} />
            </div>
            <div className="col-8" style={{ paddingLeft: "30px" }}>
                <div className="row hotelHeading" style={{ fontSize: "3vw", fontWeight: "500" }}>
                    {x.name}
                </div>
                <div className="row" style={{ fontSize: "2vw", fontWeight: "400" }}>
                    {x.address + "," + x.city + "," + x.country}
                </div>
            </div>
                  </Link >
            })
}
return <div className='container-fluid'>{list}</div>;

{/* routing after /search no need of ReactRouter parent kol a */ }
{/* <Switch>
                <Route path={`/search/room`}>
                    <Room />
                </Route>
            </Switch> */}

    }
}
export default List;