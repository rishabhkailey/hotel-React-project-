import React, { Component } from 'react'
import './searchList.css'

class SearchFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minPrice: this.props.minPrice,
            maxPrice: this.props.maxPrice,
            minSelectPrice: this.props.minPrice,
            maxSelectPrice: this.props.maxPrice,
            classSelect: 0,
            orderSelect: 'order by',
            filterStyle: {}
        }
        this.minPriceChange = this.minPriceChange.bind(this);
        this.maxPriceChange = this.maxPriceChange.bind(this);
        this.classChange = this.classChange.bind(this);
        this.orderChange = this.orderChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.toggleFilter = this.toggleFilter.bind(this);
    }
    // toggleFilter(){
    //     const {filterStyle} = this.state;
    //     let style;
    //     if(filterStyle['display'])
    //     {
    //         if(filterStyle['display'] === 'none')
    //             style = {display: 'block'}
    //         else
    //             style = {display: 'none'}
    //     }
    //     else{
    //         style = {display: 'block'}
    //     }
    //     this.setState({filterStyle: style})
    // }
    classChange(event) {
        this.setState({ class: event.target.value })
    }
    orderChange(event) {
        this.setState({ order: event.target.value })
    }
    minPriceChange(event) {
        let value = Number(event.target.value);
        if (String(value) !== 'NaN' && value >= 0) {
            if (value > this.state.maxSelectPrice) {
                value = this.state.maxSelectPrice - 1;
            }
            this.setState({ minSelectPrice: value });
        }
    }
    maxPriceChange(event) {
        let value = Number(event.target.value);
        if (String(value) !== 'NaN' && value >= 0) {
            if (value >= this.state.maxPrice) {
                value = this.state.maxPrice;
            }
            if (value < this.state.minSelectPrice) {
                value = this.state.minSelectPrice + 1;
            }
            this.setState({ maxSelectPrice: value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { minSelectPrice, maxSelectPrice, classSelect, orderSelect } = this.state
        const filter = { minPrice: minSelectPrice, maxPrice: maxSelectPrice, classSelect, orderSelect }
        console.log(filter);

        this.props.loadHotels(filter);
    }

    render() {
        return <div>
            {/* <button className='collapse-button btn btn-primary' onClick={this.toggleFilter}>filters</button> */}
            <div className='collapse-filter-form' onClick={this.toggleFilter}> {/*style={this.state.filterStyle}*/}
                <h2 style={{ margin: 'auto' }} className='row'>Filters</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='minPriceFilter' style={{ paddingTop: '2em' }}>
                        <label>min price</label>
                        <input className='custom-range' type='range' step='1' value={this.state.minSelectPrice} min={this.state.minPrice} max={this.state.maxPrice} onChange={this.minPriceChange} />
                        <input type='text' className='col-10 form-control' value={this.state.minSelectPrice} placeholder='min price' onChange={this.minPriceChange} />
                    </div>

                    <div className='maxPriceFilter' style={{ paddingTop: '2em' }}>
                        <label>max price</label>
                        <input className='custom-range' type='range' step='1' value={this.state.maxSelectPrice} min={this.state.minPrice} max={this.state.maxPrice} onChange={this.maxPriceChange} />
                        <input type='text' className='col-10 form-control' value={this.state.maxSelectPrice} placeholder='max price' onChange={this.maxPriceChange} />
                    </div>

                    <div className='classFilter' style={{ paddingTop: '2em' }} className='row'>
                        <select value={this.state.class} className="custom-select" onChange={this.classChange}>
                            <option value="0">Select Class</option>
                            <option value="1">class 1 and above</option>
                            <option value="2">class 2 and above</option>
                            <option value="3">class 3 and above</option>
                            <option value="3">class 4 and above</option>
                            <option value="3">class 5 and above</option>
                        </select>
                    </div>

                    <div className='orderFilter' style={{ paddingTop: '2em' }} className='row'>
                        <select value={this.state.order} className="custom-select" onChange={this.orderChange}>
                            <option value='order by'>Order by</option>
                            <option value="popularity">popularity</option>
                            <option value="rating">rating</option>
                            <option value="distance">distance</option>
                            <option value="class_ascending">class ascending</option>
                            <option value="class_descending">class descending</option>
                        </select>
                    </div>

                    <div className='row' style={{ paddingTop: '2em', margin: 'auto' }}>
                        <button className='col-12 btn btn-primary' type='submit'>Filter</button>
                    </div>
                </form>
            </div>
        </div>
    }
}
export default SearchFilter;