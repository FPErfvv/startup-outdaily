// The following functions handle the transfer of user info

export function updateDBonLogout(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, username = username, "");
    if (user) {
        user.loggedIn = false;
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: 'Logout successful' };
    }
}


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


// The following function handles the retrieval of the leaderboard
export function getLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    return leaderboard;
}

// The following function handles the simulation of the leaderboard, as if it were pulling from a database
export function simulateLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    if (leaderboard.length < 2) {
        leaderboard.push({ username: 'OutDailyPro', points: 1000, streak: 60 });
        leaderboard.push({ username: 'TreeHugger', points: 800, streak: 50 });
        leaderboard.push({ username: 'Bill', points: 300, streak: 20 });
        leaderboard.push({ username: 'BestHiker26', points: 100, streak: 10 });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        return leaderboard;
    }
    return leaderboard;
}

export function updateLeaderboard(username, points, streak) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const user = getUser(leaderboard, username = username, "");
    if (!user) {
        leaderboard.push({ username: username, points: points, streak: streak });
    }
    else {
        user.points = points;
        user.streak = streak;
    }
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    return leaderboard;
}

function getUser(users, username = "", email = "") {
    if (username !== "") {
        return users.find(user => user.username === username);
    }
    else if (email !== "") {
        return users.find(user => user.email === email);
    }
    else {
        return null;
    }
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
