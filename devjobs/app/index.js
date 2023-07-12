let http = new XMLHttpRequest();
http.open('get', 'data.json',true);
http.send();

http.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        let jobs = JSON.parse(this.responseText);

        //diplay first 12 jobs
        let output = jobs.slice(0, 12).map((item) => {
            return `
            <a href="details.html" target="_blank"><div class = "job">
                <div class="_logo-background" style="background-color:${item.logoBackground}"><img src="${item.logo}" alt="logo"/></div>
                <p class="_postedAt">${item.postedAt} . ${item.contract}</p>
                <h6>${item.position} </h6>
                <p class="_company">${item.company}</p>
                <p class="_location">${item.location}</p>
            </div></a>
            `;
        });
        

        document.querySelector(".jobs").innerHTML = output.join("");

        //display remaining jobs when load-more is clicked

        let load_more = document.getElementById("load-more")
        load_more.onclick = function() {
            // Load remaining jobs.
            let newJobs = jobs.slice(12, 15).map((item) => {
              return `
                <a href="details.html" target="_blank"><div class = "job">
                  <div class="_logo-background" style="background-color:${item.logoBackground}"><img src="${item.logo}" alt="logo"/></div>
                  <p class="_postedAt">${item.postedAt} . ${item.contract}</p>
                  <h6>${item.position} </h6>
                  <p class="_company">${item.company}</p>
                  <p class="_location">${item.location}</p>
                </div></a> 
              `;
            });
          
            document.querySelector(".jobs").innerHTML += newJobs.join("");
            
            //removes the load-more button after it's clicked.
            load_more.style.display = "none";
          

    }

    
}

}

let toggle = document.querySelector(".toggle");
toggle.addEventListener("click", ()=> toggle.classList.toggle("active"))
