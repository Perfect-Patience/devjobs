pageurl = window.location.href;
let jobId = new URL(pageurl).searchParams.get("jobId");

let xml = new XMLHttpRequest();
xml.open('get', 'data.json', true);
xml.send();

xml.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        const job_details = JSON.parse(this.responseText);

        const item = job_details.find((job) => job.id == jobId);
        if(item){
            let output_head = `
            <div class="box">
                <div class="logo-background" style="background-color: ${item.logoBackground}">
                    <img src="${item.logo}" alt="${item.company} logo">
                </div>
                <div class="company_info">
                    <div>
                        <div class="centered"><h4>${item.company}</h4></div> 
                        <div class="centered2"><p class="company_url">${item.company}.com</p></div>
                    </div>
                <div class="centered3"><a href="${item.website}"><button class="company_site">Company Site</button></a></div>
                </div>
            </div>
                `;

            document.querySelector(".headbox").innerHTML = output_head;


            let output_text = `
            <div class="container">
                <section class="text_area">
                    <div class = "detail_head">
                        <div>
                            <p class="_postedAt">${item.postedAt} . ${item.contract}</p>
                            <h3 class="_position">${item.position}</h3>
                            <p class="_country">${item.location}</p>
                        </div>
                        <a href="${item.apply}"><button class="apply_bt">Apply Now</button></a>
                    </div>

                    <p>${item.description}</p>
                    <h4 class="section-head">Requirements</h4>
                    <p>${item.requirements.content}</p>
                    <ul id = "requirement_list"></ul>
                    <h4 class="section-head">What you will do</h4>
                    <p>${item.role.content}</p>
                    <ol id = "role_list"></ol>
                </section>
                </div>
                <footer>
                    <div class="centered-footer">
                        <div>
                            <p class ="position-footer">${item.position}</p>
                            <p class="below-position">${item.company}</p>
                        </div>
                        <a href="${item.apply}"><button>Apply Now</button></a>
                    </div>
                </footer>
            </div>
            `;

            document.querySelector(".text_section").innerHTML = output_text;

            //load requirements into unordered list
            const items = item.requirements.items;
            const unorderedList = document.getElementById("requirement_list");
            items.forEach((requirement) => {
                const li = document.createElement("li");
                li.textContent = requirement;
                unorderedList.appendChild(li);
            });


            //load roles into ordered list
            const roles = item.role.items;
            const orderedList = document.getElementById("role_list");

            roles.forEach((role) => {
                const orderedli = document.createElement("li");
                orderedli.textContent = role;
                orderedList.appendChild(orderedli);
            });
        }


    }
}

// dark mode light mode toggle.
let toggle = document.querySelector(".toggle");
let body = document.querySelector("body");


toggle.addEventListener("click", ()=> {
    toggle.classList.toggle("active");
    body.classList.toggle("dark");

    //store mode in local storage
    //light is light mode
    if (!body.classList.contains("dark")){
        return localStorage.setItem("mode", "light");
    }

    //dark if dark mode;\]
    return localStorage.setItem("mode", "dark");
});

//get saved mode
getMode = localStorage.getItem("mode");
//load mode based on stored mode value
if(getMode && getMode == "dark"){
    toggle.classList.toggle("active");
    body.classList.toggle("dark");
}