import React from 'react';
import "./entry.css"
import { useUser } from '../UserContext';
import { updateLeaderboard, getCoordinates, getWeather } from '../service';
import { calculatePoints } from '../weatherCalculator';
import { useNavigate } from 'react-router-dom';
export function Entry() {
    const [weatherInfo, setWeatherInfo] = React.useState(["Loading...","Loading...","Loading...","Loading..."]); // Temp, cloud conditions, chance of rain, humidity
    const [entry, setEntry] = React.useState({title: "", date: "", duration: "", location: "", description: ""});
    const [weatherImageUrl, setWeatherImageUrl] = React.useState("Loading...");
    const { username, setStreak, setPoints, setAlertMessage, streak, points } = useUser();

    const weatherState = {
        "sunny": "images/weather/few.png",
        "scattered": "images/weather/sct.png",
        "cloudy": "images/weather/bkn.png",
        "nightCloudy": "images/weather/nbkn.png",
        "nightClear": "images/weather/nfew.png",
        "nightScattered": "images/weather/nsct.png"
    }

    React.useEffect(() => {
        setWeatherImageUrl(weatherState[weatherInfo[1]]);
    },[weatherInfo])




      async function updatePoints(points) {
        const res = await fetch('/api/user/updatePoints', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ points }),
        });
        const data = await res.json();
        console.log("data: ", data);
        return data.points;
      }

      async function updateStreak() {
        const res = await fetch('/api/user/updateStreak', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log("data: ", data);
        return data.streak;
      }


    async function updatePointsAndStreak(points) {
        let newStreak = await updateStreak();
        let newPoints = await updatePoints(points);
        console.log("POINTS: ", points);
        setStreak(newStreak);
        setPoints(newPoints);
        console.log("newStreak: ", newStreak);
        console.log("newPoints: ", newPoints);
        updateLeaderboard(username, newPoints, newStreak);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const coordinates = await getCoordinates(entry.location);
        console.log("coordinates: ", coordinates);
        if (coordinates === null) {
            setAlertMessage("Location not found");
            return;
        }
        const weather = await getWeather(coordinates.lat, coordinates.lon);
        
        console.log("temperature: ", weather.current.temperature_2m);
        console.log("cloudConditions: ", weather.current.cloud_cover);
        console.log("chanceOfRain: ", weather.current.precipitation);
        console.log("humidity: ", weather.current.relative_humidity_2m);
        if (weather.current) {
            if (weather.current.cloud_cover > 75) {
                setWeatherInfo([weather.current.temperature_2m, "cloudy", weather.current.precipitation, weather.current.relative_humidity_2m]);
            } else if (weather.current.cloud_cover < 25) {
                setWeatherInfo([weather.current.temperature_2m, "sunny", weather.current.precipitation, weather.current.relative_humidity_2m]);
            } else {
                setWeatherInfo([weather.current.temperature_2m, "scattered", weather.current.precipitation, weather.current.relative_humidity_2m]);
            }
            const durationMinutes = Number(entry.duration) || 0;
            await updatePointsAndStreak(calculatePoints(weather.current, durationMinutes));
            setEntry({title: "", date: "", duration: "", location: "", description: ""});
        }
        else {
            setAlertMessage("Weather information not found");
        }
    }

  return (
        <main className="container-fluid px-0 flex-grow-1 flex-shrink-1">
            <div className="d-flex flex-column flex-md-row align-items-stretch flex-grow-1 flex-shrink-1 overflow-hidden">
                <div className="flex-fill col-md-10 overflow-auto ps-5">
                    <h2 className="text-center my-3">Welcome: {username}</h2>
                    <div className="text-center">
                        <p className="d-inline m-2 fs-5 bg-success bg-opacity-25 p-2 rounded-2">Streak: {streak} days</p>
                        <p className="d-inline m-2 fs-5 bg-success bg-opacity-25 p-2 rounded-2" id="points"><span title="The points are calculated based off of a variety of factors, including the current streak, the length of time spent outside, the current temperature, etc.">Points: {points}</span></p> 
                    </div>

                    <section> 
                        <fieldset className="border border-2 mt-5 me-5 shadow">
                            <legend className="text-center bg-success bg-opacity-50">New Entry</legend>
                            <form className="px-4 py-3" onSubmit={async (event) => await handleSubmit(event)}>
                                <div className="mb-3">
                                    <label htmlFor="entryTitle" className="form-label">Entry Title</label>
                                    <input type="text" className="form-control" id="entryTitle" name="entryTitle" placeholder="Title" value={entry.title} required onChange={(e)=>(setEntry({...entry, title: e.target.value}))}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="entryDuration" className="form-label">Entry Duration (minutes)</label>
                                    <input type="number" className="form-control" id="entryDuration" name="entryDuration" min="1" value={entry.duration} required onChange={(e)=>(setEntry({...entry, duration: e.target.value}))}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Entry location </label>
                                    <input type="text" className="form-control" id="location" name="location" placeholder="Location" value={entry.location} onChange={(e)=>(setEntry({...entry, location: e.target.value}))}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="entryDescription" className="form-label">Entry Description (optional)</label>
                                    <textarea id="entryDescription" className="form-control" name="entryDescription" rows="4" placeholder="How was your experience out in nature? What did you see?" value={entry.description} onChange={(e)=>(setEntry({...entry, description: e.target.value}))}></textarea>
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
                            {weatherInfo[0] === "Loading..." ? <p className="text-center py-5">Loading...</p> : (
                            <div className="d-flex mb-2">
                                <img src={weatherImageUrl} alt="Representation of what the current day would look like" className="flex-column flex-fill ms-2 rounded-2"/>
                                <div className="flex-column flex-fill">
                                    <div className="temp ms-4">
                                        {weatherInfo[0]} <span>&#176; C</span>
                                    </div>
                                    <div className="ms-4 display-6 my-2">
                                        {weatherInfo[1].charAt(0).toUpperCase() + weatherInfo[1].slice(1)}
                                    </div>
                                    <div className="ms-4">
                                        Chance of rain: {weatherInfo[2]}%
                                    </div>
                                    <div className="ms-4">
                                        Humidity: {weatherInfo[3]}%
                                    </div>
                                    </div>
                                </div>
                            )}
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