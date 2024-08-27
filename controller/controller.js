const User = require('../model/User'); // Adjust the path as necessary

// Signup function
exports.signup = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login function (Example implementation)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all users function
exports.getUsers = async (req, res) => {
  try {
    const { search = '', role = '' } = req.query;

    let query = {};

    if (role) {
      query.role = role;
    }

    if (search) {
      query = {
        ...query,
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
