import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import '.././search.css';

import getSuggestions from '../api_calls/getSuggestions'

class NavBar extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			search_value: '',
			show_suggestion: false,
			suggestions: [],
			options: ['rishabh', 'veer', 'singh', 'kailey', 'raman'],
			hover: false,
			suggestion_position: {},
			redirect: false,
			count: 0
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(getSuggestions);
	}
	handleSubmit(event) {
		event.preventDefault();
		console.log('submit');
		getSuggestions(this.state.inputValue)
			.then((bbox) => {
				this.props.bbox(bbox, '');
			})
			.then(() => {
				this.setState({ redirect: true });// after setting bbox
			})
	}
	onClick(obj) {
		this.setState({ show_suggestion: false, inputValue: obj.name, suggestions: [] });
		let bbox = [obj];
		for (let x in obj) {
			console.log(x);
		}
		this.props.bbox(bbox, 'exact');
		this.setState({ redirect: true });
		// let history = useHistory();
		// history.push('/search');
	}
	onChange(event) {
		let value = event.target.value;

		this.setState({ inputValue: value });

		if (parseInt(value.length) != -1) {
			this.setState({ show_suggestion: false, suggestion: [] })
			return;
		}

		let elem = ReactDOM.findDOMNode(this);
		let input = elem.childNodes[2].childNodes[1].childNodes[0].getBoundingClientRect();

		let top = input.top + input.height;
		let left = input.left;

		getSuggestions(value)
			.then((suggestions) => {
				if (suggestions)
					this.setState({ show_suggestion: true, suggestions: suggestions, suggestion_position: { top: top, left: left } });
			})
	}

	render() {
		let suggestion_list;
		if (this.state.show_suggestion) {
			let list = this.state.suggestions.map((x, index) => {
				return <div className='form-control col-12 suggestion' style={{ display: 'block' }} key={index} onClick={() => { this.onClick(x) }}>
					<div style={{ fontWeight: "bold", display: "inline" }}>{x.name}</div>
					<div style={{ fontWeight: "100", display: "inline", paddingLeft: "inherit" }}>{x.info}</div>
				</div>
			});
			// console.log('list = ' + this.state.suggestions + this.state.show_suggestion);
			let left = '' + this.state.suggestion_position.left + 'px';
			let top = '' + this.state.suggestion_position.top + 'px';
			suggestion_list = <div style={{ backgroundColor: "white", position: 'absolute', left: left, top: top }}>
				{list}
			</div>
		}
		return <React.Fragment>
			<Navbar bg="primary" expand="lg" className="navbar-dark">
				<Navbar.Brand>Hotels</Navbar.Brand>{/*.Brand for site logo or name*/}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">{/*.Collapse for multiple nav inside when screens size is small*/}
					<Nav className="mr-auto">
						{/* <Nav.Link href="#home">Home</Nav.Link>  use brand as home*/}
						<Nav.Link href="#Top">Top</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Form inline className='mr-auto col-7' id='basic-nav-dropdown' onSubmit={this.handleSubmit}>
						<FormControl type="text" placeholder="Search" style={{borderTopRightRadius: "0px",borderBottomRightRadius: "0px"}} className="col-10" value={this.state.inputValue} onChange={this.onChange} />
						{/* <FormControl type="submit" value="s" style={{borderTopLeftRadius: "0px",borderBottomLeftRadius: "0px"}} className="col-1" /> */}
						<Button className='col-2' type="submit" style={{borderTopLeftRadius: "0px",borderBottomLeftRadius: "0px"}}>search</Button>
					</Form>
					{suggestion_list}{/* div tag with list*/}
					<Nav className="mr-auto">
						<Button variant="primary" className="">log in</Button>
						<Button variant="primary" className="">orders</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>;
			{/* {this.state.count=this.state.count+1} */}
			{this.state.redirect && <Redirect to={`/search/`} />}
		</React.Fragment>
	}
}

export default NavBar;