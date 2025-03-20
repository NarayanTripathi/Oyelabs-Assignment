import jwt from "jsonwebtoken";


export const authUser = (req, res, next) => {
    // 1. Get token from cookies:
    const token = req.cookies.token;  
  
    // 2. If token is missing, block access:
    if (!token) {
      return res.status(401).json({ error: "Not authorized, token missing." });
    }
  
    try {
      // 3. Verify the token:
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // 4. Attach the user ID from the decoded token to the request object:
      req.user = decoded.userId;
  
      // 5. Allow the request to move forward to the actual route handler:
      next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: "Token invalid or expired." });
    }
  };
  