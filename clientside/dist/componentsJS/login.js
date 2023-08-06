const login = document.getElementById('login-btn');

login.addEventListener('click', (e)=>{
e.preventDefault();

const userName = document.getElementById('username').value
const userPassword = document.getElementById('password').value

const userData ={
  username:userName,
    password:userPassword,
}


  loginUser(userData)
})

const loginUser = async(payload)=>{
    try {
        const resp = await fetch('http://localhost:8008/signin',{
            method:"POST",
            credentials:"include",
            redirect:"follow",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
    
            
        })
        const data = await resp.json();
        console.log(data);
        if(resp.ok){

            window.location.href = 'http://localhost:5500/clientside/dist/index.html'
        } else{
            alert('Your password or username is wrong')
        }
    } catch (error) {
        console.log(error);
    }
   
}





