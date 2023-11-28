const host = 'http://localhost:4000';

const chatBox = document.querySelector('.chat-box');
const sendChatBtn = document.querySelector('#send-chat-btn');
const chatInput = document.querySelector('#chat-input');


// authenticate

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  
const token = getCookie('token');
console.log(token)
axios.defaults.headers.common['authorization'] = token;



// get chats

axios.get(host+ '/chat').then(response => console.log(response));
//console.log(chats);

const chats = [
    {
        id: 1,
        userId: 1,
        username: 'ram',
        message: 'Hi'
    },
    {
        id: 2,
        userId: 2,
        username: 'sham',
        message: 'Hello'
    },
]

window.addEventListener('DOMContentLoaded', () => {
    chatBox.innerHTML = '';
    chats.forEach(chat => addChat(chat));
});

function addChat(chat) {
    const { username , message } = chat;
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p><strong>${username}: </strong>${message}</p>`
    chatBox.append(div);
}

console.log(sendChatBtn, chatInput)
sendChatBtn.addEventListener('click', async e => {
    e.preventDefault();
    const message = chatInput.value;
    if(message) {
        try {
            //const res = await axios.post(host + '/chat', { message });
            const res = { success: true };
            if(res.success) {
                console.log(message)
                addChat({ username: 'You', message });
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
});

