import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession =  model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "generate travel plan for location: las vegas, for 3 days, for a couple with a cheap budget. Give me hotel options list at least 5 with Hotel Name, Hotel Address, Hotel Image Url, Price, Geo Coordinates, Rating, Description. Suggest itinerary with place name, place details, place image url, geo coordinates, ticket pricing, rating, time to travel for each of the location for 3 days with each day plan with best time to visit. all in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"tripName\": \"Las Vegas Budget Getaway for Couples (3 Days)\",\n  \"budget\": \"Cheap\",\n  \"travelers\": 2,\n  \"duration\": 3,\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"hotelImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/CircusCircusLasVegas.jpg/1280px-CircusCircusLasVegas.jpg\", \n      \"price\": \"$$ (check current rates)\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1202,\n        \"longitude\": -115.172\n      },\n      \"rating\": 3.5,\n      \"description\": \"A classic Vegas experience with a circus theme, affordable rooms, and some free attractions.\"\n    },\n    {\n      \"hotelName\": \"The LINQ Hotel + Experience\",\n      \"hotelAddress\": \"3535 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"hotelImageUrl\": \"https://www.linqpromo.com/wp-content/uploads/2023/05/The-LINQ-Hotel-Exterior-1.jpg\",\n      \"price\": \"$$$ (check current rates)\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1212,\n        \"longitude\": -115.1716\n      },\n      \"rating\": 4.0,\n      \"description\": \"Mid-range option with a central location on the Strip, offers various amenities and attractions.\"\n    },\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"hotelImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Excalibur_Hotel_and_Casino.jpg/1280px-Excalibur_Hotel_and_Casino.jpg\",\n      \"price\": \"$$ (check current rates)\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.092,\n        \"longitude\": -115.170\n      },\n      \"rating\": 3.7,\n      \"description\": \"Themed around King Arthur, offers affordable rooms and a more family-friendly atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Luxor Hotel & Casino\",\n      \"hotelAddress\": \"3900 S Las Vegas Blvd, Las Vegas, NV 89119\",\n      \"hotelImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Luxor_Hotel_and_Casino_Las_Vegas.jpg/1280px-Luxor_Hotel_and_Casino_Las_Vegas.jpg\",\n      \"price\": \"$$$ (check current rates)\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0916,\n        \"longitude\": -115.173\n      },\n      \"rating\": 4.0,\n      \"description\": \"Pyramid-shaped hotel with a unique atmosphere and reasonably priced options.\"\n    },\n    {\n      \"hotelName\": \"Motel 6 Las Vegas - East\",\n      \"hotelAddress\": \"4800 E Tropicana Ave, Las Vegas, NV 89121\",\n      \"hotelImageUrl\": \"https://www.motel6.com/content/dam/motel6/images/property-photos/NV/las-vegas-east/NVLASVEG001-Exterior-1.jpg\",\n      \"price\": \"$ (check current rates)\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0972,\n        \"longitude\": -115.067\n      },\n      \"rating\": 3.0,\n      \"description\": \"Budget-friendly option located off the Strip, basic but clean.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free outdoor pedestrian mall with live music, light shows, and street performers.\",\n        \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/FremontStreetExperience.jpg/1280px-FremontStreetExperience.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1699,\n          \"longitude\": -115.1402\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.2,\n        \"travelTime\": \"30 mins (taxi/rideshare)\"\n      },\n      {\n        \"placeName\": \"Container Park\",\n        \"placeDetails\": \"Unique shopping and dining area made from repurposed shipping containers.\",\n        \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Container_Park_Las_Vegas_2016.jpg/1280px-Container_Park_Las_Vegas_2016.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1704,\n          \"longitude\": -115.135\n        },\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.0,\n        \"travelTime\": \"15 mins (walk from Fremont Street)\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Las Vegas Strip (walking tour)\",\n        \"placeDetails\": \"Walk the iconic Strip, admiring the hotels and atmosphere.\",\n        \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Las_Vegas_Strip_at_night.jpg/1280px-Las_Vegas_Strip_at_night.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"travelTime\": \"Variable, depending on the walking distance.\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Free choreographed water show with music and lights.\",\n        \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Bellagio_Fountains_show.jpg/1280px-Bellagio_Fountains_show.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1173,\n          \"longitude\": -115.175\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.8,\n        \"travelTime\": \"Short walk from many Strip locations\"\n      }\n\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation south of Las Vegas (requires transportation).\",\n        \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Seven_Magic_Mountains_%28cropped%29.jpg/1280px-Seven_Magic_Mountains_%28cropped%29.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0668,\n          \"longitude\": -114.952\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"travelTime\": \"30-45 mins (taxi/rideshare/rental car)\"\n      },\n       {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"Outdoor museum showcasing vintage Las Vegas signs (entry fee applies).\",\n        \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Neon_Museum_Las_Vegas_2018.jpg/1280px-Neon_Museum_Las_Vegas_2018.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1606,\n          \"longitude\": -115.153\n        },\n        \"ticketPricing\": \"$$ (check current rates)\",\n        \"rating\": 4.3,\n        \"travelTime\": \"20 mins (taxi/rideshare)\"\n      }\n    ]\n  }\n}\n```\n\n**Note:**  Prices are indicated as $, $$, $$$ to represent a relative price range (Cheap, Moderate, Expensive).  You will need to check current pricing for hotels and attractions on booking sites.  Image URLs are examples; you might find better quality images using a search engine.  Travel times are estimates and can vary depending on traffic and mode of transportation.  Ratings are approximations and could fluctuate.  Always double-check details before making your travel plans.\n" },
            ],
        },
    ],
});
