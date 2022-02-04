const User = require('../users/model')

async function validateLogin (req, res, next) {
  const {username, password} = req.body
  if (username) {
    const user = await User.getUserByUsername(username)
    try {
      if (!user || password !== user.password) {
        return res.status(401).json({ error: 'Incorrect credentials' });
      } else {
        req.user = {
          username: user.username,
          user_id: user.user_id
        }
        next()
      }
    } catch (error){
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json({ error: 'username required' });
  }

}

async function validateRegister (req, res, next) {
  const {username, password} = req.body
  if (username) {
    const user = await User.getUserByUsername(username)
    try {
      if (user) {
        return res.status(401).json({ error: 'Username taken' });
      } else { 
        return next()
      }
    } catch (error){
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json({ error: 'username required' });
  }
}

module.exports = {
    validateLogin,
    validateRegister
}  