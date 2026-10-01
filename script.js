console.log("document")

const title = document.getElementById("title")
console.log(title)

const output = document.getElementById("output")
console.log(output)


//NICKNAME
const nickname = document.getElementById("nickname")
console.log(nickname)

nickname.addEventListener( "focus", () =>{
 nickname.style.borderColor = "yellow";
 output.innerHTML = "input is active";

})

nickname.addEventListener( "blur", () =>{
 nickname.style.borderColor = "white";
 output.innerHTML = "input is no longer active";

})

nickname.addEventListener( "input", () =>{
 title.innerHTML = nickname.value || "Future Web Developer";
 output.innerHTML = "Typing:" + nickname.value;

})

//YEAR
const year = document.getElementById("year")
console.log(year)

year.addEventListener( "change", () =>{
 output.innerHTML = "You selected:" + year.value;
})

//PROFILE
const profile = document.getElementById("profile")
console.log(profile)

profile.addEventListener( "mouseover", () =>{
 output.innerHTML = "Mouse entered the image";
})

profile.addEventListener( "mouseout", () =>{
 output.innerHTML = "Mouse left the image";
})
//CLICK
const clickbtn = document.getElementById("clickbtn")
console.log(clickbtn)

clickbtn.addEventListener( "click", () =>{
 output.innerHTML = "Click event activated";
 title.style.color = "red";
})
//DOUBLE CLICK
const dblclickbtn = document.getElementById("dblclickbtn")
console.log(dblclickbtn)

dblclickbtn.addEventListener( "dblclick", () =>{
 output.innerHTML = "Double Click detected ";
 title.style.color = "black";
})

//PRESS N HOLD
const pressHoldbtn = document.getElementById("pressHoldbtn")
console.log(pressHoldbtn)

pressHoldbtn.addEventListener( "mousedown", () =>{
 output.innerHTML = " Mouse button is pressed ";
 pressHoldbtn.style.transform = "scale(0.95)";
})

pressHoldbtn.addEventListener( "mouseup", () =>{
 output.innerHTML = " Mouse button was released ";
 pressHoldbtn.style.transform = "scale(1)";
})

const changeImgBtn = document.getElementById("changeImgBtn")
console.log(changeImgBtn)

const pic1 = "pic1.png";
const pic2 = "pic2.png";
let isPic1 = true;

changeImgBtn.addEventListener( "click", () => {
    profile.style.transform = " scale(0.8) rotate(5deg)";
    setTimeout(() =>{
        if(isPic1){
            profile.src = pic2;
            output.innerHTML = "image change to pic2";
            isPic1 = false;
        }else{
            profile.src = pic1;
            output.innerHTML = "image change to pic1";
            isPic1 = true;
        }
        profile.style.transform = "scale(1)";
    }, 200)
})


