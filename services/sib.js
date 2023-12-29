const Sib = require('sib-api-v3-sdk');



exports.sendMail = async options => {
    try {
        const { email, forgetPasswordId } = options; 
    
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.SIB_API;
        
        const transEmailApi = new Sib.TransactionalEmailsApi();
    
        const sender = {
            email: process.env.SIB_SENDER_EMAIL,
            name: process.env.SIB_SENDER_NAME,
        }
    
        const receivers = [ { email } ];

        await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forget Password',
            textContent: `http://${process.env.HOST}/reset-password.html?id=${forgetPasswordId}`,
        });  

        return;
    } catch (error) {
        throw error; 
    }

}