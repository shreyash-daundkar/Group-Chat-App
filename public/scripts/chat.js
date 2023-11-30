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
axios.defaults.headers.common['authorization'] = token;



// get chats

window.addEventListener('DOMContentLoaded', loadChats);
async function loadChats() {
    setInterval(async () => {
        const { data: { data }} = await axios.get(host+ '/chat');
        chatBox.innerHTML = '';
        data.forEach(chat => addChat(chat));
    }, 1000);
}


//send chat 

sendChatBtn.addEventListener('click', async e => {
    e.preventDefault();
    const message = chatInput.value;
    if(message) {
        try {
            const res = await axios.post(host + '/chat', { message });
            if(res.data.success) {
                addChat({ username: 'You', message, isCurrUser: true });
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
});

// utility 

function addChat(chat) {
    let { username , message, isCurrUser } = chat;
    const div = document.createElement('div');
    div.classList.add('message');
    if(isCurrUser) {
        username = 'You';
        div.classList.add('user2');
    } else {
        div.classList.add('user1');
    }
    div.innerHTML = `<p><strong>${username}: </strong>${message}</p>`
    chatBox.append(div);
}