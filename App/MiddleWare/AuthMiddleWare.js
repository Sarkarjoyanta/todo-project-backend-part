import {TokenDecoded} from "../Utility/TokenUtility.js";

export default (req, res, next) =>{
    let token = req.headers['token'];
    let decoded = TokenDecoded(token);
    if(decoded === null){
        return res.status(403).json('Unauthorized');
    }else {
        let email = decoded.email;
        let user_id = decoded.user_id;
        req.headers.email = email;
        req.headers.user_id = user_id;
        next()
    }
}