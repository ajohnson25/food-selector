class VerifyToken {
  static verifyToken (req: any, res: any, next: any) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')[1]; // Bearers start with the word Bearer plus the token, get the token
      req.token = bearer;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
}
export default VerifyToken;
