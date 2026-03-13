const express = require('express');
const app = express();
const uuid = require('uuid');
app.use(express.json());

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


const users = [];

async function createUser(email, username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User(email, username, null, 0, 0, passwordHash, true);
  users.push(newUser);
  return newUser;
}

function getUser(field, value) {
  if (value) {
    return users.find((user) => user[field] === value);
  }
  return null;
}

// registration
app.post('/api/auth', async (req, res) => {
    if (await getUser('email', req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await createUser(req.body.email, req.body.username, req.body.password);
  
      setAuthCookie(res, user);
  
      res.send({ email: user.email });
    }
  });

// login
app.put('/api/auth', async (req, res) => {
    const user = await getUser('email', req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      setAuthCookie(res, user);
  
      res.send({ email: user.email, username: user.username });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });


app.put('/api/user/updatePoints', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    user.points += req.body.points;
    res.send({ points: user.points });
  }
  else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// logout
app.delete('/api/auth', async (req, res) => {
    const token = req.cookies['token'];
    const user = await getUser('token', token);
    if (user) {
      clearAuthCookie(res, user);
    }
  
    res.send({});
  });
  
  function clearAuthCookie(res, user) {
    delete user.token;
    res.clearCookie('token');
  }

// getMe

app.get('/api/user/me', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);
  if (user) {
    const userInfo = {
      email: user.email,
      username: user.username,
      lastEntryDate: user.lastEntryDate,
      points: user.points,
      streak: user.streak,
    };
    res.status(200).send({ status: 200, data: userInfo });
  } else {
    res.status(401).send({ status: 401, msg: 'Unauthorized' });
  }
});




app.put('/api/user/updateStreak', async (req, res) => {
  const token = req.cookies['token'];
  const user = await getUser('token', token);


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

});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


class User {
  constructor(email, username, lastEntryDate, points, streak, password, loggedIn) {
    this.email = email;
    this.username = username;
    this.lastEntryDate = lastEntryDate;
    this.points = points;
    this.streak = streak;
    this.password = password;
    this.loggedIn = loggedIn;
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