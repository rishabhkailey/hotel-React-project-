import React,{Component} from 'react';


class List extends Component
{
    constructor(){
        super();
    }
    render(){
        let rooms = [{
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        },
        {
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        },
        {
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        },
        {
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        },
        {
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        },
        {
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        },
        {
            name:'hello',
            image:'https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg'
        }
    ];
        // console.log(rooms);

        let list = rooms.map((room,index)=>{
            return <div key={index} className="card col-md-3" style={{width: "18rem"}}>
                <img src={room.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        })

        // console.log(list);
        return <div className='container-fluid'>
            <div className='row'>
                {list}
            </div>
        </div>
    }
}
export default List;