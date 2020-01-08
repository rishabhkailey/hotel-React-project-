import key from "./apiKey";

const getReviews = async (hotelId)=>{
    let res = await fetch(`https://apidojo-booking-v1.p.rapidapi.com/properties/get-featured-reviews?languagecode=en-us&hotel_id=${hotelId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host":  key['host'],
            "x-rapidapi-key": key['key']
        }
    })
    .then(response => {
        return response.json();
    })
    .then((res)=>{
        res = res.vpm_featured_reviews;
        res = res.map((r)=>{
            if(!r.author.avatar)
            {
                r.author.avatar = 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png';
            }
            return r;
        })
        return res;
    })
    .catch(err => {
        console.log(err);
    });

    
    console.log(res.vpm_featured_reviews);

    return res;
    //title(can be null),average_score_out_of_10,cons,pros,date,relative_time{years_past,days_past,weeks_past,months_past},author{avatar(img src),name}
}
export default getReviews;