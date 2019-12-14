import React, { Component } from 'react';
import Carousal from './carousel'
import PopularLocations from './popularLocations'
class Homepage extends Component {
    constructor() {
        super();
    }
    render() {
        return <React.Fragment>
            <Carousal />
            <PopularLocations bbox={this.props.bbox}/>
        </React.Fragment>
    }
}

export default Homepage;