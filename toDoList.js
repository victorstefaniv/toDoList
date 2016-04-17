cdvar body=document.getElementsByTagName('body')[0],
	pageHeader=document.getElementsByTagName('h1')[0],
	taskCounter=localStorage.length,
	task=[], taskText=[],taskContainer=[];
	
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
function setButton(verticalPosition, textOnButton) {
	var button=document.createElement('button');
	button.style.height='5vmin';
	button.style.width='15vmin';
	button.style.borderRadius='1vmin';
	button.style.border='none';
	button.style.background='white';
	button.style.fontSize='2vmin';
	button.style.color='red';
	button.style.position='absolute';
	button.style.left='83vmin';
	if (verticalPosition=='top') {
		button.style.top='2vmin';
	}
	else if (verticalPosition=='center') {
		button.style.top='5vmin';
	}
	else if (verticalPosition=='bottom') {
		button.style.top='8vmin';
	}
	button.appendChild(document.createTextNode(textOnButton));
	button.addEventListener('mouseover',buttonHint,false);
	button.addEventListener('mouseout',buttonNormal,false);
	button.addEventListener('click',buttonClick,false);
	return button;
}
function setTask(taskContainer, text, twoButtons) {
	var task=document.createElement('div');

	task.style.display='block';
	task.style.background='#4da6ff';
	task.style.borderRadius='2vmin';
	task.style.width='100vmin';
	task.style.height='15vmin';
	task.style.margin='2vmin auto';
	task.style.position='relative';
	taskContainer.style.position='relative';
	taskContainer.style.top='2vmin';
	taskContainer.style.left='2vmin';
	taskContainer.style.width='79vmin';
	taskContainer.style.height='11vmin';
	task.appendChild(taskContainer);
	if (text && twoButtons) {
		var taskText=document.createTextNode(text),
			doneButton=setButton('top','Виконано'),
			removeButton=setButton('bottom','Видалити');
			removeButton.addEventListener('click',removeTask, false);
			doneButton.addEventListener('click', doneTask,false);
		taskContainer.style.color='white';
		taskContainer.appendChild(taskText);
		task.appendChild(doneButton);
		task.appendChild(removeButton);
	} else {
		var addingButton=setButton('center','Додати завдання');
		addingButton.addEventListener('click',addTask,false);
		task.appendChild(addingButton);
		taskContainer.style.color='black';
	}
	return task;
}
function addTask() {
	var prompt=document.getElementsByTagName('textArea')[0];
	if (prompt.value!='') {
		var task=setTask(document.createElement('div'), prompt.value, true);
		task.setAttribute ('id', taskCounter);
		body.appendChild(task);
		localStorage.setItem(taskCounter, prompt.value);
		taskCounter++;
		prompt.value='';
	}
}
function removeTask() {
	for (var key in localStorage) {
		if (key==this.parentNode.getAttribute('id') && 
			localStorage[key]==this.parentNode.getElementsByTagName('div')[0].innerHTML||
			localStorage[key].replace(/\w{4}$/,'')==this.parentNode.getElementsByTagName('div')[0].innerHTML)
		localStorage.removeItem(key);
	}
	body.removeChild(this.parentNode);
}
function doneTask() {
		for (var key in localStorage) {
			if (key==this.parentNode.getAttribute('id') && 
				localStorage[key]==this.parentNode.getElementsByTagName('div')[0].innerHTML && localStorage[key].search(/done$/)==-1)
			localStorage.setItem(key, localStorage[key]+'done');

		}
	this.parentNode.style.background='green';
}
pageHeader.style.display='block';
pageHeader.style.height='10vmin';
pageHeader.style.textAlign='center';
pageHeader.style.lineHeight='10vmin';
pageHeader.style.padding='0';
pageHeader.style.margin='0';
body.appendChild(setTask(document.createElement('textArea')));
for (var key in localStorage) {
	if (localStorage[key].search(/done$/)!=-1) {
		var task=setTask(document.createElement('div'),localStorage[key].replace(/\w{4}$/,''),true);
		task.style.background='green';
	} else {
		var task=setTask(document.createElement('div'),localStorage[key],true);
	}
	task.setAttribute('id',key);
	body.appendChild(task);
}
//localStorage.clear();