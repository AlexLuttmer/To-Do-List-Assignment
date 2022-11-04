// Setting base URL
let serverUrl = `http://localhost:3000/`;

// HTTP Request Functions
let getAllTaskData = async function () {

    try {
        let rawData = await fetch(serverUrl,
            {method: "GET", 
            headers: {'Content-Type':'application/json'}})
        let jsonData = await rawData.json();
        return jsonData;
    }

    catch {
        (error) => {console.log(error)}
    }
}

let getSingleTaskData = async function (itemID) {

    try {
        let rawData = await fetch(serverUrl + itemID,
            {method: "GET",
            headers: {'Content-Type':'application/json'}});
        let jsonData = await rawData.json();
        return jsonData;
    }

    catch {
        (error) => {console.log(error)}
    }
}

let postTaskData = async function (taskData) {
    
    try {
        let jsonData = JSON.stringify(taskData)
        await fetch(serverUrl,
            {method: "POST", 
            headers: {'Content-Type':'application/json'},
            body: jsonData})
    }

    catch {
        (error) => console.log(error)
    }
}

let putSingleTaskData = async function (itemID, updatedItem) {

    try {
        let jsonData = JSON.stringify(updatedItem)
        await fetch(serverUrl + itemID,
            {method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: jsonData})
    }

    catch {
        (error) => console.log(error)
    }
}

let delTaskData = async function (taskID) {

    try {
        const ret = await fetch(serverUrl + taskID,
            {method: "DELETE",
            headers: {'Content-Type':'application/json'}})
    return ret;
    }

    catch {
        (error) => console.log(error)
    }
}






