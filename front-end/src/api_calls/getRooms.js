import key from './apiKey'

const getRooms = async(dest, date) => {
    let arrival_date, departure_date;

    if (!date) {
        let date = new Date();
        console.log(date);
        arrival_date = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        date.setDate(date.getDate() + 7);
        departure_date = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    console.log(arrival_date, departure_date);

    console.log(`req = https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&search_id=none&order_by=popularity&languagecode=en-us&search_type=${dest.dest_type}&offset=0&dest_ids=${dest.dest_id}&guest_qty=${2}&arrival_date=${arrival_date}&departure_date=${departure_date}&room_qty=${1}`);

    let res = await fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/list?price_filter_currencycode=USD&search_id=none&order_by=popularity&languagecode=en-us&search_type=${dest.dest_type}&offset=0&dest_ids=${dest.dest_id}&guest_qty=${2}&arrival_date=${arrival_date}&departure_date=${departure_date}&room_qty=${1}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
                "x-rapidapi-key": key['key']
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.message && res.message.localeCompare("Key doesn't exists") === 0) {
                console.log(res.message);
                console.log("add api key in your project file api_calls/apiKey\nif you don't have key then get it from \nhttps://rapidapi.com/apidojo/api/booking")
                return null;
            }
            if (res.message) {
                console.log(res.message);
                return null;
            }
            console.log(res);
            let refined_result = res.result.map((res) => {
                // res.main_photo_url = "http://r-ec.bstatic.com/xdata/images/hotel/square60/77897735.jpg?k=9bef4152fd76026ad7885fc95a2a48d04a5a6bb68a1eefa5e292a8429aa3845e&o=";
                // resolution is not good so replace square60 with max500
                let photo_url = res.main_photo_url;
                var pos = photo_url.indexOf("square60");
                photo_url = photo_url.substring(0, pos) + 'max500' + photo_url.substring(pos + 8);
                // console.log(photo_url);
                return { id: res.hotel_id, name: res.hotel_name, type: res.accommodation_type_name, image: photo_url, address: res.address, city: res.city, country: res.country_trans }
                //accomadation_type_name,hotel_name_trans,hotel_name,main_photo_url,country_trans,class,zip,location_score,address,id,min_total_price,currency_code,facility_review_score{review_count,review_word,rating},hotel_id,review_score(overall),review_score_word,review_nr,hotel_facilities,city,city_in_trans,
                // order_by : popularity,distance,class_ascending,review_score,price
                // filter: price::9-40(range),class // eh app kr layi
            })
            return refined_result;
        })
    return res;
}
export default getRooms;

/*
    // %252C seprator in bbox
    // let bbox = `${latitude - 0.030268}%252C${latitude + 0.030268}%252C${longitude - 0.130171}%252C${longitude + 0.130171}`;
    // console.log(rooms);
    // console.log(bbox);

    list by map usess boundary box , 
    fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/list-by-map?search_id=none&price_filter_currencycode=USD&languagecode=en-us&order_by=popularity&guest_qty=1&room_qty=1&departure_date=${departure_date}&bbox=${bbox}&arrival_date=${arrival_date}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": key['host'],
            "x-rapidapi-key": key['key']
        }
    })
 */