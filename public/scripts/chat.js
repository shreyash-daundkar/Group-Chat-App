const host = 'http://localhost:4000';




const chatBox = document.querySelector('.chat-box');
const groupList = document.querySelector('#group-list');
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
if (token) {
    axios.defaults.headers.common['authorization'] = token;
} else {
    window.location.href = 'login.html';
}




//get chats

let selectedGroupId;

groupList.addEventListener('click', loadChats);
async function loadChats(e) { 

    if(!e.target.classList.contains('list-group-item')) return;

    const groupItems = document.querySelectorAll('#group-list .list-group-item');
    groupItems.forEach(item => item.classList.remove('active'));

    const selectedGroup = e.target;
    selectedGroup.classList.add('active');

    selectedGroupId = selectedGroup.getAttribute('groupid');
    
    let lastMsgId = 0;

    localStorage.setItem('chats', JSON.stringify([]));

    setInterval(async () => {

        const { data: { data }} = await axios.get(host+ `/chat?groupId=${selectedGroupId}&lastMsgId=${lastMsgId}`);
        storeToLocalStorage(data);

        const chats = JSON.parse(localStorage.getItem('chats'));
        if(chats.length !== 0) {
            lastMsgId = chats[ chats.length - 1 ].id;
        }

        chatBox.innerHTML = '';
        chats.forEach(chat => addChat(chat));

    }, 3000);
}

function storeToLocalStorage(data) {
    const chats = JSON.parse(localStorage.getItem('chats'));
    while(data.length !== 0) {
        if(chats.length >= 10) chats.shift();
        chats.push(data.shift());
    }
    localStorage.setItem('chats', JSON.stringify(chats));
}

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
 



//send chat 

sendChatBtn.addEventListener('click', async e => {
    e.preventDefault();
    const message = chatInput.value;
    if(message) {
        try {
            const res = await axios.post(host + `/chat?groupId=${selectedGroupId}`, { message });
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
});