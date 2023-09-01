// CTRL + K + CTRL + J => РАЗВЕРНУТЬ ВСЕ БЛОКИ
// CTRL + K + CTRL + 0 => СВЕРНУТЬ ВСЕ БЛОКИ

class Task {
    /**
    * @param {string} name Name of task
    * @param {string} description Description of task
    * @param {Date} startDate Start date of task
    * @param {Date} finishDate Finish date of task
    */
    constructor(name = '', description = '', startDate = new Date(), finishDate = new Date(), subtasks = []) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.subtasks = subtasks;
    }

    toString() {
        return this.name + ' ' + this.description + ' ' + this.startDate.toDateString() + ' ' + this.finishDate.toDateString();
    }

    /**
     * @param {Task} task Task to equals 
     */
    equals(task) {
        if (this.name == task.name &&
            this.description == task.description &&
            this.startDate == task.startDate &&
            this.finishDate == task.finishDate) {

            return true;
        }

        return false;
    }
}

class CurrentTask extends Task {
    /**
     * @param {string} name 
     * @param {string} description 
     * @param {Date} startDate 
     * @param {Date} finishDate 
     * @param {Number} readyPercent 
     */
    constructor(name = '', description = '', startDate = new Date(), finishDate = new Date(), subtasks = [], readyPercent = 0) {
        super(name, description, startDate, finishDate, subtasks);

        this.readyPercent = readyPercent;
        this.isDone = false;
    }

    /**
     * @param {number} percents Percent to add
     */
    perform(percents) {
        this.readyPercent = percents;

        if (this.readyPercent > 100) {
            this.readyPercent = 100;
            this.isDone = true;
        } else {
            this.isDone = false;
        }
    }

    toString() {
        return this.name + ' ' + this.description + ' ' + this.startDate.toDateString() + ' ' + this.finishDate.toDateString() + ' ' + this.readyPercent + ' ' + this.isDone;
    }
}

var _taskToAddSubtask = new Task('','',new Date(), new Date());
var _tempCurrentTask = new CurrentTask();
var _currentTasks = [_tempCurrentTask];
var _tasks = [_taskToAddSubtask];

_currentTasks = [];
_tasks = [];

/**
 * @param {CurrentTask} currentTask Current task to add
 */
function appendCurrentTask(currentTask) {
    var tr = document.createElement('tr');

    var tdName = document.createElement('td');
    var tdDescription = document.createElement('td');
    var tdStartDate = document.createElement('td');
    var tdFinishDate = document.createElement('td');
    var tdReady = document.createElement('td');
    var tdComplete = document.createElement('td');
    var tdProgress = document.createElement('td');
    var tdAddingSubtask = document.createElement('td');
    var tdSubtasks = document.createElement('td');

    var fontName = document.createElement('font');
    var fontDescription = document.createElement('font');
    var fontStartDate = document.createElement('font');
    var fontFinishDate = document.createElement('font');
    var fontReady = document.createElement('font');
    var fontComplete = document.createElement('font');
    var fontProgress = document.createElement('font');
    var fontAddingSubtask = document.createElement('font');
    var fontSubtasks = document.createElement('font');

    var btnChangeProgress = document.createElement('button');
    var btnAddSubtask = document.createElement('button');
    var btnShowSubtasks = document.createElement('button');

    btnChangeProgress.addEventListener('click', () => { onProgressChangingFromCurrentTaskButtonClick(currentTask); });
    btnAddSubtask.addEventListener('click', () => { onCreatingSubtaskViewButtonClick(currentTask); });
    btnShowSubtasks.addEventListener('click', () => { onShowSubtasksButtonClick(currentTask); });

    fontName.classList.add('yellow');
    fontDescription.classList.add('violet');
    fontStartDate.classList.add('blue');
    fontFinishDate.classList.add('blue');
    fontReady.classList.add('yellow');
    if (currentTask.isDone) {
        fontComplete.classList.add('greenyellow');
    } else {
        fontComplete.classList.add('red');
    }
    fontProgress.classList.add('yellow');
    fontAddingSubtask.classList.add('green');
    fontSubtasks.classList.add('black');

    fontName.innerHTML = currentTask.name;
    fontDescription.innerHTML = currentTask.description;
    fontStartDate.innerHTML = currentTask.startDate.toDateString();
    fontFinishDate.innerHTML = currentTask.finishDate.toDateString();
    fontReady.innerHTML = currentTask.readyPercent;
    fontComplete.innerHTML = currentTask.isDone;
    fontProgress.innerHTML = '&#9998';
    fontAddingSubtask.innerHTML = '┿';
    fontSubtasks.innerHTML = 'Subtasks';
    
    btnChangeProgress.appendChild(fontProgress);
    btnAddSubtask.appendChild(fontAddingSubtask);
    btnShowSubtasks.appendChild(fontSubtasks);

    tdName.appendChild(fontName);
    tdDescription.appendChild(fontDescription);
    tdStartDate.appendChild(fontStartDate);
    tdFinishDate.appendChild(fontFinishDate);
    tdReady.appendChild(fontReady);
    tdComplete.appendChild(fontComplete);
    tdProgress.appendChild(btnChangeProgress);
    tdAddingSubtask.appendChild(btnAddSubtask);
    tdSubtasks.appendChild(btnShowSubtasks);

    tr.appendChild(tdName);
    tr.appendChild(tdDescription);
    tr.appendChild(tdStartDate);
    tr.appendChild(tdFinishDate);
    tr.appendChild(tdReady);
    tr.appendChild(tdComplete);
    tr.appendChild(tdProgress);
    tr.appendChild(tdAddingSubtask);
    tr.appendChild(tdSubtasks);

    document.getElementById('table-current-tasks').appendChild(tr);
}

/**
 * @param {Task} subtask Task to attach a subtask
 */
function appendSubtask(subtask) {
    var tr = document.createElement('tr');

    var tdName = document.createElement('td');
    var tdDescription = document.createElement('td');
    var tdStartDate = document.createElement('td');
    var tdFinishDate = document.createElement('td'); 

    var fontName = document.createElement('font');
    var fontDescription = document.createElement('font');
    var fontStartDate = document.createElement('font');
    var fontFinishDate = document.createElement('font');

    fontName.classList.add('yellow');
    fontDescription.classList.add('violet');
    fontStartDate.classList.add('blue');
    fontFinishDate.classList.add('blue');

    tdName.appendChild(fontName);
    tdDescription.appendChild(fontDescription);
    tdStartDate.appendChild(fontStartDate);
    tdFinishDate.appendChild(fontFinishDate);

    fontName.innerHTML = subtask.name;
    fontDescription.innerHTML = subtask.description;
    fontStartDate.innerHTML = subtask.startDate.toDateString();
    fontFinishDate.innerHTML = subtask.finishDate.toDateString();

    tr.appendChild(tdName);
    tr.appendChild(tdDescription);
    tr.appendChild(tdStartDate);
    tr.appendChild(tdFinishDate);

    document.getElementById('table-subtasks').appendChild(tr);
}

/**
 * @param {Task} task Task to attach
 */
function appendTask(task) {
    var tr = document.createElement('tr');

    var tdState = document.createElement('td');
    var tdName = document.createElement('td');
    var tdDescription = document.createElement('td');
    var tdStartDate = document.createElement('td');
    var tdFinishDate = document.createElement('td');
    var tdAddingSubtask = document.createElement('td');
    var tdShowingSubtasks = document.createElement('td');

    var fontState = document.createElement('font');
    var fontName = document.createElement('font');
    var fontDescription = document.createElement('font');
    var fontStartDate = document.createElement('font');
    var fontFinishDate = document.createElement('font');
    var fontAddingSubtaskButton = document.createElement('font');
    var fontShowingSubtasksButton = document.createElement('font');

    fontState.classList.add('red');
    fontName.classList.add('yellow');
    fontDescription.classList.add('violet');
    fontStartDate.classList.add('blue');
    fontFinishDate.classList.add('blue');
    fontAddingSubtaskButton.classList.add('green', 'bold');
    fontShowingSubtasksButton.classList.add('black');

    tdName.appendChild(fontName);
    tdDescription.appendChild(fontDescription);
    tdStartDate.appendChild(fontStartDate);
    tdFinishDate.appendChild(fontFinishDate);

    fontState.innerHTML = '✔';
    fontName.innerHTML = task.name;
    fontDescription.innerHTML = task.description;
    fontStartDate.innerHTML = task.startDate.toDateString();
    fontFinishDate.innerHTML = task.finishDate.toDateString();
    fontAddingSubtaskButton.innerHTML = '┿';
    fontShowingSubtasksButton.innerHTML = 'Subtasks';

    var btnAddingCurrentState = document.createElement('button');
    var btnAddingSubtask = document.createElement('button');
    var btnShowingSubtasks = document.createElement('button');

    btnAddingCurrentState.appendChild(fontState);
    btnAddingSubtask.appendChild(fontAddingSubtaskButton);
    btnShowingSubtasks.appendChild(fontShowingSubtasksButton);

    btnAddingCurrentState.addEventListener('click', ()=>{ onCreateCurrentTaskButtonClick(task); });
    btnAddingSubtask.addEventListener('click', ()=>{ onCreatingSubtaskViewButtonClick(task); });
    btnShowingSubtasks.addEventListener('click', ()=>{ onShowSubtasksButtonClick(task); });

    tdState.appendChild(btnAddingCurrentState);
    tdAddingSubtask.appendChild(btnAddingSubtask);
    tdShowingSubtasks.appendChild(btnShowingSubtasks);

    tr.appendChild(tdState);
    tr.appendChild(tdName);
    tr.appendChild(tdDescription);
    tr.appendChild(tdStartDate);
    tr.appendChild(tdFinishDate);
    tr.appendChild(tdAddingSubtask);
    tr.appendChild(tdShowingSubtasks);

    document.getElementById('table-tasks').appendChild(tr);
}

/**
 * @param {HTMLElement} table Table to clear
 */
function clearTable(table) {
    var trs = table.getElementsByTagName('tr');

    for (var i = trs.length - 1; i > 0; i--) {
        table.removeChild(trs[i]);
    }
}

function createSubtask() {
    var name = document.getElementById('input-subtask-name').value;
    var description = document.getElementById('input-subtask-description').value;
    var startDate = new Date(document.getElementById('input-subtask-start-date').value);
    var finishDate = new Date(document.getElementById('input-subtask-finish-date').value);

    return new Task(name, description, startDate, finishDate);
}

function createTask() {
    var name = document.getElementById('input-name').value;
    var description = document.getElementById('input-description').value;
    var startDate = new Date(document.getElementById('input-start-date').value);
    var finishDate = new Date(document.getElementById('input-finish-date').value);

    return new Task(name, description, startDate, finishDate);
}

/**
 * @param {HTMLElement} table Table with rows
 */
function getTableRowsCount(table) {
    return table.getElementsByTagName('tr').length;
}

/**
 * @param {HTMLElement} element Element to hide
 */
function hideElement(element) {
    if (element.style.display != "none") {
        element.style.display = "none";
    }
}

function onCancelCreatingSubtaskButtonClick() {
    document.getElementById('input-subtask-name').value = '';
    document.getElementById('input-subtask-description').value = '';
    document.getElementById('input-subtask-start-date').value = '';
    document.getElementById('input-subtask-finish-date').value = '';

    showElement(document.getElementById('div-menu'));

    if (_tasks.length > 0) {
        showElement(document.getElementById('div-tasks'));
    }
    
    hideElement(document.getElementById('div-subtask-creating'));
}

function onCancelCreatingTaskButtonClick() {
    document.getElementById('input-name').value = '';
    document.getElementById('input-description').value = '';
    document.getElementById('input-start-date').value = '';
    document.getElementById('input-finish-date').value = '';

    showElement(document.getElementById('div-menu'));

    if (_tasks.length > 0) {
        showElement(document.getElementById('div-tasks'));
    }
    
    hideElement(document.getElementById('div-task-creating'));
}

function onCancelProgressChangingButtonClick() {
    document.getElementById('input-progress').value = '';

    showElement(document.getElementById('div-menu'));
    showElement(document.getElementById('div-current-tasks'));
    hideElement(document.getElementById('div-changing-progress'));
}

/**
 * @param {Task} task Task to convert in Current Task
 */
function onCreateCurrentTaskButtonClick(task) {
    //#region Create a CurrentTask
    var currentTask = new CurrentTask(task.name, task.description, task.startDate, task.finishDate, task.subtasks, 0);
    _currentTasks.push(currentTask);
    //#endregion

    //#region Remove the task from the tasks table
    var taskIndex = -1;

    for (var i = 0; i < _tasks.length; i++) {
        if (task.equals(_tasks[i])) {
            taskIndex = i;
        }        
    }

    var table = document.getElementById('table-tasks');
    removeTableRow(table, taskIndex + 1);
    //#endregion

    //#region Hide tasks div
    if (getTableRowsCount(table) <= 1) {
        hideElement(document.getElementById('div-tasks'));
    }
    //#endregion

    //#region Remove the task from tasks array
    _tasks = removeItemFromArray(_tasks, task);
    //#endregion
}

function onCreateSubtaskButtonClick() {
    var subtask = createSubtask();

    _taskToAddSubtask.subtasks.push(subtask);
    onCancelCreatingSubtaskButtonClick();
}

function onCreateTaskButtonClick() {
    var task = createTask();

    _tasks.push(task);
    appendTask(task);

    onCancelCreatingTaskButtonClick();
}

function onCreatingTaskViewButtonClick() {
    showElement(document.getElementById('div-task-creating'));
    hideElement(document.getElementById('div-menu'));
    hideElement(document.getElementById('div-tasks'));
    hideElement(document.getElementById('div-subtasks'));
    hideElement(document.getElementById('div-current-tasks'));
}

/**
 * @param {Task} task Task to add subtask
 */
function onCreatingSubtaskViewButtonClick(task) {
    showElement(document.getElementById('div-subtask-creating'));
    hideElement(document.getElementById('div-menu'));
    hideElement(document.getElementById('div-tasks'));
    hideElement(document.getElementById('div-current-tasks'));

    _taskToAddSubtask = task;
}

function onProgressChangingButtonClick() {
    var percents = Number.parseInt(document.getElementById('input-progress').value);
    
    document.getElementById('input-progress').value = '';

    _tempCurrentTask.perform(percents);    

    showElement(document.getElementById('div-menu'));
    hideElement(document.getElementById('div-changing-progress'));
    onCurrentTasksMenuButtonClick();
}

/**
 * @param {CurrentTask} currentTask CurrentTask to change progress
 */
function onProgressChangingFromCurrentTaskButtonClick(currentTask) {
    document.getElementById('font-current-progress').innerText = currentTask.readyPercent.toString() + '%';

    showElement(document.getElementById('div-changing-progress'));
    hideElement(document.getElementById('div-current-tasks'));
    hideElement(document.getElementById('div-menu'));

    _tempCurrentTask = currentTask;
}

function onTasksMenuButtonClick() {
    if (_tasks.length > 0) {
        showElement(document.getElementById('div-tasks'));
        hideElement(document.getElementById('div-subtasks'));
        hideElement(document.getElementById('div-current-tasks'));
    }
    else {
        alert('No tasks!');
    }
}

function onCurrentTasksMenuButtonClick() {
    if (document.getElementById('div-current-tasks').style.display == 'block') {
        return;
    }

    if (_currentTasks.length > 0) {
        //#region Customize views
        hideElement(document.getElementById('div-tasks'));
        hideElement(document.getElementById('div-subtasks'));
        showElement(document.getElementById('div-current-tasks'));
        //#endregion

        //#region Clear and fill the current tasks table with items
        var table = document.getElementById('table-current-tasks');

        clearTable(table);

        for (var i = 0; i < _currentTasks.length; i++) {
            appendCurrentTask(_currentTasks[i]); 
        }
        //#endregion
    }
    else {
        alert('No current tasks!');
    }
}

/**
 * @param {Task} task Subtasks owner
 */
function onShowSubtasksButtonClick(task) {
    var table = document.getElementById('table-subtasks');

    if (task.subtasks.length > 0) {
        showElement(document.getElementById('div-subtasks'));
        hideElement(document.getElementById('div-tasks'));
        hideElement(document.getElementById('div-current-tasks'));

        var cap = table.getElementsByTagName('caption')[0].outerHTML;
        var tr = table.getElementsByTagName('tr')[0].outerHTML;

        table.innerHTML = cap + tr;
        task.subtasks.forEach(x => appendSubtask(x));
    }
    else {
        alert("The task has no subtasks!");
    }
}

/**
 * @param {any[]} array Items array
 * @param {any} item Removable item
 */
function removeItemFromArray(array, item) {
    return array.filter(x => x != item);
}

/**
 * @param {HTMLElement} table Table to remove row
 * @param {number} rowIndex Removable row index
 */
function removeTableRow(table, rowIndex) {
    var trs = table.getElementsByTagName('tr');
    var trToRemove = trs[rowIndex];

    table.removeChild(trToRemove);
}

/**
 * @param {HTMLElement} element Element to show
 */
function showElement(element) {
    if (element.style.display == "none") {
        element.style.display = "block";
    }
}