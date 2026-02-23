import React from 'react';
import "./entry.css"
import { useUser } from '../UserContext';
import { getStreak, getPoints, updateStreak, updatePoints, updateLeaderboard } from '../service';
import { calculatePoints } from '../weatherCalculator';
import { useNavigate } from 'react-router-dom';
export function Entry() {
    const [weatherInfo, setWeatherInfo] = React.useState(["Loading...","Loading...","Loading...","Loading..."]); // Temp, cloud conditions, chance of rain, humidity
    const [entry, setEntry] = React.useState({title: "", date: "", duration: "", location: "", description: ""});
    const [weatherImageUrl, setWeatherImageUrl] = React.useState("Loading...");
    const { userName } = useUser();
    const { streak, setStreak } = useUser();
    const { points, setPoints } = useUser();
    const {alertMessage, setAlertMessage} = useUser();
    const { currentPage } = useUser();
    const navigate = useNavigate();
    const weatherState = {
        "sunny": "images/weather/few.png",
        "scattered": "images/weather/sct.png",
        "cloudy": "images/weather/bkn.png",
        "nightCloudy": "images/weather/nbkn.png",
        "nightClear": "images/weather/nfew.png",
        "nightScattered": "images/weather/nsct.png"
    }
    React.useEffect(() => {
        setWeatherInfo([75,"sunny",5,40]);
    },[])
    React.useEffect(() => {
        setWeatherImageUrl(weatherState[weatherInfo[1]]);
    },[weatherInfo])
    React.useEffect(() => {
        const streak = getStreak(userName);
        setStreak(streak);
    },[userName])
    React.useEffect(() => {
        const points = getPoints(userName);
        setPoints(points);
    },[userName])


    function updatePointsAndStreak(points) {
        let newStreak = updateStreak(userName);
        let newPoints = updatePoints(userName, points);
        setStreak(newStreak);
        setPoints(newPoints);
        console.log("newStreak: ", newStreak);
        console.log("newPoints: ", newPoints);
        updateLeaderboard(userName, newPoints, newStreak);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (entry.location in weatherAPISimulator) { 
        const weatherInfo = weatherAPISimulator[entry.location];

        if (weatherInfo) {
            if (weatherInfo.cloudConditions > 75) {
                setWeatherInfo([weatherInfo.temp, "cloudy", weatherInfo.chanceOfRain, weatherInfo.humidity]);
            } else if (weatherInfo.cloudConditions < 25) {
                setWeatherInfo([weatherInfo.temp, "sunny", weatherInfo.chanceOfRain, weatherInfo.humidity]);
            } else {
                setWeatherInfo([weatherInfo.temp, "scattered", weatherInfo.chanceOfRain, weatherInfo.humidity]);
            }
            updatePointsAndStreak(calculatePoints(weatherInfo, entry.duration));
        }
        else {
            setAlertMessage("Weather information not found");
        }
    }
    else {
        setAlertMessage("Location not found. Please enter a valid location. The following locations are available: " + Object.keys(weatherAPISimulator).join(", "));
    }
    }

    const weatherAPISimulator = {
        /**
         * temp: Celsius
         * cloudConditions: 0-100 percent
         * chanceOfRain: 0-100 percent
         * humidity: 0-100 percent
         */
        "Provo": {
            "temp": 25,
            "cloudConditions": 50,
            "chanceOfRain": 50,
            "humidity": 20
        },
        "Salt Lake City": {
            "temp": 20,
            "cloudConditions": 100,
            "chanceOfRain": 80,
            "humidity": 50
        },
        "Las Vegas": {
            "temp": 30,
            "cloudConditions": 50,
            "chanceOfRain": 50,
            "humidity": 50
        }
    }
  return (
        <main className="container-fluid px-0 flex-grow-1 flex-shrink-1">
            <div className="d-flex flex-column flex-md-row align-items-stretch flex-grow-1 flex-shrink-1 overflow-hidden">
                <div className="flex-fill col-md-10 overflow-auto ps-5">
                    <h2 className="text-center my-3">Welcome: {userName}</h2>
                    <div className="text-center">
                        <p className="d-inline m-2 fs-5 bg-success bg-opacity-25 p-2 rounded-2">Streak: {streak} days</p>
                        <p className="d-inline m-2 fs-5 bg-success bg-opacity-25 p-2 rounded-2" id="points"><span title="The points are calculated based off of a variety of factors, including the current streak, the length of time spent outside, the current temperature, etc.">Points: {points}</span></p> 
                    </div>

                    <section> 
                        <fieldset className="border border-2 mt-5 me-5 shadow">
                            <legend className="text-center bg-success bg-opacity-50">New Entry</legend>
                            <form className="px-4 py-3" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="entryTitle" className="form-label">Entry Title</label>
                                    <input type="text" className="form-control" id="entryTitle" name="entryTitle" placeholder="Title" required onChange={(e)=>(setEntry({...entry, title: e.target.value}))}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="entryDuration" className="form-label">Entry Duration (minutes)</label>
                                    <input type="number" className="form-control" id="entryDuration" name="entryDuration" min="1" required onChange={(e)=>(setEntry({...entry, duration: e.target.value}))}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Entry location </label>
                                    <input type="text" className="form-control" id="location" name="location" placeholder="Location" onChange={(e)=>(setEntry({...entry, location: e.target.value}))}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="entryDescription" className="form-label">Entry Description (optional)</label>
                                    <textarea id="entryDescription" className="form-control" name="entryDescription" rows="4" placeholder="How was your experience out in nature? What did you see?" onChange={(e)=>(setEntry({...entry, description: e.target.value}))}></textarea>
                                </div>
                                
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success">Submit Entry</button>
                                </div>
                            </form>
                        </fieldset>
                    </section>
                    <section>
                        <fieldset className="border border-2 my-5 me-5 shadow">
                            <legend className="text-center bg-primary bg-opacity-50">Current Weather</legend>
                            <div className="d-flex mb-2">
                                <img src={weatherImageUrl} alt="Representation of what the current day would look like" className="flex-column flex-fill ms-2 rounded-2"/>
                                <div className="flex-column flex-fill">
                                    <div className="temp ms-4">
                                        {weatherInfo[0]} <span>&#176;</span>
                                    </div>
                                    <div className="ms-4 display-6 my-2">
                                        {weatherInfo[1]}
                                    </div>
                                    <div className="ms-4">
                                        Chance of rain: {weatherInfo[2]}%
                                    </div>
                                    <div className="ms-4">
                                        Humidity: {weatherInfo[3]}%
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </section>
                </div>
                <div className="flex-fill d-flex ">
                    <div className="h-100 flex-grow-0" id="vertical-carousel">
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/weatherpic.jpeg" alt="Picture overlooking the foliage of a green forest"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/beach.webp" alt="Picture overlooking a beach"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/wheattree.webp" alt="Picture looking at a field of yellow wheat with a tree in the middle"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/mountains.jpg" alt="Picture with a forest with mountains in the background"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/waterfall.png" alt="Picture of a waterfall"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/image1.jpg" alt="Picture of a pond with a forested mountain in the background"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/image2.jpg" alt="Picture of a leaf touching water"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/image3.jpg" alt="Picture of the sun setting on the beach"/>
                        </div>
                        <div className="vertical-carousel-slide">
                            <img src="images/carousel/image4.jpg" alt="Picture of a rainbow crossing the horizon over the ocean"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  );
}