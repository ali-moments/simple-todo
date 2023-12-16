'use strict';

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl){return new bootstrap.Popover(popoverTriggerEl);});
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {return new bootstrap.Tooltip(tooltipTriggerEl);});

function makeTodoItem(text){    
    let todoItem = document.createElement('div');
    todoItem.className = "todo-item list-group-item py-3 bg-secondary text-light border-dark d-flex justify-content-between align-items-center";
    todoItem.setAttribute('data-bs-toggle', 'tooltip');
    todoItem.setAttribute('data-bs-placement', 'right');
    todoItem.setAttribute('title', new Date().toLocaleString());

    let todoChB = document.createElement('input');
    todoChB.type = 'checkbox';
    todoChB.className = "todo-check form-check-input";
    todoChB.addEventListener('change', (e) => {
        let todo_badge = e.target.parentElement.getElementsByClassName('todo-done')[0];
        let todo_text = e.target.parentElement.getElementsByClassName('todo-content')[0];
        if(todo_badge.classList.contains('visually-hidden')){
            todo_badge.classList.remove('visually-hidden');
            todo_text.style.textDecoration = 'line-through';
        } else {
            todo_badge.classList.add('visually-hidden');
            todo_text.style.textDecoration = 'solid';
        }
    });

    let todoContent = document.createElement('span');
    todoContent.className = "todo-content ms-2 flex-grow-1";
    todoContent.style.textDecoration = 'solid';

    let todoContentTxt = document.createTextNode(text);

    let todoDone = document.createElement('span');
    todoDone.className = "todo-done badge bg-primary visually-hidden";

    let todoDoneBadge = document.createElement('i');
    todoDoneBadge.className = 'fa fa-check';

    let todoDoneTxt = document.createTextNode('انجام شد');

    let todoEditBtn = document.createElement('button');
    todoEditBtn.className = "edit-todo btn btn-secondary d-flex align-items-center visually-hidden";

    let todoEditBtnIcon = document.createElement('i');
    todoEditBtnIcon.className = 'fa fa-save'
    
    let todoRemoveBtn = document.createElement('button');
    todoRemoveBtn.className = "remove-todo btn btn-secondary d-flex align-items-center";
    todoRemoveBtn.addEventListener('click', e => {
        let item = e.target.closest('.todo-item');
        tooltipList.forEach(t => {if(t._isEnabled) t.hide();});
        item.remove();
    });
    let todoRemoveBtnIcon = document.createElement('i');
    todoRemoveBtnIcon.className = 'fa fa-trash-can'

    todoDone.append(todoDoneBadge, todoDoneTxt);
    todoContent.append(todoContentTxt, todoDone);
    todoEditBtn.append(todoEditBtnIcon);
    todoRemoveBtn.append(todoRemoveBtnIcon);

    todoItem.append(todoChB, todoContent, todoEditBtn, todoRemoveBtn);

    

    tooltipList.push(new bootstrap.Tooltip(todoItem));
    
    return todoItem;
}

let todoListEl = document.getElementById('todo-list');

function addTodo(text){
    if(!text){
        let warning = document.createElement('div');
        warning.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>    
    <span><strong>متن خالیه</strong><br> کار خود را درست وارد کنید و سپس اقدام به ذخیره سازی کنید!</span>
</div>`;
        document.getElementsByTagName('body')[0].insertAdjacentElement('afterbegin', warning.firstElementChild);
        return;
    };
    let newItem = makeTodoItem(text);
    // newItem.getElementsByClassName('edit-todo')[0].addEventListener('click', (e)=>{
    //     return;
    // });
    // let todoContent = newItem.getElementsByClassName('todo-content')[0];
    // todoContent.addEventListener('dblclick', (e) => {
    //     let contentNode;
    //     if(e.target.nodeName === 'SPAN'){
    //         if(e.target.classList.contains('todo-content')){
    //             contentNode = e.target;
    //         }else{
    //             contentNode = e.target.parentElement;
    //         }
    //     }else if(e.target.nodeName === 'svg'){
    //         contentNode = e.target.parentElement.parentElement;
    //     }else if(e.target.nodeName === 'path'){
    //         contentNode = e.target.parentElement.parentElement.parentElement;
    //     }
    //     contentNode.addEventListener('keydown', (e)=>{
    //         if(e.key === 'Enter'){
    //             e.preventDefault();
    //         }

    //     });
    //     contentNode.parentElement.getElementsByClassName('edit-todo')[0].classList.remove('visually-hidden');
    //     contentNode.firstChild.setAttribute('contenteditable', true);
    //     contentNode.firstChild.focus();

    // });
    todoListEl.insertAdjacentElement('beforeend', newItem);
}

let inputForm = document.getElementById('frm-add-todo');
inputForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    addTodo(inputForm.firstElementChild.children[1].value.trim());
    inputForm.firstElementChild.children[1].value = '';
});

addTodo("متن پیشفرض");