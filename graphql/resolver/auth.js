const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existedUser = await User.findOne({ email: args.userInput.email });
      if (existedUser) {
        throw new Error("User exists already");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password,keepLogin }, req) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    let token
    if(keepLogin){
      token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesecretkey",
        { expiresIn: "144h", algorithm: "HS256" }
      );
      return { userId: user.id, token: token, tokenExpiration: 144 };
    }else{
      token = jwt.sign(
        { userId: user.id, email: user.email },
        "somesecretkey",
        { expiresIn: "6h", algorithm: "HS256" }
      );
      return { userId: user.id, token: token, tokenExpiration: 6 };
    }
    
    
    
  },
  authAsAdmin: async (_, req) => {
    const authHeader = req.get("Authorization");
    console.log(authHeader)
    
    if (!authHeader) {
      console.log("error1")
      req.isAuth = false;
      return false
    }

    const token = authHeader;

    if (!token || token === "") {
      req.isAuth = false;
      return false
    }
    let decodedToken;
    try {
   
      decodedToken = jwt.verify(token, "somesecretkey");
      console.log(decodedToken)
   
    } catch (err) {
      req.isAuth = false;
      return false
    }
   
    if (!decodedToken) {
      req.isAuth = false;
      return false
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    return true
  }
};
