const authenticateUser = (req, res, next) => {
    const secret = req.headers['authorization']; // sent from front-end
    if(secret === process.env.SECRET_KEY){
        next();
    } else {
        res.status(403).json({ error: "Access denied. Invalid secret key."})
    }
    // write any code
    // modify req ews obj
    // end req res cycle
    // call next middleware
}



module.exports = authenticateUser;