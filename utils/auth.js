const crypto = require('crypto');

const createPass = (password) =>{
    let seed = crypto.randomBytes(32).toString('hex');
    let genHash = crypto
        .pbkdf2Sync(password, seed, 10000, 64, 'sha512')
        .toString('hex');
     return {
        salt: seed, 
        hash: genHash,
    };
};

const validatePass = (password, hash, salt)=>{
    let hashVerify =  crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hashVerify === hash;
};

module.exports ={
    createPass,
    validatePass,
}
