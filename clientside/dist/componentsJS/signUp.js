const signup = document.getElementById('signup-btn');

signup.addEventListener('click',  (e)=>{
    e.preventDefault();
    const userName=document.getElementById("username").value
    const userEmail=document.getElementById("email").value
    const userPassword=document.getElementById("password").value
    const nameOfUser = document.getElementById("name").value
    const userBio = document.getElementById("bio").value
    const confirmpassword = document.getElementById('confirmpassword').value
 
    if(!userName || !userEmail || !userPassword || !nameOfUser || !userBio){
        alert('All field required')
    }
const userData ={
  username:userName,
    password:userPassword,
    confirmPassword:confirmpassword,
    email:userEmail,
    name:nameOfUser,
    bio:userBio,
}
console.log(userData);
 signUpUser(userData)
})

const signUpUser = async(payload)=>{
    try {
        const resp = await fetch('http://localhost:8008/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
    
        })
        const data = await resp.json();
        console.log(data);

        if(resp.ok){
            window.location.href = 'http://localhost:5500/clientside/dist/login.html'
        } else{
            alert('Something wrong try again')
        }
    } catch (error) {
        console.log(error);
    }
   
}