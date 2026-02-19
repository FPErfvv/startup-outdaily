const weights = {
    temp: 10,
    cloudConditions: 10,
    chanceOfRain: 20,
    humidity: 2,
    duration: 10
}
export function calculatePoints(weatherInfo, duration) {
    const { temp, cloudConditions, chanceOfRain, humidity } = weatherInfo;
    let points = 0;
    let normalizedTemp = (temp + 10)/50;
    let normalizedChanceOfRain = chanceOfRain/100;
    let normalizedHumidity = humidity/100;
    let normalizedCloudConditions = cloudConditions / 100;
    let normalizedDuration = duration / 60;

    points += normalizedCloudConditions * weights.cloudConditions;
    points += normalizedTemp * weights.temp;
    points += normalizedChanceOfRain * weights.chanceOfRain;
    points += normalizedHumidity * weights.humidity;
    points += normalizedDuration * weights.duration;
    return Math.round(points);
}