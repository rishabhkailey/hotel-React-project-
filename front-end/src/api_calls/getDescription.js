import key from "./apiKey";

const getDescription = async (hotelId)=>{
    
    // let des = await fetch("https://apidojo-booking-v1.p.rapidapi.com/properties/get-description?check_out=2019-03-15&languagecode=en-us&check_in=2019-03-13&hotel_ids=124268", {
	// "method": "GET",
	// "headers": {
	// 	"x-rapidapi-host": key['host'],
	// 	"x-rapidapi-key": key['key']
	// }
    // })
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(err => {
    //     console.log(err);
    // }); 

    let des =  `Stay in the Heart of London. With tranquil courtyard garden, St. James' Court, A Taj Hotel, London offers 4-star rooms, free WiFi and 3 restaurants. Buckingham Palace can be reached in a short walk. The spacious, elegant rooms at St James' Court have flat-screen TVs and luxurious beds. All rooms have air-conditioning, a mini-bar and a modern bathroom with fluffy bathrobes and slippers. Guests can relax in the beauty center, offering an indulgent treatment menu. A gym is also available to guests. St James' Court features the Michelin-starred Quilon restaurant and the stylish, award-winning Zander Bar. Bistro 51 serves fresh European cuisine and Bank Westminster offers a modern British menu. The St James' Court is a 10-minute walk from Victoria Coach and Railway Stations, offering access to the Gatwick Express. The Houses of Parliament and Big Ben are a 10-minute walk away.Stay in the Heart of London. With tranquil courtyard garden, St. James' Court, A Taj Hotel, London offers 4-star rooms, free WiFi and 3 restaurants. Buckingham Palace can be reached in a short walk. The spacious, elegant rooms at St James' Court have flat-screen TVs and luxurious beds. All rooms have air-conditioning, a mini-bar and a modern bathroom with fluffy bathrobes and slippers. Guests can relax in the beauty center, offering an indulgent treatment menu. A gym is also available to guests. St James' Court features the Michelin-starred Quilon restaurant and the stylish, award-winning Zander Bar. Bistro 51 serves fresh European cuisine and Bank Westminster offers a modern British menu. The St James' Court is a 10-minute walk from Victoria Coach and Railway Stations, offering access to the Gatwick Express. The Houses of Parliament and Big Ben are a 10-minute walk away.`

    return des;
}
export default getDescription;