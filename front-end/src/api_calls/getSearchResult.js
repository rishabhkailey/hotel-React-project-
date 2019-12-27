import key from './apiKey'

const getSearchResult = async (value) => {
    let res = await fetch(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=${value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": key['host'],
            "x-rapidapi-key": key['key']
        }
    })
        .then((res) => res.json())
        .then(res => {
            if (res.message && res.message.localeCompare("Key doesn't exists") === 0) {
                console.log(res.message);
                console.log("add api key in your project file api_calls/apiKey\nif you don't have key then get it from \nhttps://rapidapi.com/apidojo/api/booking")
                return null;
            }
            let bbox = [];
            res.forEach((res) => {
                bbox.push({ type: res.dest_type, dest_id: res.dest_id, latitude: res.latitude, longitude: res.longitude });
            })
            // this.props.bbox(bbox, '');
            return bbox;
            // console.log(bbox);
        })
    // await console.log('suggestions = ', suggestions);
    return res;
    // await return suggestions;
}
export default getSearchResult;

// showSuggestions('chan').then((res)=>{console.log(res)});
