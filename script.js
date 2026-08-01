let resources = [];

const resourceList = document.getElementById("resourceList");
const searchInput = document.getElementById("search");
const totalFiles = document.getElementById("totalFiles");

function getIcon(type){

    switch(type.toLowerCase()){

        case "word":
            return "📝";

        case "excel":
            return "📗";

        case "pdf":
            return "📕";

        case "powerpoint":
            return "📙";

        default:
            return "📄";

    }

}

function displayResources(keyword=""){

    resourceList.innerHTML="";

    const filtered = resources.filter(resource=>

        resource.title.toLowerCase().includes(keyword.toLowerCase()) ||

        resource.category.toLowerCase().includes(keyword.toLowerCase())

    );

    filtered.forEach(resource=>{

        resourceList.innerHTML += `

        <div class="resource-card">

            <h3>  ${getIcon(resource.type)}  ${resource.title}  <span class="file-badge ${resource.type.toLowerCase()}">  ${resource.type.toUpperCase()}  </span>  </h3>

            <p><strong>Category:</strong> ${resource.category}</p>

            <p><strong>Type:</strong> ${resource.type}</p>

            <a class="download-btn" href="${resource.file}" download>

            ⬇ Download

            </a>

        </div>

        `;

    });

}

fetch("data/files.json")

.then(response=>response.json())

.then(data=>{

    resources=data;

    totalFiles.textContent=resources.length;

    displayResources();

})

.catch(error=>{

    console.error(error);

    resourceList.innerHTML="<p>Unable to load resources.</p>";

});

searchInput.addEventListener("keyup",()=>{

displayResources(searchInput.value);

});

sortSelect.addEventListener("change",()=>{

displayResources(searchInput.value);

});

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

});
const categoryButtons = document.querySelectorAll(".category-btn");
const resourceList = document.getElementById("resourceList");

let resources = [
    {
        title: "Daily Lesson Plan Template",
        category: "Lesson Plans",
        file: "files/DLL_Template.docx"
    },
    {
        title: "School Form 1",
        category: "School Forms",
        file: "files/SF1.docx"
    },
    {
        title: "Teacher Template",
        category: "Templates",
        file: "files/Template.docx"
    },
    {
        title: "TLE Learning Materials",
        category: "TLE Resources",
        file: "files/TLE_Module.pdf"
    },
    {
        title: "Action Research Sample",
        category: "Research",
        file: "files/Research.docx"
    }
];


function displayResources(category="All Resources") {

    resourceList.innerHTML = "";

    let filtered;

    if(category === "All Resources") {
        filtered = resources;
    } else {
        filtered = resources.filter(
            item => item.category === category
        );
    }


    filtered.forEach(item => {

        resourceList.innerHTML += `

        <div class="resource-card">

            <h3>${item.title}</h3>

            <p>${item.category}</p>

            <a href="${item.file}" download>
            ⬇ Download
            </a>

        </div>

        `;

    });

}


categoryButtons.forEach(button => {

    button.addEventListener("click", ()=>{

        categoryButtons.forEach(btn=>{
            btn.classList.remove("active");
        });


        button.classList.add("active");


        displayResources(
            button.dataset.category
        );

    });

});


displayResources();
