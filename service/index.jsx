const express = require('express');
const app = express();
const uuid = require('uuid');
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bcrypt = require('bcryptjs');

// Create a token for the user and send a cookie containing the token
function setAuthCookie(res, user) {
  user.token = uuid.v4();

  res.cookie('token', user.token, {
    secure: true,
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
  
      res.send({ email: user.email });
    } else {
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
      res.send({ email: user.email });
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

const port = 4000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
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

  setEmail(email) {
    this.email = email;
  }

  setUsername(username) {
    this.username = username;
  }

  setLastEntryDate(lastEntryDate) {
    this.lastEntryDate = lastEntryDate;
  }

  setPoints(points) {
    this.points = points;
  }

  setStreak(streak) {
    this.streak = streak;
  }

  setPassword(password) {
    this.password = password;
  }
}