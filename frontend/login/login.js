let login=document.getElementById('loginBtn');

class info{
    constructor(email,password)
    {
        this.email=email;
        this.password=password;
    }
}



login.addEventListener('click',(event)=>{
    event.preventDefault();
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    if(email==='')
    {
        document.getElementById('email').placeholder='ENTER EMAIL';
    }
    else if(password===''){
        document.getElementById('password').placeholder='PASSWORD IS MUST';
    }
    else{
        console.log(email,password);
        let userinfo=new info(email,password);
        console.log(userinfo);
        axios.post('http://localhost:3000/login', userinfo)
        .then((res)=>{
            console.log(res.status)

            if(res.status == 200){
                
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userDetails', JSON.stringify({name:res.data.name, email: res.data.email}))
                window.location.replace('../GroupsPage/groups.html');
            }
            
        }).catch(err=>{
            //console.log(err)
            const errMsg = err.toString()
            //console.log(errMsg)
            if(errMsg == 'Error: Request failed with status code 404'){
                let container=document.querySelector('.popup-container')
                let msg=document.querySelector('.popup-message');
                msg.innerHTML=`<p>User Doesnot exists. Please signup</p>`;
                container.style.display="block";

                setTimeout(() => {
                    container.style.display="none";
                    
                }, 1000);
            }
            else if(errMsg == 'Error: Request failed with status code 401'){
                let container=document.querySelector('.popup-container')
                let msg=document.querySelector('.popup-message');
                msg.innerHTML=`<p>Incorrect Password</p>`;
                container.style.display="block";

                setTimeout(() => {
                    container.style.display="none";
                    
                    
                }, 1000);
            }
        })



       
    }

    
});