import React, { Component } from 'react';
import NavBar from './../navbar/navbar'
import List from './../searchList/searchList'
import Homepage from './../homepage/Homepage'
import Hotel from './../hotel/hotel'
import Login from './../login/login'
import {Router, BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
class App extends Component {
    constructor() {
        super();
        this.state = {
            search: {
                show_search: false,
                bbox_list: [],
                type: '',//exact(one bbox) or not (multiple bbox)
                history: null
            }
        }
        // this.getHotelDetails = this.getHotelDetails.bind(this);
        // this.getBboxList = this.getBboxList.bind(this);
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
        const history = createBrowserHistory();
        return <React.Fragment>
            {/* <NavBar bbox={this.getBboxList} />
            <List search={this.state.search} /> */}

            <Router history={history}>
                <NavBar history={history}  /> {/*bbox={this.getBboxList} */}
                <Switch>

                    <Route path={`/search/hotel/:id`} component={Hotel} />

                    <Route path='/search' exact component={List} />
                        {/* <List /> search={this.state.search}
                    </Route> */}
                    <Route exact path='/' render={()=><Homepage history={history} />} />

                    <Route path='/login' component={Login} />
                        {/* <Homepage history={history} /> bbox={this.getBboxList}
                    </Route> */}
                </Switch>
            </Router>

        </React.Fragment>
    }
}
export default App;