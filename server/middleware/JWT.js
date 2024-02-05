const jwt = require('jsonwebtoken')

const secretKey = 'your_secret_key'

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).send('Access denied. No token provided.')

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Invalid token.')
    req.user = user
    next()
  })
}

// Usage in route
app.get('/secure-route', authenticateToken, (req, res) => {
  // Access granted, user details available in req.user
  res.send('You have access to this secure route.')
})
