let http = new XMLHttpRequest();
http.open('get', 'data.json',true);
http.send();

http.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        let jobs = JSON.parse(this.responseText);

        //diplay first 12 jobs
        let output = jobs.slice(0, 12).map((item) => {
            return `
            <div class = "job" id = "${item.id}">
                <div class="_logo-background" style="background-color:${item.logoBackground}"><img src="${item.logo}" alt="logo"/></div>
                <p class="_postedAt">${item.postedAt} . ${item.contract}</p>
                <h6>${item.position} </h6>
                <p class="_company">${item.company}</p>
                <p class="_location">${item.location}</p>
            </div>
            `;
        });
        

        document.querySelector(".jobs").innerHTML = output.join("");
      
        //checks for when a job is selected.
        function checkJobSelected() {
          let jobId;
          let jobElements = document.querySelectorAll(".job");
          jobElements.forEach((jobElement) => {
              jobElement.addEventListener("click", function() {
                  jobId = this.getAttribute("id");
                  window.open("details.html?jobId=" + jobId, "_self");
                  
              });
          });
        } 

        checkJobSelected();
        

        //display remaining jobs when load-more is clicked

        let load_more = document.getElementById("load-more")
        load_more.onclick = function() {
            // Load remaining jobs.
            let newJobs = jobs.slice(12, 15).map((item) => {
              return `
                <div class = "job" id = "${item.id}">
                  <div class="_logo-background" style="background-color:${item.logoBackground}"><img src="${item.logo}" alt="logo"/></div>
                  <p class="_postedAt">${item.postedAt} . ${item.contract}</p>
                  <h6>${item.position} </h6>
                  <p class="_company">${item.company}</p>
                  <p class="_location">${item.location}</p>
                </div>
              ` 
            });
          
            document.querySelector(".jobs").innerHTML += newJobs.join("");
            
            //removes the load-more button after it's clicked.
            load_more.style.display = "none";
            
            checkJobSelected()
          } 
    }
}    


// dark mode light mode toggle.
let toggle = document.querySelector(".toggle");
let body = document.querySelector("body");

toggle.addEventListener("click", () =>{
  toggle.classList.toggle("active");
  body.classList.toggle("dark");
  
  //store mode in local storage.
  
  //if toggle on light mode.
  if (!body.classList.contains('dark')){
    return localStorage.setItem("mode", "light");
  }

  //if toggle on dark mode.
  return localStorage.setItem("mode", "dark");
}
);

//get saved mode;
getMode = localStorage.getItem("mode");

if (getMode && getMode === "dark"){
  toggle.classList.toggle("active");
  body.classList.toggle("dark");
}



// Display pop-up and overlay when filter icon is clicked.
document.getElementById("filter-icon").addEventListener('click', function() {
  let popup = this.parentElement.querySelector('.pop-up');
  popup.style.display = 'block';

  var overlay = this.parentElement.querySelector('.overlay');
  overlay.style.display = 'block';

  
});

// removes overlay and pop-up when user clicks outside the pop-up box;
let overlay = document.querySelector('.overlay');
overlay.addEventListener('click',function (){
let popup = this.parentElement.querySelector('.pop-up');
popup.style.display = 'none';
overlay.style.display = 'none';

});

