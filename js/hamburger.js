  
const d = document;
const hamburger = d.getElementById("hamburger-button");
const responsiveNavbar = d.getElementById("responsive-navbar")


document.addEventListener("click", (e) => {
  
  if(e.target.matches(".hamburger") || e.target.matches(".hamburger *") || e.target.matches(".responsive-navbar__links *")){        
    hamburger.classList.toggle("is-active");    
    responsiveNavbar.classList.toggle("responsive-navbar--active");
  }
})
  
hamburger.addEventListener("click", () => {  
});