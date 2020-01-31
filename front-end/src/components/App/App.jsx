import React, { Component } from 'react';
import NavBar from './../navbar/navbar'
import Search from './../search/search'
import Homepage from './../homepage/Homepage'
import Hotel from './../hotel/hotel'
import Login from './../login/login'
import Signup from './../signup/signup'
import SimpleList from '../list/List'
import BookingsWishlist from './../bookingsAndWishlist/BookingsWishlist'
import {Router, BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Button } from 'react-bootstrap';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                show_search: false,
                bbox_list: [],
                type: '',//exact(one bbox) or not (multiple bbox)
                history: null
            },
            userAuth: false
        }
        this.authenticate = this.authenticate.bind(this)
        this.logout = this.logout.bind(this)
        // this.getHotelDetails = this.getHotelDetails.bind(this);
        // this.getBboxList = this.getBboxList.bind(this);
    }
    logout(){
        this.setState({userAuth: false})
    }
    authenticate(){
        this.setState({userAuth: true})
    }
    // getBboxList(list, type) {
    //     console.log(type, list);
    //     this.setState({ search: { show_search: true, bbox_list: list, type: type } });
    //     // this.props.history.push('/search');
    // }
    // getHotelDetails(hotel)
    // {
    //     console.log(hotel);
    //     // this.setState({hotel: hotel});
    // }
    render() {
        // const history = this.state.history;
        // if(!this.state.history)
        // {
        //     const history = createBrowserHistory();
        //     console.log(history);
        //     this.setState({history: history})
        // }
        // console.log(this.state.history);
        // console.log('inside homepage render', this.state.search);
        //console.log(this.state.search.show_search && <List search={this.state.search} />);
    //    console.log(this.state.userAuth)
        // const history = createBrowserHistory();
        // let props = this.props
        return <React.Fragment>
            {/* <NavBar bbox={this.getBboxList} />
            <List search={this.state.search} /> */}

            <BrowserRouter>
                <Route component = {props => <NavBar logout={this.logout} userAuth={this.state.userAuth} {...props}/> } /> {/*bbox={this.getBboxList} */}
                <Switch>

                    <Route path='/wishlist'  component={(props) => <BookingsWishlist type='WishList' {...props} auth={this.state.auth} />} />
                    
                    <Route path='/bookings'  component={(props) => <BookingsWishlist type='Bookings' {...props} auth={this.state.auth} />} />
                    
                    <Route exact path='/search' component={Search} />

                    <Route exact path={`/search/hotel/:id`} component={Hotel} />

                        {/* <List /> search={this.state.search}
                    </Route> */}
                     
                    
                    <Route path='/login'  component={props => <Login authenticate={this.authenticate} {...props} />} />
                    
             
                    <Route path='/signup' component={props=><Signup authenticate={this.authenticate} {...props}/>} />
                        {/* <Homepage history={history} /> bbox={this.getBboxList}
                    </Route> */}

                    <Route exact path='/' component={Homepage} />
                   
                </Switch>
            </BrowserRouter>

        </React.Fragment>
    }
}
export default App;