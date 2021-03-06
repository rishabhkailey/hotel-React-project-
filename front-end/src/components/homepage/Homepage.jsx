import React, { Component } from 'react';
import Carousal from './../carousel/carousel'
import PopularLocations from './../popularLocations/popularLocations'
class Homepage extends Component {
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return <React.Fragment>
            <Carousal />
            <PopularLocations history={this.props.history} bbox={this.props.bbox}/>
        </React.Fragment>
    }
}

export default Homepage;