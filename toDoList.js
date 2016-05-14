var body=document.getElementsByTagName('body')[0],
    addTaskButton=document.getElementsByTagName('button')[0],
    taskNumber=localStorage.key(localStorage.length-1);
function buttonHint() {
	this.style.background='red';
	this.style.color='white';
}
function buttonNormal() {
	this.style.background='white';
	this.style.color='red';
}
function buttonClick() {
	this.style.background='green';
	this.style.color='white';
}
addTaskButton.addEventListener('mouseover',buttonHint,false);
addTaskButton.addEventListener('mouseout',buttonNormal,false);
addTaskButton.addEventListener('click',buttonClick,false);
function setButton(text) {
	var button=document.createElement('button');
	button.appendChild(document.createTextNode(text));
	button.addEventListener('mouseover',buttonHint,false);
	button.addEventListener('mouseout',buttonNormal,false);
	button.addEventListener('click',buttonClick,false);
	return button;
}
function setTask(text) {
	var task=document.createElement('div'),
	    taskContainer=document.createElement('div'),
	    taskText=document.createTextNode(text),
	    doneButton=setButton('Виконано'),
	    removeButton=setButton('Видалити');
	doneButton.setAttribute('class','top');
	removeButton.setAttribute('class','bottom');
	task.setAttribute('class','task');
	taskContainer.setAttribute('class','taskContainer');
	removeButton.addEventListener('click',removeTask,false);
	doneButton.addEventListener('click',doneTask,false);
	taskContainer.appendChild(taskText);
	task.appendChild(taskContainer);
	task.appendChild(doneButton);
	task.appendChild(removeButton);
	return task;
}
function addTask() {
	var  taskText=document.getElementsByTagName('textArea')[0];
	if (taskText.value!='') {
		var task=setTask(taskText.value);
		taskNumber++;
		task.setAttribute ('id', taskNumber);
		body.appendChild(task);
		localStorage.setItem(taskNumber, taskText.value);
		taskText.value='';
	}
}
addTaskButton.addEventListener('click',addTask,false);
function removeTask() {
	var taskText=this.parentNode.getElementsByTagName('div')[0].innerHTML,
	    taskKey=this.parentNode.getAttribute('id'); 
	body.removeChild(this.parentNode);
	for (var key in localStorage) {
		if (key==taskKey && (localStorage[key]==taskText || localStorage[key].replace(/\w{4}$/,'')==taskText)) {
			localStorage.removeItem(key);
		    }
	}
}
function doneTask() {
	var taskText=this.parentNode.getElementsByTagName('div')[0].innerHTML,
	    taskKey=this.parentNode.getAttribute('id'); 
	this.parentNode.style.background='green';
	for (var key in localStorage) {
		if (key==taskKey && localStorage[key]==taskText && localStorage[key].search(/done$/)==-1) {
			localStorage.setItem(key, localStorage[key]+'done');
		}
	}
}
for (var key in localStorage) {
	if (localStorage[key].search(/done$/)!=-1) {
		var task=setTask(localStorage[key].replace(/\w{4}$/,''));
		task.style.background='green';
	} else {
		var task=setTask(localStorage[key]);
	}
	task.setAttribute('id',key);
	body.appendChild(task);
}
