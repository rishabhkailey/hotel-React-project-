import React, { Component } from 'react';
import Carousal from './carousel'
import PopularLocations from './popularLocations'
import getBannerImages from './../api_calls/getBannerImages'
class Homepage extends Component {
    constructor() {
        super();
    }
    render() {
        return <React.Fragment>
            <Carousal getImages={getBannerImages}/>
            <PopularLocations bbox={this.props.bbox}/>
        </React.Fragment>
    }
}

export default Homepage;