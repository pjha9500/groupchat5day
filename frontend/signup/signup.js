let submit=document.getElementById('signup')
class info{
    constructor(name,email,phone,password)
    {
        this.name=name;
        this.email=email;
        this.phone=phone;
        this.password=password;
    }
}

submit.addEventListener('click',(event)=>{
    event.preventDefault();
    let email=document.getElementById('email').value;
    let name=document.getElementById('name').value;
    let phone=document.getElementById('phone').value;
    let password=document.getElementById('password').value;

    if(email==='')
    {
        document.getElementById('email').placeholder='ENTER EMAIL';
    }
    else if(name==='')
    {
        document.getElementById('name').placeholder='ENTER NAME';

    }
    else if(phone==='')
    {
        document.getElementById('phone').placeholder='ENTER CONTACT NO.';
    }
    else if(password===''){
        document.getElementById('password').placeholder='PASSWORD IS MUST';
    }
    else{
        console.log(name,email,phone,password);
        let userinfo=new info(name,email,phone,password);

        axios.post('http://localhost:3000/signup', userinfo)
        .then((res)=>{
            if(res.data.flag===true)
            {
                let container=document.querySelector('.popup-container')
                let msg=document.querySelector('.popup-message');
                msg.innerHTML=`<p>${res.data.msg}</p>`;
                container.style.display="block";

                setTimeout(() => {
                    container.style.display="none";
                    window.location='../login/login.html';
                    
                }, 1000);

            }
            else{
                let container=document.querySelector('.popup-container')
                let msg=document.querySelector('.popup-message');
                msg.innerHTML=`<p>${res.data.msg}</p>`;
                container.style.display="block";

                setTimeout(() => {
                    container.style.display="none";
                    
                }, 1000);

            }

            // showPopupMessage(res.data.flag)

        }).catch(err=>console.log(err))
    }

    
});