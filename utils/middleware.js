// Middleware to check if user is logged in (JWT verification)
// const isLoggedIn = (req, res, next) => {
//     const authHeader = req.headers.authorization;
  
//     if (!authHeader) {
//       return res.status(401).send('No token provided');
//     }
  
//     const token = authHeader.split(' ')[1];
  
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).send('Invalid or expired token');
//       }
//       req.user = decoded; // Attach user info from token to request
//       next();
//     });
// 


const  authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


export default authenticateToken ;