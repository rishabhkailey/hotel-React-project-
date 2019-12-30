import key from './apiKey'

const getSuggestions = async(value) => {
    let res = await fetch(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?languagecode=en-us&text=${value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": key['host'],
                "x-rapidapi-key": key['key']
            }
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.message && res.message.localeCompare("Key doesn't exists") === 0) {
                console.log(res.message);
                console.log("add api key in your project file api_calls/apiKey\nif you don't have key then get it from \nhttps://rapidapi.com/apidojo/api/booking")
                return null;
            }
            let suggestions = [];
            res.forEach((res) => {
                var i = 0;
                for (i = 0; i < res.label.length; i++) {
                    if (res.label[i].localeCompare(',') === 0) {
                        break;
                    }
                }
                var name = res.label.substring(0, i);
                var info = res.label.substring(i + 1);
                suggestions.push({ name: name, info: info, dest_type: res.dest_type, dest_id: res.dest_id, latitude: res.latitude, longitude: res.longitude });
                // console.log(name,info);
            })
            return suggestions;
        })
        // return res;
    console.log(res);
    // await console.log('suggestions = ', suggestions);
    return res;
    // await return suggestions;
}
export default getSuggestions;

// showSuggestions('chan').then((res)=>{console.log(res)});