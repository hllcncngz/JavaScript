const inputValue = document.querySelector("#todoinput");
const alertinput = document.querySelector(".alert");
const form = document.querySelector("#form");
const listGroup = document.querySelector(".list-group");
const container = document.querySelector(".container");

eventListener();

//Tüm Eventler Burada Çalışacak
function eventListener() {
    form.addEventListener("submit", addTodo);
    addTodoToUI();
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    listGroup.addEventListener("click", deleteTodo);




}

//Delete İşlemi
function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteTodo(e) {
    console.log(e.target)
    if (e.target.className === "bi bi-x-circle-fill") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarılı Bir Şekilde Silindi...")
}
    }
    

//localstoragedaki tüm todoları alma
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}


//Todo Ekleme
function addTodo(e) {
    let newTodo = inputValue.value.trim();
    if (newTodo === "") {
        //         <div class="alert alert-primary" role="alert">
        //   A simple primary alert—check it out!
        // </div>
        showAlert("danger", "Lütfen Bir Todo Giriniz.");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo Başarılı Bir Şekilde Eklendi.")
    }

    inputValue.value = ""
    e.preventDefault();

}
//Bilgilendirme Mesajları
function showAlert(type, message) {

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style = "max-width: 1000px; text-align:center; margin: 0 auto;"
    container.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1500);
}



//List İtem Ekleme
function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.innerHTML = "<i class='bi bi-x-circle-fill'></i>";

    listItem.className = "list-group-item d-flex justify-content-beetween";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.addEventListener("click",changeStyle);
    
    function changeStyle(){
        listItem.style="background-color:wheat;"
       
    }
    
    listItem.appendChild(link);

    listGroup.appendChild(listItem)



}


//Storage Ekleme
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
