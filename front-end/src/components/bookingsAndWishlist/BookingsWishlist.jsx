import React, { Component } from 'react'
import List from '../list/List'

class bookingWishlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show_list: false,
            hotels: null
        }
    }

    showError(message) {
        
    }

    componentDidMount() {
        // console.log(`http://localhost:5000/protected/get${this.props.type}`)
        fetch(`http://localhost:5000/protected/get${this.props.type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res)=>{
                console.log(res);
                if(res.error) {
                    // showError(res.message)
                }
                else{
                    if(res.loginRequired) {
                        this.props.history.push('/login')
                    }
                    else
                        this.setState({show_list: true,hotels: res.hotels})
                }
            })
    }
    render() {
        let list;
        if(this.state.show_list && this.state.hotels){
            if(this.state.hotels.length > 0)
            list = <List show_list={this.state.show_list} hotels={this.state.hotels} />
        }
        else {
            list = <h1>no results found</h1>
        }
        return <div>
            
            <div className='col-7' style={{margin: 'auto'}}>   
                <h1>{this.props.type}</h1> 
                {list}
            </div>
        </div>
    }
}

export default bookingWishlist;