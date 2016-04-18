const Express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = new Express();
const port = process.argv[2] || 8000;
const whitelist = ['http://localhost:3000', 'http://localhost:5000'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
};

var lastSession = undefined; // eslint-disable-line
var counter = 0; // eslint-disable-line

app.use(morgan('dev'));
app.use(cors(corsOptions));

app.post('/signin', (req, res) => {
  lastSession = {
    token: 'ab8926cfe836fe76b46a8c76654343c097',
    validTo: (+new Date() + 3600000),
    created: +new Date(),
  };

  res.json(lastSession);
});

app.post('/me/signout', (req, res) => {
  res.json(lastSession || {});
  lastSession = undefined;
});

app.get('/me/session', (req, res) => {
  if (lastSession) {
    res.json(lastSession);
  } else {
    res.sendStatus(401);
  }
});

app.get('/me', (req, res) => {
  if (lastSession) {
    res.json({
      firstName: 'Thomas',
      lastName: 'Hourlier',
      email: 'thomas.hourlier@cnode.fr',
      isAdmin: true,
    });
  } else {
    res.sendStatus(401);
  }
});

app.get('/counter', (req, res) => {
  res.json({
    counter: 42,
  });
});

app.listen(port, () => console.log(`Api started on port ${port}`)); // eslint-disable-line
