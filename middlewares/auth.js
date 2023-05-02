const jwt = require("jsonwebtoken");
function authMiddle(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decode = jwt.verify(token.split(" ")[1], "masai");
      if (decode) {
        req.body.authorID = decode.authorID;
        next();
      } else {
        res.json({ msg: "Please Login First !!" });
      }
    } catch (err) {
      res.json({ msg: err.message });
    }
  } else {
    res.json({ msg: "Please Login first!!" });
  }
}
module.exports = authMiddle;
