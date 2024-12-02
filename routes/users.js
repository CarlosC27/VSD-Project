import express from 'express';
import models from '../models.js'; 
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = new models.User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await models.User.findOne({ email, password });
    if (user) {
      res.cookie('userId', user._id, { httpOnly: true }); 
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/me', async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await models.User.findById(userId);
    if (user) {
      res.status(200).json({ firstName: user.firstName });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateMinutes', async (req, res) => {
  const userId = req.cookies.userId;
  const { appleMusic, spotify, youtube } = req.body;

  if (!userId || appleMusic == null || spotify == null || youtube == null) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const updatedUser = await models.User.findByIdAndUpdate(
      userId,
      {
        'musicMinutes.appleMusic': appleMusic,
        'musicMinutes.spotify': spotify,
        'musicMinutes.youtube': youtube,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const allUsers = await models.User.find({});
    const averages = allUsers.map(user => ({
      userId: user._id,
      average:
        (user.musicMinutes.appleMusic +
          user.musicMinutes.spotify +
          user.musicMinutes.youtube) /
        3,
    }));

    averages.sort((a, b) => b.average - a.average);


    for (let i = 0; i < averages.length; i++) {
      await models.User.findByIdAndUpdate(averages[i].userId, {
        queueSpot: i + 1, 
      });
    }

    res.status(200).json({ message: 'Minutes updated and queue recalculated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/queueSpot', async (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const user = await models.User.findById(userId);
    if (user) {
      res.status(200).json({ queueSpot: user.queueSpot });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
