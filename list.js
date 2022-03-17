const TEXT_ELEMENT_ID_PREFIX = "text-element-";


let textElementIdCounter = 0;
let textElements = {}; // key - text element id, value - text element value


function getFormattedCurrentDatetime(){
    let currentDate = new Date();
    let month = '' + (currentDate.getMonth() + 1);
    let day = '' + currentDate.getDate();
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours < 10) 
        hours = '0' + hours;
    if (minutes < 10) 
        minutes = '0' + minutes;
    if (seconds < 10) 
        seconds = '0' + seconds;

    return [day, month, year].join('.') + ' ' + [hours, minutes, seconds].join(':');
}


function textElementClicked(event){
    if(event.target.style.textDecoration === 'line-through'){
        event.target.style.textDecoration = 'none';
        event.target.style.color = 'black';
        event.target.innerHTML = textElements[event.target.id];
    }
    else{
        event.target.style.textDecoration = 'line-through';
        event.target.style.color = 'gray';
        
        event.target.innerHTML = textElements[event.target.id]+' (' + getFormattedCurrentDatetime() + ')';
    }
}


function getTextElement(value){
    let textElement = document.createElement("span");
    textElement.appendChild(document.createTextNode(value));
    let textElementId = TEXT_ELEMENT_ID_PREFIX + textElementIdCounter.toString();
    textElement.id = textElementId;
    textElements[textElementId] = value;
    textElementIdCounter++;
    textElement.addEventListener("click", textElementClicked)
    return textElement;
}


function addListElement(event){
    let addListElementInput = document.getElementById("add-list-element-input");
    let value = addListElementInput.value.trim();
    if(value.length === 0) return;
    addListElementInput.value = '';    

    
    let deleteElementButton = document.createElement("button");
    deleteElementButton.className = 'delete-button';
    deleteElementButton.appendChild(document.createTextNode("x"));
    let divElement = document.createElement("div");
    divElement.className = "list-element";
    divElement.appendChild(getTextElement(value));
    divElement.appendChild(deleteElementButton);
    let newListElement = document.createElement("li");
    newListElement.appendChild(divElement);
    document.getElementById("list").appendChild(newListElement);
}


let add_list_element_button = document.getElementById('add-list-element-button');
add_list_element_button.addEventListener("click", addListElement);
