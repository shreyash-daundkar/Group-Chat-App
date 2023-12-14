const bcrypt = require('bcrypt');

exports.hashPassword = password => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (error, hash) => {
            if(error) reject(error);
            resolve(hash);
        });
    });
}

exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
}