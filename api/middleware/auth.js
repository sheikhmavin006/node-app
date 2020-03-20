const jwt = require("jsonwebtoken");

/**
 * USE JWT FOR CROSS DOMAIN AND PASSPORT FOR SAME DOMAIN DIFFERENT ORIGIN(PORT)
 */

//jwt
module.exports = (req,res, next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1] //SEND TOKEN in HEADER PRFIX with BERARER <Token>
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next()
    }
    catch(err){
        console.log(res)
        return res.status(401).json({
            message:"Auth failed"
        })
    }
    

};

//passport
// module.exports = (req,res, next)=>{
//     if (req.isAuthenticated()) next();
//     else return res.status(401).json({ message: 'Unauthorized Request' });
// }