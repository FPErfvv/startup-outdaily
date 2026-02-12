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
        users.push({ username, email, password });
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