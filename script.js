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
