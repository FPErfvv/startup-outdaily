// The following functions handle the transfer of user info


export async function getUsername(email) {
    const res = await fetch('/api/user/me', {
        method: 'GET',
      });
      
      if (res.ok) {
        console.log(res);
        const data = await res.json();
        return data.username;
      } else {
        console.log(res);
        return null;
      }
}


export async function getUserInfo() {
    const res = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
      });
    return await res.json();
}

export async function getCoordinates(cityName) {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
    );
    const data = await res.json();
    if (!data.results?.length) return null;
    return {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
}

export async function getWeather(lat, lon) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,cloud_cover,precipitation`
    );
    const data = await res.json();
    console.log("data: ", data);
    return data;
}
