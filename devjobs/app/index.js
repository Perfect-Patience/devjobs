let http = new XMLHttpRequest();
http.open('get', 'data.json',true);
http.send();

http.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        let jobs = JSON.parse(this.responseText);

        let output = jobs.map((item) => {
            return `
            <div class = "job">
                <div class="_logo-background" style="background-color:${item.logoBackground}"><img src="${item.logo}" alt="logo"/></div>
                <p class="_postedAt">${item.postedAt} . ${item.contract}</p>
                <h6>${item.position} </h6>
                <p class="_company">${item.company}</p>
                <p class="_location">${item.location}</p>
            </div> 
            `;
        });
        document.querySelector(".jobs").innerHTML = output.join("");
    }
}