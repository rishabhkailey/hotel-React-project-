import React, { Component } from 'react';
import SearchFilter from './../searchFilter/searchFilter';
import getRooms from './../../api_calls/getRooms';
import { throwStatement } from '@babel/types';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import './searchList.css'

class List extends Component {
    constructor(props) {
        super(props);
        console.log('contructor', this.props);
        // const{longitude,latitude} = this.props.location.state.bbox[0];
        this.state = {
            show_list: false,
            dest: null,
            minPrice: 0,
            maxPrice: 1000
        }
        this.disableShowList = this.disableShowList.bind(this);
        this.loadHotels = this.loadHotels.bind(this);
    }
    disableShowList() {
        this.setState({ show_list: false })
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
        // eh har var chalda after constructor and without constructor when new props arrives(update) 
        // not after setState

        const dest = props.location.state.destination[0];
        //if state.dest is null means first time then update state
        // or if new props.dest_id is different then current state
        if ((state.dest === null) || (state.dest.dest_id !== dest.dest_id)) {
            console.log('rerender');
            return {
                dest: props.location.state.destination[0],
                needUpdate: true
            }
        }
        else
            return null;
    }
    componentDidUpdate() {
        console.log(`component update lalala , need update = ${this.state.needUpdate}`);
        if (this.state.needUpdate) {
            this.setState({ needUpdate: false });
            this.loadHotels();//fetch nal jo changes ho rhe ne oh detect nhi krda
            //when we search and are already on /search
        }
    }
    loadHotels(filters) {
        console.log(filters)
        this.disableShowList();
        console.log('loadHotels()');
        const { dest } = this.state;
        console.log(dest);

        getRooms(dest)
            .then((list) => {
                if (list) {
                    // console.log(list);
                    this.setState({ show_list: true, hotels: list, loading: false });
                }
            })
        // this.setState({ show_list: true, hotels: [] });
        // this.setState({ page_loaded: true });
    }
    componentDidMount() {
        console.log('inside componentdidmount');
        this.loadHotels();
        //nhi thik a , eh sirf ik var hi chalda
    }
    render() {
        // let { path, url } = useRouteMatch();// path used in Route , url used in link(matched)
        // let path = '/search';
        // let url = '/search';

        let list;
        let {dest} = this.state;
        if (this.state.show_list) {
            list = this.state.hotels.map((x, index) => {
                return <Link to={{
                    pathname: `search/hotel/${x.id}`,
                    state: {
                        hotel: x
                    }
                }} style={{ textDecoration: 'none' }} className="row hotelLink" key={index}>
                    <div className="col-3" style={{ paddingTop: "25%", backgroundColor: "grey", overflow: "hidden" }}>
                        <img style={{ position: "absolute", top: "0px", left: "0px", width: "100%", height: "100%", objectFit: "cover" }} src={x.image} />
                    </div>
                    <div className="col-8" style={{ paddingLeft: "30px" }}>
                        <h3 className="row hotelHeading">
                            {x.name}
                        </h3>
                        <div className="row" style={{ fontSize: "16px", fontWeight: "" }}>
                            {x.address + "," + x.city + "," + x.country}
                        </div>
                    </div>
                </Link >
            })
        }
        else {
            list = <h1 style={{textAlign: 'center',backgroundColor: 'white'}} className='row'>Loading...</h1>
        }
        return <div className='container-fluid' style={{backgroundColor: '#eceef1'}}>
            <div className='row'>
                <div className='col-lg-2' style={{ borderRight: '1px solid #e8e5e5' ,backgroundColor: 'white',marginTop: '6px',marginLeft: '6px'}}>

                    <SearchFilter loadHotels={this.loadHotels} dest={this.state.dest} minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} />

                </div>
                <div className='col-lg-9' style={{marginTop: '6px',marginLeft: '6px'}}>
                    <div className='row' style={{backgroundColor: 'white',padding: '6px',marginBottom:'6px',fontSize:'16px',fontWeight:'500'}}>
                        showing search result for : {dest.name}
                    </div>
                    {list}
                </div>
            </div>

        </div>;
    }
}
export default List;