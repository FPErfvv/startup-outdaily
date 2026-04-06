const weights = {
    temp: 10,
    cloud_cover: 10,
    precipitation: 20,
    relative_humidity_2m: 2,
    duration: 30
}
export function calculatePoints(weatherInfo, duration) {
    duration = duration > 120 ? 120 : duration;
    const { temperature_2m, cloud_cover, precipitation, relative_humidity_2m } = weatherInfo;
    let points = 0;
    let normalizedTemp = (parseFloat(temperature_2m) + 10)/50;
    let normalizedPrecipitation = parseFloat(precipitation)/100;
    let normalizedRelative_humidity_2m = parseFloat(relative_humidity_2m) / 100;
    let normalizedCloud_cover = parseFloat(cloud_cover) / 100;
    let normalizedDuration = duration / 60;

    console.log("normalizedTemp: ", normalizedTemp);
    console.log("normalizedCloudConditions: ", normalizedCloud_cover);
    console.log("normalizedChanceOfRain: ", normalizedPrecipitation);
    console.log("normalizedHumidity: ", normalizedRelative_humidity_2m);
    console.log("normalizedDuration: ", normalizedDuration);

    points += normalizedCloud_cover * weights.cloud_cover;
    points += (1/normalizedTemp) * weights.temp;
    points += normalizedPrecipitation * weights.precipitation;
    points += normalizedRelative_humidity_2m * weights.relative_humidity_2m;
    points += normalizedDuration * weights.duration;
    return Math.round(points);
}