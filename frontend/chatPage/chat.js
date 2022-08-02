const token = localStorage.getItem('token')

var filter = document.querySelector("#filter")
filter.addEventListener("keyup", filterItems)


window.addEventListener('DOMContentLoaded', (e)=>{
    const url = window.location.href
    const grpId = url.split('grpid=')[1]
    //console.log(grpId)
    axios.get(`http://localhost:3000/isAdmin?grpId=${grpId}`, { headers: {"Authorization" : token}})
    .then(user=>{

       console.log(user);

        let admin = user.data.user.isAdmin

        if(admin){
            let adminDiv = document.querySelector(".admin")

            adminDiv.innerHTML = `
            <li><a href="../adminControls/admin.html" id="leaderboard">Admin Controls</a></li>
            `
        }

        axios.get(`http://localhost:3000/getMessages?grpId=${grpId}`, { headers: {"Authorization" : token} })
        .then(res=>{
            console.log(res)

            const messages = res.data.messages

            for(let i=messages.length-1; i>=0; i--){
                const date = messages[i].createdAt.slice(0,10)
                const time = messages[i].createdAt.slice(11,16)

                displayMessage(messages[i].name, messages[i].msg, date, time)
            }
        })
     })
    
})


const sendBtn = document.querySelector('.send-btn')

sendBtn.addEventListener('click', (e)=>{
   e.preventDefault()
    const url = window.location.href
    const grpId = url.split('grpid=')[1]
    const message = document.querySelector('#message')

    if(message.value == ''){
        message.placeholder = "Please enter message"
        message.classList.add('empty')
    }else{
        axios.post('http://localhost:3000/addMessage', {groupid: grpId, msg: message.value}, { headers: {"Authorization" : token}})
        .then(res=>{
            console.log(res.data.result)

            const details = res.data.result
            const date = details.createdAt.slice(0,10)
            const time = details.createdAt.slice(11,16)

            displayMessage(details.name, details.msg, date, time)

        })
        .catch(err=>console.log(err))
    }

})

const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});



function filterItems(e){
    
    var text = e.target.value.toLowerCase()
    //console.log(text)

    // Get List
    var items = itemList.querySelectorAll("li")
    //console.log(item)

    Array.from(items).forEach(item => {
        var itemName = item.firstChild.textContent
        
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = "block"
        }else{
            item.style.display = "none"
        }

    });
}

const messageContainer = document.querySelector('#message-container')

function displayMessage(name, message, date, time){
    
    let messageDiv = document.createElement('div')

    messageDiv.innerHTML = `
        <p><b>${name}:</b> &nbsp;&nbsp; ${message} &nbsp;&nbsp;&nbsp;
        ${date} &nbsp;&nbsp; ${time}
    `
        
    messageContainer.append(messageDiv)
}



let logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', (e)=>{
    localStorage.clear()
    window.location.replace('../login/login.html')
})


