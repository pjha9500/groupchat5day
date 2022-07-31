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


       
    }

    
});