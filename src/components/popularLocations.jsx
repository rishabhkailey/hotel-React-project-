import React, { Component } from 'react';
import '.././popularLocations.css';
import getPopularLocations from '../api_calls/getPopularLocations'
import {Redirect} from 'react-router-dom'
class PopularLocations extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            redirectSearch: false
        }
        getPopularLocations()
        .then((res)=>{
            this.setState({locations: res,show: true})
        })
    }
    onClick(obj) {
		let bbox = [obj];
		for (let x in obj) {
			console.log(x);
		}
		this.props.bbox(bbox, 'exact');
		this.setState({ redirectSearch: true });
	}
    componentDidMount(){

    }
    render() {
        // console.log(this.state.locations);
        let loc_tag = null;
        console.log(this.state.redirectSearch && <Redirect to={`/search/`} />);
        if(this.state.show)
            loc_tag = this.state.locations.map((loc)=>{
                return <div className='col-md-3' onClick={()=>{this.onClick(loc)}}>
                    <div className='card'>
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
			{this.state.redirectSearch && <Redirect to={`/search`} />}
        </div>
    }
}

export default PopularLocations;