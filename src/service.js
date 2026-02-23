// The following functions handle the transfer of user info
export function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, "", email = email);
    if (user) {
        if (password === user.password) {
            updateLeaderboard(user.username, user.points, user.streak);
            user.loggedIn = true;
            localStorage.setItem('users', JSON.stringify(users));
            return { success: true, message: 'Login successful' };
        } else {
            return { success: false, message: 'Password is incorrect' };
        }   
    }
    return { success: false, message: 'Email or password is incorrect or does not exist' };
}

export function handleLogout(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, username = username, "");
    if (user) {
        user.loggedIn = false;
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: 'Logout successful' };
    }
}

export function handleRegister(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (getUser(users, username = username)) {
        return { success: false, message: 'Username already exists' };
    } else if (getUser(users, email = email)) {
        return { success: false, message: 'Email already exists' };
    } else {
        let newUser = { username, email, password, streak: 0, points: 0, lastEntryDate: null, loggedIn: true };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard(username, 0, 0);
        return { success: true, message: 'Registration successful' };
    }
}

export function getEmail(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return getUser(users, username = username, "").email;
}

export function getPassword(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return getUser(users, username = username, "").password;
}

export function getUsername(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);
    return getUser(users, "", email = email).username;
}

export function getStreak(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, username = username, "");
    if (!user) {
        return 0;
    }
    else if (!user.streak) {
        return 0;
    }
    return user.streak;
}

export function getPoints(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, username = username, "");
    if (!user) {
        return 0;
    } else if (!user.points) {
        return 0;
    }
    return user.points;
}

// The following functions handle the update of user info
export function updateStreak(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, username = username, "");
    if (!user) {
        return 0;
    }
    const date = new Date().toISOString();
    const lastEntryDate = user.lastEntryDate;
    if (lastEntryDate === null) {
        user.lastEntryDate = date;
        user.streak = 1;
        localStorage.setItem('users', JSON.stringify(users));
        return user.streak;
    }
    const lastEntryDateFormatted = lastEntryDate.split('T')[0];
    const dateFormatted = date.split('T')[0]; 
    if (lastEntryDateFormatted === dateFormatted) {
        return user.streak;
    }
    else if (isConsecutiveDays(lastEntryDateFormatted, dateFormatted)) {
        user.streak += 1;
        user.lastEntryDate = date;
        localStorage.setItem('users', JSON.stringify(users));
        return user.streak;
    }
    else {
        user.streak = 1;
        user.lastEntryDate = date;
        localStorage.setItem('users', JSON.stringify(users));
        return user.streak;
    }
}

// The following function handles the check for consecutive days
function isConsecutiveDays(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1 + 'T00:00:00');  // avoid timezone shifts
    const d2 = new Date(dateStr2 + 'T00:00:00');
    
    const diff = (d2 - d1) / (24 * 60 * 60 * 1000);
    return diff === 1;
}

// The following function handles the update of points
export function updatePoints(username, delta) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = getUser(users, username = username, "");
    if (!user) {
        return 0;
    }
    user.points += delta;
    localStorage.setItem('users', JSON.stringify(users));
    return user.points;
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
