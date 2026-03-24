const express = require('express');
const app = express();
const uuid = require('uuid');
app.use(express.json());
const DB = require('./database.js');

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bcrypt = require('bcryptjs');

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Create a token for the user and send a cookie containing the token
function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function createUser(email, username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User(email, username, null, 0, 0, passwordHash);
  
  DB.addUser(newUser);
  return newUser;
}
 

// registration
app.post('/api/auth', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.username, req.body.password);
  
      setAuthCookie(res, user);
  
      res.send({ email: user.email });
      DB.updateUser(user);
    }
  });

// login
app.put('/api/auth', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      setAuthCookie(res, user);
  
      res.send({ email: user.email, username: user.username });
      DB.updateUser(user);
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

  // logout
app.delete('/api/auth', async (req, res) => {
  const token = req.cookies['token'];
  const user = await DB.getUserByToken(token);
  if (user) {
    clearAuthCookie(res, user);
  }
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies['token']);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};


app.put('/api/user/updatePoints', verifyAuth, (req, res) => {
  req.user.points += req.body.points;
  res.send({ points: req.user.points });
  DB.updateUser(req.user);
});
// getMe

app.get('/api/user/me',verifyAuth, (req, res) => {
  const user = req.user;
  
    const userInfo = {
      email: user.email,
      username: user.username,
      lastEntryDate: user.lastEntryDate,
      points: user.points,
      streak: user.streak,
    };
    res.status(200).send({ status: 200, data: userInfo });
});


app.put('/api/user/updateStreak', verifyAuth, (req, res) => {
  const user = req.user;

  const date = new Date().toISOString();
  const lastEntryDate = user.lastEntryDate;
  if (lastEntryDate === null) {
      user.lastEntryDate = date;
      user.streak = 1;
      res.send({ streak: user.streak });
  } else {
    const lastEntryDateFormatted = lastEntryDate.split('T')[0];
    const dateFormatted = date.split('T')[0]; 
    if (lastEntryDateFormatted === dateFormatted) {
        res.send({ streak: user.streak });
    }
    else if (isConsecutiveDays(lastEntryDateFormatted, dateFormatted)) {
        user.streak += 1;
        user.lastEntryDate = date;
        res.send({ streak: user.streak });
    }
    else {
        user.streak = 1;
        user.lastEntryDate = date;
        res.send({ streak: user.streak });
    }
  }
  DB.updateUser(user);
});

  // get scores
  app.get('/api/scores', async (req, res) => {
    const scores = await DB.getHighScores();
    let scoresArray = [];
    for (const score of scores) {
      scoresArray.push({ username: score.username, points: score.points, streak: score.streak });
    }
    res.status(200).send({ scores: scoresArray });
  });

  
function clearAuthCookie(res, user) {
  
  res.clearCookie('token');
  res.status(204).end();
  DB.updateUserRemoveAuth(user);
}



app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


class User {
  constructor(email, username, lastEntryDate, points, streak, password) {
    this.email = email;
    this.username = username;
    this.lastEntryDate = lastEntryDate;
    this.points = points;
    this.streak = streak;
    this.password = password;
  }


}

// The following function handles the check for consecutive days
function isConsecutiveDays(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1 + 'T00:00:00');  // avoid timezone shifts
  const d2 = new Date(dateStr2 + 'T00:00:00');
  
  const diff = (d2 - d1) / (24 * 60 * 60 * 1000);
  return diff === 1;
}

const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});