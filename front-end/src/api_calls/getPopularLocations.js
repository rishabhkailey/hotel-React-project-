const getPopularLocations = async ()=> { // async bec we will be     fetch this from our database 
    let locations = [
        {
            name: 'london',
            dest_id: "-2601889",
            latitude: 51.507391,
            longitude: -0.127634,
            photo: 'https://images.unsplash.com/photo-1515163988842-60ece4c9a5bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        },
        {
            name: 'NY',
            dest_id: "20088325",
            latitude: 40.768074,
            longitude: -73.981895,
            photo: 'https://cdn.getyourguide.com/img/tour_img-1667715-146.jpg'
        },
        {
            name: 'Rome',
            dest_id: "-126693",
            latitude: 41.89587,
            longitude: 12.482617,
            photo: 'https://www.thoughtco.com/thmb/GS4AiVqpE78EVPlhV8tJgRThEr0=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-roman-coliseum-in-the-early-morning-655490208-5abd1d0f119fa80037ef98b9.jpg'
        },
        {
            name: 'Dubai',
            dest_id: "-782831",
            latitude: 25.195175,
            longitude: 55.272678,
            photo: 'https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/Dubai-at-night-cover.jpg'
        }
    ]
    return locations;
}
export default getPopularLocations;