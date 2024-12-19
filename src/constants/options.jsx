export const SelectTravellersList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon: '✈︎',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon: '🥂',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of Fun loving adventurers',
        icon: '🏡',
        people:'3 to 5'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon: '⛵',
        people:'5 to 10'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon: '💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on average side',
        icon: '💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about the cost',
        icon: '💸'
    },
]

export const AI_PROMPT='Generate travel plan for location: {location}, for {noOfDays} days, for a {noOfTraveler} people with a {budget} budget. Give me hotel options list at least 5 with Hotel Name, Hotel Address, Hotel Image Url, Price, Geo Coordinates, Rating, Description. Suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, rating, time to travel for each of the location for {noOfDays} days with each day plan with best time to visit. all in JSON format'