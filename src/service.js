export function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        if (password === users.find(user => user.email === email).password) {
            return { success: true, message: 'Login successful' };
        } else {
            return { success: false, message: 'Password is incorrect' };
        }   
    }
    return { success: false, message: 'Email or password is incorrect or does not exist' };
}

export function handleRegister(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        return { success: false, message: 'Username already exists' };
    } else if (users.find(user => user.email === email)) {
        return { success: false, message: 'Email already exists' };
    } else {
        const date = new Date();
        console.log("username: ", username, "email: ", email, "password: ", password, "date: ", date);
        let newUser = { username, email, password, streak: 0, points: 0, lastEntryDate: null };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true, message: 'Registration successful' };
    }
}

export function getEmail(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === username).email;
}

export function getPassword(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.username === username).password;
}

export function getUsername(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);
    return users.find(user => user.email === email).username;
}

export function getStreak(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(user => user.username === username)) {
        return 0;
    }
    else if (!users.find(user => user.username === username).streak) {
        return 0;
    }
    console.log("streak: ", users.find(user => user.username === username).streak);
    console.log("username: ", username);
    return users.find(user => user.username === username).streak;
}

export function getPoints(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(user => user.username === username)) {
        return 0;
    } else if (!users.find(user => user.username === username).points) {
        return 0;
    }
    console.log("points: ", users.find(user => user.username === username).points);
    console.log("username: ", username);
    return users.find(user => user.username === username).points;
}

function updateStreak(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(user => user.username === username)) {
        return false;
    }
    const date = new Date().toISOString();
    const lastEntryDate = users.find(user => user.username === username).lastEntryDate;
    if (lastEntryDate === null) {
        users.find(user => user.username === username).lastEntryDate = date;
        users.find(user => user.username === username).streak = 1;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    const lastEntryDateFormatted = lastEntryDate.split('T')[0];
    const dateFormatted = date.split('T')[0];
    console.log("lastEntryDateFormatted: ", lastEntryDateFormatted);
    console.log("dateFormatted: ", dateFormatted);
    console.log("isConsecutiveDays: ", isConsecutiveDays(lastEntryDateFormatted, dateFormatted));   

    if (isConsecutiveDays(lastEntryDateFormatted, dateFormatted)) {
        users.find(user => user.username === username).streak += 1;
        users.find(user => user.username === username).lastEntryDate = date;
    }
    else {
        users.find(user => user.username === username).streak = 0;
        users.find(user => user.username === username).lastEntryDate = date;
    }
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function isConsecutiveDays(dateStr1, dateStr2) {
    const d1 = new Date(dateStr1 + 'T00:00:00');  // avoid timezone shifts
    const d2 = new Date(dateStr2 + 'T00:00:00');
    
    const diff = (d2 - d1) / (24 * 60 * 60 * 1000);
    return diff === 1;
  }
console.log("isConsecutiveDays: ", isConsecutiveDays("2026-02-18", "2026-02-20"));
function updatePoints(username, delta) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.find(user => user.username === username)) {
        return false;
    }
    users.find(user => user.username === username).points += delta;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

export function updateUser(username, pointsDelta) {
    updateStreak(username);
    updatePoints(username, pointsDelta);
}