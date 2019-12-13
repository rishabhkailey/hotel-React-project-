let getHotelImages = async (x) => {
    let res = await fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos?languagecode=en-us&hotel_ids=${x}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
            "x-rapidapi-key": "741ae90465msh54a6fbb5720b82ep1651eejsne066104adfff"
        }
    })
        .then((response) => response.json())
        .catch(err => {
            console.log(err);
        });
    
    let prefix = res.url_prefix;
    res = res.data[x].map((img)=>{
        return {
            src :prefix+img[4],// 4 index 1024*768 , 5 max300 , 6 max500, 7 square60
            label : null
        }
    })
    return res;
}

export default getHotelImages;