import key from './apiKey'

let getHotelImages = async (x) => {
    let res = await fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos?languagecode=en-us&hotel_ids=${x}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": key['host'],
            "x-rapidapi-key": key['key']
        }
    })
        .then((response) => response.json())
        .catch(err => {
            console.log(err);
        });
    
    let prefix = res.url_prefix;
    res = res.data[x].map((img)=>{
        return prefix+img[4];// 4 index 1024*768 , 5 max300 , 6 max500, 7 square60
    })
    return res;
}

export default getHotelImages;