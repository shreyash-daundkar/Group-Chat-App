exports.signupValidation = (req, res, next) => {  
    try {
        const { username, email, password } = req.body;
        
        let error = usernameValidation(username) || passwordValidation(password) || emailValidation(email);
        if (error) {
            return res.status(400).json({ message: error, success: false });
        }

        next()  
    } catch (error) {
        next(error);
    }  
}

exports.loginValidation = (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        let error = emailValidation(email) || passwordValidation(password);
        if (error) {
            return res.status(400).json({ message: error, success: false });
        }
        
        next();
    } catch (error) {
        next(error);
    }
}


exports.passwordValidation = (req, res, next) => {
    try {
        const { password } = req.body;
        
        let error = passwordValidation(password);
        if (error) {
            return res.status(400).json({ message: error, success: false });
        }
        
        next();
    } catch (error) {
        next(error);
    }
}


function usernameValidation(username) {
    return username ? null : 'Username is required';
}

function passwordValidation(password) {
    return password.length >= 8 ? null : 'Password must be at least 8 characters';
}

function emailValidation(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email) ? null : 'Invalid email';
}