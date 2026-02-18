const weights = {
    temp: 10,
    cloudConditions: 10,
    chanceOfRain: 10,
    humidity: 10
}
export function calculatePoints(weatherInfo) {
    const { temp, cloudConditions, chanceOfRain, humidity } = weatherInfo;
    let points = 0;
    points += temp * 10;
    points += cloudConditions * 10;
    points += chanceOfRain * 10;
    points += humidity * 10;
    return points;
}