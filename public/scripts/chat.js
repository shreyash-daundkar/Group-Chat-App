const host = 'http://localhost:4000';

const socket = io(host);



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



groupList.addEventListener('click', (e) => {
    if(e.target.classList.contains('list-group-item')) loadChats(e);
    if(e.target.classList.contains('edit')) editGroup(e);
    if(e.target.classList.contains('delete')) deleteGroup(e);
});

//get chats

let selectedGroupId;

async function loadChats(e) { 

    const groupItems = document.querySelectorAll('#group-list .list-group-item');
    groupItems.forEach(item => item.classList.remove('active'));

    const selectedGroup = e.target;
    selectedGroup.classList.add('active');

    selectedGroupId = selectedGroup.getAttribute('groupid');
    
    let lastMsgId = 0;

    localStorage.setItem('chats', JSON.stringify([]));

    //setInterval(async () => {

        const { data: { data }} = await axios.get(host+ `/chat?groupId=${selectedGroupId}&lastMsgId=${lastMsgId}`);
        storeToLocalStorage(data);

        const chats = JSON.parse(localStorage.getItem('chats'));
        if(chats.length !== 0) {
            lastMsgId = chats[ chats.length - 1 ].id;
        }

        chatBox.innerHTML = '';
        chats.forEach(chat => addChat(chat));

    //}, 3000);
}

function storeToLocalStorage(data) {
    const chats = JSON.parse(localStorage.getItem('chats'));
    while(data.length !== 0) {
        if(chats.length >= 10) chats.shift();
        //if(chats.length === 0 || data[0].id !== chats[chats.length - 1].id) {
            chats.push(data.shift());
        //} else {
        //     data.shift();
        // }
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
            chatInput.value = '';
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
});




// get groups

window.addEventListener('DOMContentLoaded', () => {
    loadGroups();
});

async function loadGroups() { 
    try {
        const { data: { data } } = await axios.get(host + '/group');
        groupList.innerHTML = '';
        data.forEach(group => addGroup(group));
    } catch (error) {
        console.log(error);
    }
}

function addGroup(group) {
    const { id, name, isAdmin} = group;
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = isAdmin
         ? `<span>${name}</span>
         <button class="btn btn-sm float-right btn-danger ml-2 delete">X</button>
         <button class="btn btn-sm float-right btn-warning ml-2 edit">Edit</button>`
         : `<span>${name}</span>`;
    li.setAttribute('groupId', id);
    groupList.append(li);
}




//create & edit group

let editGroupId = null;

async function editGroup(e) {
    editGroupId = e.target.parentNode.getAttribute('groupId');

    document.getElementById('groupName').value = e.target.parentNode.children[0].textContent;

    await loadUsers();
    await checkedExistingMembers();

    $('#createGroupModal').modal('show');
};

document.getElementById('showCreateGroupModalBtn').addEventListener('click', function () {
    
    editGroupId = null;
    loadUsers();

    $('#createGroupModal').modal('show');
});


async function loadUsers() {
    try {
      const { data: { data } } = await axios.get(host + '/user'); 
        const userList = document.getElementById('userList');

        userList.innerHTML = '';

        data.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'form-check';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input';
            checkbox.value = user.id;

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.innerHTML = user.username;

            userDiv.appendChild(checkbox);
            userDiv.appendChild(label);
            userList.appendChild(userDiv);
        });
    } catch (error) {
        console.log(error);
    }
}


async function checkedExistingMembers() {
    try {
        const userList = document.getElementById('userList');
        
        const { data: { data } } = await axios.get(host + `/group-member?groupId=${editGroupId}`);
        
        data.forEach(member => {
            if(member.isAdmin) return
            const checkbox = userList.querySelector(`input[value="${member.userId}"]`);
            checkbox.checked = true;
        });

    
        const adminForm = document.querySelector('#select-admin-form');
        adminForm.innerHTML = `<label for="adminSelect">Select Admin:</label>`;
        const adminSelect = document.createElement('select');
        adminSelect.classList.add('form-control');
        adminSelect.id = 'adminSelect';
        adminForm.append(adminSelect);
            

        adminSelect.innerHTML = '';

        data.forEach(member => {
            const option = document.createElement('option');
            option.value = member.userId;
            option.textContent = member.username;
            adminSelect.appendChild(option);
        });
        
        data.forEach(member => {
            if (member.isAdmin) {
                adminSelect.value = member.userId;
            }
        });

    } catch (error) {
        console.log(error);
    }
}


document.getElementById('createGroupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const groupName = document.getElementById('groupName').value;
    const checkboxes = document.getElementsByClassName('form-check-input');
    
    const selectedMembers = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => parseInt(checkbox.value));

    const selectedAdmin = document.querySelector('#adminSelect').value;

    try {  
        if(editGroupId) {
            const data = {
                name: groupName,
                membersIds: selectedMembers,
                adminId: selectedAdmin,
            }

            const res = await axios.put(host + `/group?groupId=${editGroupId}`, data);
            if (res.data.success) {
                $('#createGroupModal').modal('hide');
                loadGroups();
                editGroupId = null;
            }

        } else {
            const data = {
                name: groupName,
                membersIds: selectedMembers
            }

            const res = await axios.post(host + '/group', data);
            if (res.data.success) {
                $('#createGroupModal').modal('hide');
                loadGroups();
            }
        }
    } catch (error) {
        console.log(error);
    }
});


// delete group

async function deleteGroup(e) {
    try {
        const groupId = e.target.parentNode.getAttribute('groupId');

        const { data: { success } } = await axios.delete(host + `/group?groupId=${groupId}`);
        if(success) loadGroups();
        
    } catch (error) {
        console.log(error)
    }
}