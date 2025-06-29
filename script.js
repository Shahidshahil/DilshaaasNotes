document.addEventListener('DOMContentLoaded',()=>{const e=document.getElementById("name-selection-screen"),
t=document.getElementById("avatar-selection-screen"),n=document.getElementById("name-form"),
o=document.querySelector(".name-input"),d=document.getElementById("girl-avatar"),
i=document.getElementById("boy-avatar");let audio=null;n.addEventListener("submit",n=>{n.preventDefault(),
if(o.value.trim()){e.classList.add("hidden"),t.classList.remove("hidden");
audio=new Audio("audio/Squidgame.mp3");audio.volume=0.5;audio.loop=true;audio.preload="auto";
const playPromise=audio.play();if(playPromise!==undefined){
playPromise.then(()=>{console.log("Audio started playing continuously")}).catch(e=>{
console.log("Audio play failed:",e);const userInteraction=()=>{audio.play();
document.removeEventListener("click",userInteraction)};document.addEventListener("click",userInteraction)})}}
else{alert("Please enter your name.")}});
const a=()=>{if(audio){audio.pause();audio.currentTime=0}
setTimeout(()=>{window.location.href="notes.html"},1000)};d.addEventListener("click",a),
i.addEventListener("click",a)});