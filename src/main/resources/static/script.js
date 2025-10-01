let title = document.querySelector('#title');
let desc = document.querySelector('#description');
let statVal = document.querySelector('#status');
let btn1 = document.querySelector('#addbtn');
let btn2 = document.querySelector('.delbtn');
let btn3 = document.querySelector('#updbtn');
let table = document.querySelector('#task-table');
let allTasks = document.querySelector('#task-list');
let msg = document.querySelector('#msg');
let newbtn = document.querySelector('#newbtn');

const url = "http://localhost:8080/tasks";


const getResponse = async () => {
    console.log("Getting response");
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log("Error found : ", error);
    }
}

//This function will show all tasks on the screen.
async function fetchData() {
    let response = await fetch(url);
    if (response.ok) {
        console.log("Fetched");
    }
    else {
        console.log("Not Fetched");
    }
    let data = await response.json();
    allTasks.innerHTML = "";
    if (data[0] == null) {
        table.style.display = "none";
    }
    else {
        data.forEach(task => {
            allTasks.innerHTML += `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.status}</td>
                    <td>${task.created}</td>
                </tr>
                `;
        });
    }
}

window.addEventListener("DOMContentLoaded", fetchData);

//This will get the task from the user.
if (btn1) {
    btn1.addEventListener("click", async (evnt) => {
        evnt.preventDefault();
        if (btn1.innerText == "Add New Task") {
            reloadpage();
            btn1.innerText = "Add Task";
        }
        else {
            if (title.value != "" && desc.value != "") {
                const task = {
                    title: title.value,
                    description: desc.value,
                    status: statVal.value
                }
                let sendRsponse = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)

                });
                if (sendRsponse.ok) {
                    console.log("Task Added");
                    msg.innerText = "Task Added";
                    btn1.innerText = "Add New Task";
                }
                else {
                    console.log("Task Not Added");
                    msg.innerText = "Task Not Added";
                }
                title.innerText = "";
                desc.innerText = "";
                statVal.innerText = "";
            }
        }
    })
}

function reloadpage() {
    window.location.reload(true);
}
//This will help to delete tasks.
let taskId = document.querySelector("#task-id");
let token = 0;
if (btn2) {
    btn2.addEventListener("click", async (evnt) => {
        evnt.preventDefault();
        if (taskId.value == "") {
            if (token == 0) {
                alert("Since you haven't given the ID, all tasks will be deleted if you click again.");
                token = 1;
            }
            else {
                token = 0;
                let delResponse = await fetch(url, {
                    method: "DELETE"
                });

                if (delResponse.ok) {
                    console.log("All tasks have been deleted");
                    msg.innerText = "All Tasks Deleted";
                } else {
                    console.log("Failed to delete all tasks");
                    msg.innerText = "Tasks Not Deleted";
                }
            }

        }
        else {
            let id = taskId.value;
            let delResponse = await fetch(`${url}${id}`, {
                method: "DELETE"
            });
            if (delResponse.ok) {
                console.log("Task Deleted");
                msg.innerText = "Task Deleted";
            }
            else {
                console.log("Failed to delete a task");
                msg.innerText = "Task Not Deleted";
            }
        }
        id.innerText = "";
    });
}

//this will help to update existing tasks.
if (btn3) {
    btn3.addEventListener("click", async (evnt) => {
        evnt.preventDefault();
        let id = taskId.value;
        let response = await fetch(`${url}${id}`);
        let existingTask = await response.json();
        if (title.value != "" && desc.value != "") {
            const task = {
                title: title.value,
                description: desc.value,
                status: statVal.value
            }
            let updateResponse = await fetch(`${url}${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            });
            if (updateResponse.ok) {
                console.log("Task updated successfully");
                msg.innerText = "Task Updated";
            }
            else {
                console.log("Task updation failed");
                msg.innerText = "Task Not Updated";
            }
        }
        else if (title.value == "" && desc.value == "") {
            const taskupd = {
                title: existingTask.title,
                description: existingTask.description,
                status: statVal.value
            }
            let updstatus = await fetch(`${url}${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskupd)
            });
            if (updstatus.ok) {
                console.log("Status updated successfully");
                msg.innerText = "Status Updated";
            }
            else {
                console.log("Status updation failed");
                msg.innerText = "Status Not Updated";
            }
        }
        title.innerText = "";
        desc.innerText = "";
        statVal.innerText = "";
    });
}

let search = document.querySelector('#search');
let schbtn = document.querySelector('#schbtn');

//This will help to search tasks.
schbtn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    let searchResponse = async () => {
        let searchRs = await fetch(url);
        let data = await searchRs.json();
        if (search.value == "") {
            alert("Please enter a taskname to search.");

        }
        else {

            allTasks.innerHTML = "";
            for (let searchTask of data) {
                try {
                    if (searchTask.title.toLowerCase() == search.value.toLowerCase()) {
                        allTasks.innerHTML = `
                    <tr>
                    <td>${searchTask.id}</td>
                    <td>${searchTask.title}</td>
                    <td>${searchTask.description}</td>
                    <td>${searchTask.status}</td>
                    <td>${searchTask.created}</td>
                </tr>`
                        break;
                    }
                    else if (searchTask.id == search.value) {
                        allTasks.innerHTML = `
                    <tr>
                    <td>${searchTask.id}</td>
                    <td>${searchTask.title}</td>
                    <td>${searchTask.description}</td>
                    <td>${searchTask.status}</td>
                    <td>${searchTask.created}</td>
                </tr>`
                        break;
                    }
                }
                catch (error) {
                    console.log("Error found : ", error);
                }
            };
        }
    }
    searchResponse();
})