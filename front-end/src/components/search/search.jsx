import React, { Component } from 'react';
import SearchFilter from '../searchFilter/searchFilter';
import SimpleList from '../list/List'
import getRooms from '../../api_calls/getRooms';
import './search.css'

class List extends Component {
    constructor(props) {
        super(props);
        let {search,dest_id} = this.props.location.state
        // const{longitude,latitude} = this.props.location.state.bbox[0];
        this.state = {
            show_list: false,
            dest_id,
            search,
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
        let new_state = {}
        if (props.location.state.dest_id) {
            new_state.dest_id = props.location.state.dest_id
        }
        if (props.location.state.search) {
            new_state.search = props.location.state.search
        }
        console.log(state.search,new_state.search)
        if (new_state.search && state.search !== new_state.search) {
            new_state.needUpdate = true
        }
        else{
            new_state.needUpdate = false
        }
        return new_state
    }
    componentDidUpdate() {
        if (this.state.needUpdate) {
            this.setState({ needUpdate : false });
            this.loadHotels()
        }
    }
    loadHotels(filters) {

        this.disableShowList();
        console.log(this.state)

        let { search } = this.state

        fetch('http://localhost:5000/hotel/searchHotels', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: search})
        })
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then((res)=>{
            this.setState({show_list: true,hotels: res.hotels,needUpdate: false})
            console.log(res)
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

        let { search } = this.state;
        let list;
        if (this.state.show_list) {
            if(this.state.hotels.length == 0)
                list = <h2>No results found!!</h2>
            else
                list = <SimpleList show_list={this.state.show_list} hotels={this.state.hotels} />
        }
        else {
            list = <h1 style={{ textAlign: 'center', backgroundColor: 'white' }} className='row'>Loading...</h1>
        }

        return <div className='container-fluid' style={{ backgroundColor: '#eceef1' }}>
            <div className='row'>
                <div className='col-lg-2' style={{ borderRight: '1px solid #e8e5e5', backgroundColor: 'white', marginTop: '6px', marginLeft: '6px' }}>

                    <SearchFilter loadHotels={this.loadHotels} dest={this.state.dest} minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} />

                </div>
                <div className='col-lg-9' style={{ marginTop: '6px', marginLeft: '6px' }}>
                    <div className='row' style={{ backgroundColor: 'white', padding: '6px', marginBottom: '6px', fontSize: '16px', fontWeight: '500' }}>
                        showing search result for : {search}
                    </div>
                    {list}
                </div>
            </div>

        </div>;
    }
}
export default List;