import React, { Component } from 'react';
import NavBar from './navbar.jsx'
import List from './searched_list.jsx'
import Homepage from './Homepage'
import { BrowserRouter, Route ,Switch } from "react-router-dom";
class App extends Component {
    constructor() {
        super();
        this.state = {
            search: {
                show_search: false,
                bbox_list: [],
                type: ''//exact(one bbox) or not (multiple bbox)
            }
        }
        this.getBboxList = this.getBboxList.bind(this);
    }
    getBboxList(list, type) {
        console.log(type, list);
        this.setState({ search: { show_search: true, bbox_list: list, type: type } });
        // this.props.history.push('/search');
    }
    render() {
        console.log('inside homepage render',this.state.search);
        //console.log(this.state.search.show_search && <List search={this.state.search} />);
        return <React.Fragment>
            {/* <NavBar bbox={this.getBboxList} />
            <List search={this.state.search} /> */}

            <BrowserRouter>
                <NavBar bbox={this.getBboxList} />
                <Switch>
                    <Route path='/search'>
                        <List search={this.state.search} />
                    </Route>
                    <Route path='/'>
                        <Homepage bbox={this.getBboxList}/>
                    </Route>
                </Switch>
            </BrowserRouter>

        </React.Fragment>
    }
}
export default App;