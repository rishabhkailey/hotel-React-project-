import React, { Component } from 'react'
import List from '../list/List'

class bookingWishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_list: false,
            hotels: []
        }
    }
    componentDidMount() {
        // console.log(`http://localhost:5000/protected/get${this.props.type}`)
        // fetch(`http://localhost:5000/protected/get${this.props.type}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then((response) => {
        //         if (!response.ok) throw new Error(response.status);
        //         else return response.json();
        //     })
        //     .then((res)=>{
        //         this.setState({show_list: true,hotels: res})
        //     })
    }
    render() {
        let list;
        if(this.state.show_list){
            list = <List show_list={this.state.show_list} hotels={this.state.hotels} />
        }
        return <div>
            
            <h1>{this.props.type}</h1>
                {list}
        </div>
    }
}

export default bookingWishlist;