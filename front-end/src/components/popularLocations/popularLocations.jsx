import React, { Component } from 'react';
import './popularLocations.css';
import getPopularLocations from '../../api_calls/getPopularLocations'
import { Redirect } from 'react-router-dom'
class PopularLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            redirectSearch: false
        }
        getPopularLocations()
            .then((res) => {
                this.setState({ locations: res, show: true })
            })
    }
    onClick(obj) {
        console.log('on click on pl')
        this.props.history.push({
            pathname: '/search',
            state: { dest_id: obj.dest_id , search: obj.name}
        })
    }
    componentDidMount() {

    }
    render() {
        // console.log(this.state.locations);
        let loc_tag = null;
        // console.log(this.state.redirectSearch && <Redirect to={`/search/`} />);
        if (this.state.show)
            loc_tag = this.state.locations.map((loc, index) => {
                return <div key={index} className='col-3' style={{  paddingLeft: '3%', paddingRight: '3%' }} onClick={() => { this.onClick(loc) }}>
                    <div style={{cursor: 'pointer'}} className='card'>
                        <img className='image' src={loc.photo} />
                        <h1 className='label'>{loc.name}</h1>
                    </div>
                </div>
            })
        return <div className='container-fluid' style={{ alignContent: "center" }}>
            <div className='row heading'>
                Popular Locations
            </div>
            <div className='row'>
                {loc_tag}
            </div>
            {/* {this.state.redirectSearch && <Redirect to={`/search`} />} */}
        </div>
    }
}

export default PopularLocations;