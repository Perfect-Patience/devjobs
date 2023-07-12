pageurl = window.location.href;
// console.log(pageurl);
let jobId = new URL(pageurl).searchParams.get("jobId");
// console.log(typeof(jobId));
let xml = new XMLHttpRequest();
xml.open('get', 'data.json', true);
xml.send();

xml.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        const job_details = JSON.parse(this.responseText);
        console.log("working");

        const item = job_details.find((job) => job.id == jobId);
        if(item){
            let output = `
            <div class="box">
                <div class="logo-background" style="background-color: ${item.logoBackground}">
                    <img src="${item.logo}" alt="company logo">
                </div>
                <div class="company_info">
                    <div>
                        <h4>${item.company}</h4> 
                        <p class="company_name">${item.company}.com</p>
                    </div>
                <button class="company_site">Company Site</button>
                </div>
            </div>
                `;

            document.querySelector(".headbox").innerHTML = output;
        }
    }
}
