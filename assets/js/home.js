function randint(min=1, max=10){
    return Math.trunc(Math.random()*(max-min)+min)
}

let randgen = (length=8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for(let i=0; i<length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.getElementById("password").value = result;
};

function show_hide_pass(passBoxId){
    let passBox = document.getElementById(passBoxId);
    if(passBox.type === 'password') passBox.type = 'text';
    else passBox.type = 'password';
}

function mozmoz(){
    let form = document.getElementById("frm1");
    let user = document.getElementById("user");
    let pass = document.getElementById("pass");
    user.innerText = form.username.value;
    pass.innerText = form.password.value;
}

function hideEl(elementId){
    document.getElementById(elementId).hidden = true;

}


const fileInput = document.getElementById('profile-img-file');
const imgPreview = document.getElementById('profile-img-preview');
const showImageButton = document.getElementById('show-profile-img-button');

function displayImage() {
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        imgPreview.src = '/assets/images/profile.jpg';
    }
}

showImageButton.addEventListener('click', displayImage);
