import React, { Component } from 'react';
import SearchFilter from '../searchFilter/searchFilter';
import SimpleList from '../list/List'
import getRooms from '../../api_calls/getRooms';
import getSymbolFromCurrency from 'currency-symbol-map'
import { throwStatement } from '@babel/types';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import './search.css'

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
    
    static getDerivedStateFromProps(props, state) {
    
        const dest = props.location.state.destination[0];
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
            this.loadHotels();
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
                    console.log(list);
                    this.setState({ show_list: true, hotels: list, loading: false });
                }
            })
    }
    componentDidMount() {
        console.log('inside componentdidmount');
        this.loadHotels();
    }
    render() {
        // let { path, url } = useRouteMatch();// path used in Route , url used in link(matched)
        // let path = '/search';
        // let url = '/search';

        let { dest } = this.state;
        let list;
        if(this.state.show_list){
            list = <SimpleList show_list={this.state.show_list} hotels={this.state.hotels} />
        }
        else{
            list = <h1 style={{ textAlign: 'center', backgroundColor: 'white' }} className='row'>Loading...</h1>
        }
       
        return <div className='container-fluid' style={{ backgroundColor: '#eceef1' }}>
            <div className='row'>
                <div className='col-lg-2' style={{ borderRight: '1px solid #e8e5e5', backgroundColor: 'white', marginTop: '6px', marginLeft: '6px' }}>

                    <SearchFilter loadHotels={this.loadHotels} dest={this.state.dest} minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} />

                </div>
                <div className='col-lg-9' style={{ marginTop: '6px', marginLeft: '6px' }}>
                    <div className='row' style={{ backgroundColor: 'white', padding: '6px', marginBottom: '6px', fontSize: '16px', fontWeight: '500' }}>
                        showing search result for : {dest.name}
                    </div>
                    {list}
                </div>
            </div>

        </div>;
    }
}
export default List;