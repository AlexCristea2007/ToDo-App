/* Toggle Mode */
var toggle = 0;

var light_btn = document.getElementById("light_btn");
var dark_btn = document.getElementById("dark_btn");

var img_background = document.getElementById("img_bg");
var body = document.getElementById("body");

var todo_generator = document.getElementById("todo_generator");
var todo_preview = document.getElementById("todo_preview");

function toggleMode() {
    if (toggle === 0) {

        light_btn.style.display = 'inline-block';
        dark_btn.style.display = 'none';
        toggle = 1;

        img_background.style.backgroundImage = 'url(./images/bg-desktop-dark.jpg)';
        body.style.backgroundColor = 'hsl(235, 21%, 11%)';

        todo_generator.style.backgroundColor = 'hsl(235, 24%, 19%)';
        todo_preview.style.backgroundColor = 'hsl(235, 24%, 19%)';
        todo_generator.style.boxShadow = '-5px 5px 8px hsl(235, 21%, 7%)';
        todo_preview.style.boxShadow = '-5px 5px 8px hsl(235, 21%, 7%)';
        
        document.querySelectorAll('#div').forEach(function(element){
            element.style.borderBottomColor = 'hsl(237, 14%, 26%)';
        });
        document.querySelectorAll("#checkbox").forEach(function(element){
            element.style.borderColor = 'hsl(237, 14%, 26%)';
        });
        document.querySelectorAll("#paragraph").forEach(function(element){
            element.style.color = 'hsl(236, 33%, 92%)';
        });

    } else if(toggle === 1){

        light_btn.style.display = 'none';
        dark_btn.style.display = 'inline-block';
        toggle = 0;
        
        img_background.style.backgroundImage = 'url(./images/bg-desktop-light.jpg)';
        body.style.backgroundColor = 'hsl(233, 11%, 95%)';

        todo_generator.style.backgroundColor = 'hsl(0, 0%, 98%)';
        todo_preview.style.backgroundColor = 'hsl(0, 0%, 98%)';
        todo_generator.style.boxShadow = '-1px 1px 8px hsl(0, 0%, 49%)';
        todo_preview.style.boxShadow = '-1px 1px 8px hsl(0, 0%, 49%)';
        
        document.querySelectorAll('#div').forEach(function(element){
            element.style.borderBottomColor = 'hsl(236, 9%, 61%)';
        });
        document.querySelectorAll("#checkbox").forEach(function(element){
            element.style.borderColor = 'hsl(233, 11%, 84%)';
        });
        document.querySelectorAll("#paragraph").forEach(function(element){
            element.style.color = 'hsl(235, 19%, 35%)';
        });
    }
}

light_btn.addEventListener('click', toggleMode);
dark_btn.addEventListener('click', toggleMode);

// Existing elements
var input = document.getElementById('input');
var todoList = document.getElementById('todo_list');
var itemsNumber = document.getElementById('items_number');
itemsNumber.style.marginRight = '.15rem';

var itemCount = parseInt(itemsNumber.innerText, 10) || 0;

var all_items = document.getElementById("all_items");
var active_items = document.getElementById("active_items");
var completed_items = document.getElementById("completed_items");
var clear_completed_items = document.getElementById("clear_completed_items");

// Function to handle clearing completed items
function clearCompletedItems() {
    var completedTasks = document.querySelectorAll('.checked');
    completedTasks.forEach(function(task) {
        task.remove();
        itemCount--;
    });
    itemsNumber.innerText = itemCount;
}

// Attach the clear completed items function
clear_completed_items.addEventListener('click', clearCompletedItems);

// Event listener to add a new todo item
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && input.value.trim() !== '') {
        event.preventDefault();

        itemCount++;
        itemsNumber.innerText = itemCount;

        var div = document.createElement('div');
        div.setAttribute('id', 'div');
        div.classList.add('active');

        var checkboxButton = document.createElement('button');
        checkboxButton.setAttribute('id', 'checkbox');
        checkboxButton.innerText = '.';

        var paragraph = document.createElement('p');
        paragraph.setAttribute('id', 'paragraph');
        paragraph.innerText = input.value;

        var closeButton = document.createElement('button');
        closeButton.setAttribute('id', 'close_btn');

        var closeImage = document.createElement('img');
        closeImage.setAttribute('src', './images/icon-cross.svg');

        // Checkbox toggle functionality
        checkboxButton.addEventListener('click', function() {
            if (paragraph.style.textDecoration != 'line-through') {
                checkboxButton.style.backgroundImage = 'linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))';
                paragraph.style.textDecoration = 'line-through';
                paragraph.style.opacity = '.5';
                div.classList.add('checked');
                div.classList.remove('active');
            } else {
                checkboxButton.style.backgroundImage = 'none';
                paragraph.style.textDecoration = 'none';
                paragraph.style.opacity = '1';
                div.classList.remove('checked');
                div.classList.add('active');
            }
        });

        // Close button functionality
        closeButton.addEventListener('click', function() {
            deleteToDo(div);
        });

        // Append elements
        div.appendChild(checkboxButton);
        div.appendChild(paragraph);
        div.appendChild(closeButton);
        closeButton.appendChild(closeImage);

        todoList.appendChild(div);

        input.value = '';
    }
});

// Function to delete a todo
function deleteToDo(divToDelete) {
    divToDelete.remove();
    itemCount--;
    itemsNumber.innerText = itemCount;
}

// Event listeners for filtering todos
all_items.addEventListener('click', function() {
    document.querySelectorAll('#todo_list div').forEach(function(div) {
        div.style.display = 'flex';
    });
});

active_items.addEventListener('click', function() {
    document.querySelectorAll('#todo_list div').forEach(function(div) {
        if (div.classList.contains('active')) {
            div.style.display = 'flex';
        } else {
            div.style.display = 'none';
        }
    });
});

completed_items.addEventListener('click', function() {
    document.querySelectorAll('#todo_list div').forEach(function(div) {
        if (div.classList.contains('checked')) {
            div.style.display = 'flex';
        } else {
            div.style.display = 'none';
        }
        
    });
});
