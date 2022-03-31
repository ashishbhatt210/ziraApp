let tc = document.querySelector(".ticket-container");
let allFilters = document.querySelectorAll(".filter");
let modalVisible = false;

function loadTickets(color){
    let allTasks = localStorage.getItem("allTasks");
    if(allTasks != null){
        allTasks = JSON.parse(allTasks);
        if(color){
            allTasks = allTasks.filter(function(data){
                return data.priority == color;
            });
        }
        for(let i = 0; i < allTasks.length; i++){
            let ticket = document.createElement("div");
            ticket.classList.add("ticket");
            ticket.innerHTML = `<div class="ticket-color ticket-color-${allTasks[i].priority}"></div>
                                <div class="ticket-id">Ticket ID: #${allTasks[i].ticketId}</div>
                                <div class="task">${allTasks[i].task}</div>`;
            
            tc.appendChild(ticket);
            ticket.addEventListener("click", function(e){
                if(e.currentTarget.classList.contains("active")){
                    e.currentTarget.classList.remove("active");
                }
                else{
                    e.currentTarget.classList.add("active");
                }
            });
        }
    }
}

loadTickets();


for(let i = 0; i < allFilters.length; i++){
    allFilters[i].addEventListener("click", filterHandler);
}

function filterHandler(e){
    tc.innerHTML = "";
    if(e.currentTarget.classList.contains("active")){
        e.currentTarget.classList.remove("active");
        let activeFilters = document.querySelectorAll(".filter.active");
        if(activeFilters.length == 0){
            loadTickets();
        }
        else{
            for(let i = 0; i < activeFilters.length; i++){
                let priorityColor = activeFilters[i].children[0].classList[0].split("-")[0];
                loadTickets(priorityColor);
            }
        }
    }
    else{
        e.currentTarget.classList.add("active");
        let activeFilters = document.querySelectorAll(".filter.active");
        for(let i = 0; i < activeFilters.length; i++){
            let priorityColor = activeFilters[i].children[0].classList[0].split("-")[0];
            loadTickets(priorityColor);
        }
    }
}

let addBtn = document.querySelector(".add");
addBtn.addEventListener("click", addModal);
let deleteBtn = document.querySelector(".delete");

deleteBtn.addEventListener("click", function(e){
    let selectedTickets = document.querySelectorAll(".ticket.active");
    let allTasks = JSON.parse(localStorage.getItem("allTasks"));
    for(let i = 0; i < selectedTickets.length; i++){
        selectedTickets[i].remove();
        let ticketID = selectedTickets[i].querySelector(".ticket-id").innerText;
        allTasks = allTasks.filter(function(data){
            return ("Ticket ID: " + "#" + data.ticketId) != ticketID;
        })
    }
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
});

let selectedPriority;

function addModal(e){
    if(!modalVisible){
        let modal = document.createElement("div");
        modal.classList.add("modal-background");
        modal.innerHTML = `<div class="modal">
                        <div class="modal-content" data-typed="false" contenteditable>Enter your task here...</div>
                        <div class="modal-priority-list">
                            <div class="modal-pink-filter modal-filter active"></div>
                            <div class="modal-blue-filter modal-filter"></div>
                            <div class="modal-yellow-filter modal-filter"></div>
                            <div class="modal-green-filter modal-filter"></div>
                        </div>
                    </div>`;
        tc.appendChild(modal);
        selectedPriority = "pink"
        let taskModal = document.querySelector(".modal-content");
        taskModal.addEventListener("click", function(e){
            if(e.currentTarget.getAttribute("data-typed") == "false"){
                e.currentTarget.innerText = "";
                e.currentTarget.setAttribute("data-typed", "true");
            }
        });
        modalVisible = true;
        taskModal.addEventListener("keypress", addTicket.bind(this, taskModal));
        let modalFilters = document.querySelectorAll(".modal-filter");
        for(let i = 0; i < modalFilters.length; i++){
            modalFilters[i].addEventListener("click", selectPriority.bind(this, taskModal));
        }
    }
    
}

function selectPriority(taskModal, e){
    let activeFilter = document.querySelector(".modal-filter.active");
    activeFilter.classList.remove("active");
    selectedPriority = e.currentTarget.classList[0].split("-")[1];
    e.currentTarget.classList.add("active");
    taskModal.click();
    taskModal.focus();
}

function addTicket(taskModal, e){
    if(e.key == "Enter" && e.shiftKey == false && taskModal.innerText.trim() != ""){
        let task = taskModal.innerText;
        let id = uid();
        // let ticket = document.createElement("div");
        // ticket.classList.add("ticket");
        // ticket.innerHTML = `<div class="ticket-color ticket-color-${selectedPriority}"></div>
        //                     <div class="ticket-id">#${id}</div>
        //                     <div class="task">${task}</div>`;
        
        document.querySelector(".modal-background").remove();
        modalVisible = false;
        // tc.appendChild(ticket);
        // ticket.addEventListener("click", function(e){
        //     if(e.currentTarget.classList.contains("active")){
        //         e.currentTarget.classList.remove("active");
        //     }
        //     else{
        //         e.currentTarget.classList.add("active");
        //     }
        // });

        let allTasks = localStorage.getItem("allTasks");

        if(allTasks == null){
            let data = [{"ticketId":id, "task":task, "priority":selectedPriority}];
            localStorage.setItem("allTasks", JSON.stringify(data));
        }
        else{
            let data = JSON.parse(allTasks);
            data.push({"ticketId":id, "task":task, "priority":selectedPriority});
            localStorage.setItem("allTasks", JSON.stringify(data));
        }

        let activeFilters = document.querySelectorAll(".filter.active");
        tc.innerHTML = "";
        if(activeFilters.length == 0){
            loadTickets();
        }
        else{
            for(let i = 0; i < activeFilters.length; i++){
                let priorityColor = activeFilters[i].children[0].classList[0].split("-")[0];
                loadTickets(priorityColor);
            }
        }

    } else if(e.key == "Enter" && e.shiftKey == false){
        e.preventDefault();
        alert("Error!....No Task Entered");
    }
}

window.onclick = function(event) {
    let modal = document.querySelector(".modal-background");
    if (event.target == modal) {
        document.querySelector(".modal-background").remove();
    }
    modalVisible = false;
}