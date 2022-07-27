import { globalProjects, globalSkills, myEmail, projectsTechnologies } from "./globalData.min.js"

const doc = document;
const sections = doc.querySelectorAll("[data-scroll-spy]");

/* Fixed menu */

const callback = (entries) => {

  entries.forEach(( entry ) => {    
    const sectionId = entry.target.id;      
    
    if(entry.isIntersecting){                  
      doc.querySelector(`[data-scroll-id="${sectionId}"]`).classList.add("fixed-navbar__link--active");      
      doc.getElementById(sectionId).classList.add("section-active");
    } else {
      doc.querySelector(`[data-scroll-id="${sectionId}"]`).classList.remove("fixed-navbar__link--active");      
      doc.getElementById(sectionId).classList.remove("section-active");
    }

  })  
}

const io = new IntersectionObserver(callback, {
  threshold: .1
});

sections.forEach(( section ) => io.observe(section) );


/* Projects y skills */

const projectsSection = doc.getElementById("projects-scroll");
const projectsArticle = doc.getElementById("project-container");
const skillsContainer = doc.getElementById("skillsContainer");

const getAllCategories = (projects = []) => {
  
  const projectData = projects.map(( project ) => {    
    return `
      <article class="projects-section__article">
        <div class="projects-section__article-container">
          <div class="projects-section__image">
            <img class="projects-section__image-item" src=${project.image} alt=${project.alt}>            
            <div class="projects-section__view-container">
              <div class="projects-section__view">
                <a href=${project.url} target="_blank" rel="noreferrer">                    
                  <img src="./img/page-view.png" alt="page-view">                  
                </a>
              </div>              
              <div class="projects-section__view">
                <a href=${project.github} target="_blank" rel="noreferrer">
                  <img src="./img/github-view.png" alt="page-view">                  
                </a>
              </div>
            </div>
            <div class="projects-section__type">${project.categoryText}</div>
          </div>
          <div class="projects-section__information">
            <h3>${project.title}</h3>
            <p>${project.text}</p>            
            <div class="projects-section__technologies">
            </div>
          </div>
        </div>
      </article>
    `
  });
  
  projectsArticle.innerHTML = projectData.join("");        
}

const getCategories = (projects = [], id = "") => {  

  const projectsFiltered = projects.filter(( project ) => project.category === id);

   const projectData = projectsFiltered.map(( project ) => {    
    return `
      <article class="projects-section__article">
        <div class="projects-section__article-container">
          <div class="projects-section__image">
            <img class="projects-section__image-item" src=${project.image} alt=${project.alt}>            
            <div class="projects-section__view-container">
              <div class="projects-section__view">
                <a href=${project.url} target="_blank" rel="noreferrer">                    
                  <img src="./img/page-view.png" alt="page-view">                  
                </a>
              </div>              
              <div class="projects-section__view">
                <a href=${project.github} target="_blank" rel="noreferrer">
                  <img src="./img/github-view.png" alt="page-view">                  
                </a>
              </div>
            </div>
            <div class="projects-section__type">${project.categoryText}</div>
          </div>
          <div class="projects-section__information">
            <h3>${project.title}</h3>
            <p>${project.text}</p>
            <div class="projects-section__technologies">
            </div>
          </div>
        </div>
      </article>
    `
  })
    
  projectsArticle.innerHTML = projectData.join("");      

}

const getSkills = (skills = []) => {
  const skillsData = skills.map(( skill ) => {
    return `
      <article class="skills-section__article">
        <div class="skills-section__image ${skill.skillColor}">
          <img src=${skill.image} alt=${skill.alt}>
        </div>
        <p class="skills-section__text">${skill.text}</p>
      </article>
    `
  });

  skillsContainer.innerHTML = skillsData.join("")
  
}

const getTechnologies = () => {
  const projectsArticles = doc.querySelectorAll(".projects-section__article");      

  projectsArticles.forEach(project_article => {
    const imgAlt = project_article.querySelector(".projects-section__image-item").alt;
    const tech = projectsTechnologies.find( el => el.altRef === imgAlt);

    if (imgAlt === tech.altRef) {

      const technologiesParagraph = tech.technologies.map(tech => ( 
          `<li>${tech}</li>` 
        ))

      const sectionTechnologies = project_article.querySelector(".projects-section__technologies");
      sectionTechnologies.innerHTML= technologiesParagraph.join("");
    }    
  })
}

doc.addEventListener("DOMContentLoaded" , () => {
  getAllCategories(globalProjects);
  getSkills(globalSkills); 
  getTechnologies(); 
})

doc.addEventListener("click" , (e) => {
  if(e.target.matches(".projects-section__category")){
    const id = e.target.id;

    if(id === "all"){
      getAllCategories(globalProjects);
      projectsSection.classList.remove("projects-section--category");
      getTechnologies();
    } else {
      getCategories(globalProjects, id);    
      projectsSection.classList.add("projects-section--category");
      getTechnologies();
    }

  }
})


/* Form Contact*/


const form = doc.getElementById("form");
const inputs = doc.querySelectorAll(".contact-section__form [required] ");

inputs.forEach(( input ) => {
  const span = doc.createElement("span");
  span.id = input.name;
  span.textContent = input.title;  
  span.classList.add("contact-section__validation");
  input.insertAdjacentElement("afterend", span)
})


const keyDownMethod = (input) => {
  const validatorElement = doc.getElementById(input.name);
  const pattern = input.pattern || input.dataset.pattern;
  
  const reg = new RegExp(pattern, "ig")      

  if (!validatorElement) return;    

  return (!reg.test(input.value) && input.value !== "" || input.value.length > 255) 
    ? validatorElement.classList.add("contact-section__validation--activate")
    : validatorElement.classList.remove("contact-section__validation--activate")  
    
}

form.addEventListener("keyup" , (e) => {
  keyDownMethod(e.target);  
})


const formResponseMethod = (responseMessage, message, loader ) => {      

  loader.classList.remove("contact-section__response--active");
  responseMessage.textContent =  message;        
  responseMessage.classList.add("contact-section__response--active");
  
  setTimeout(() => {                
    responseMessage.classList.remove("contact-section__response--active");
    form.reset();
  }, 3500);  
}

const sendSubmit = async (form) => {
  const responseMessage = doc.getElementById("form-response");
  const loader = doc.getElementById("loader");

  try {
    const formData = new FormData(form);  

    const options = {
      method: "POST",
      body: formData,      
    }

    loader.classList.add("contact-section__response--active");      

    const res = await fetch(`https://formsubmit.co/ajax/${myEmail}`, options);
    const json = await res.json();

    if (res.ok && json.success === "true") {
      formResponseMethod(responseMessage,"The message was submitted successfully 😎", loader);      
    } else {
      formResponseMethod(responseMessage, "Something wrong happened! 🙁", loader);      
    }

  } catch (error) {
    formResponseMethod(responseMessage, "Something wrong happened! 🙁", loader);      
  }
  
}

form.addEventListener("submit" , (e) => {
  e.preventDefault();
      
  if (
      form.message.value.length > 255 ||
      form.name.value.length > 255 ||
      form.subject.value.length > 255 
    ) return;

  sendSubmit(e.target);
})


