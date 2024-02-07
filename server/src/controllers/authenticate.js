const jwt = require('jsonwebtoken')

// Secret key for signing and verifying the JWT
const secretKey = '111111111abc'

// Sample user data
const user = {
  id: 123,
  username: 'john_doe',
  role: 'user'
}

// Create a JWT
const token = jwt.sign(user, secretKey, { expiresIn: '1h' })

console.log('Generated JWT:', token)

// Verify a JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('JWT verification failed:', err.message)
  } else {
    console.log('Decoded JWT:', decoded)
  }
})
