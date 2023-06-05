const contactName = document.getElementById("userName");
const num = document.getElementById("contactNumber");
const list = document.getElementById("listContainer");
let username;
let usernum;
let myContact = [];
let dataValue = 0;
let id = 0;
let toStore = [];
let max = 0;
document.getElementById("addContactBtn").addEventListener("click", call);
document.getElementById("");
// localStorage.clear();
//   if (contactName.value === "") {
//     // console.log("if running");
//     alert("please fill the details");
//   } else {
let li;
let addName;
let addNum;
let edit;
let del;
function call() {
  if (contactName.value == "" || num.value == "") {
    alert("fill the details");
  } else {
    creatTag();
  }
}
function creatTag() {
  li = document.createElement("li");
  li.setAttribute("data-userID", dataValue++);
  addName = document.createElement("input");
  addNum = document.createElement("input");
  edit = document.createElement("button");
  edit.innerHTML = "Edit";
  del = document.createElement("button");
  del.innerHTML = "Delete";
  list.appendChild(li);
  li.appendChild(addName);
  li.appendChild(addNum);
  li.appendChild(edit);
  li.appendChild(del);
  username = contactName.value;
  usernum = num.value;
  console.log(username, "username");
  addContact(username, usernum);
  editinput();
  delinput();
}
function addContact(username, usernum) {
  console.log(dataValue, "data attribute value");
  addName.readOnly = true;
  addName.value = username;
  addNum.type = "number";
  addNum.readOnly = true;
  addNum.value = usernum;
  myContact.push({ name: contactName.value, number: num.value, id: id++ });
  contactName.value = "";
  num.value = "";
  console.log(myContact, "before delete", myContact.length);
  localStorageFun();
}
function localStorageFun() {
  console.log("local storage", myContact);
  myItem = JSON.stringify(myContact);
  toStore = localStorage.setItem("values", myItem);
}
/*edit function*/

function editinput() {
  edit.addEventListener("click", function (event) {
    // console.log(event);
    const tar = event.target;
    console.log(tar.innerHTML);
    const getElement = event.target.parentElement;
    console.log(getElement);
    const editIdx = getElement.dataset;
    console.log(editIdx);

    if (tar.innerHTML == "Edit") {
      tar.innerHTML = "Save";
      getElement.children[0].readOnly = false;
      getElement.children[1].readOnly = false;
    } else {
      tar.innerHTML = "Edit";
      getElement.children[0].readOnly = true;
      getElement.children[1].readOnly = true;
      let index = -1;
      myContact.forEach((contact, i) => {
        if (contact.id === Number(editIdx)) {
          index = i;
          return;
        }
      });
      myContact[index].name = event.target.parentElement.children[0].value;
      myContact[index].number = event.target.parentElement.children[1].value;
      console.log(addName.value);
      console.log(myContact);
    }
    console.log(event.target);
  });
  // localStorageFun();
}
/*delete function*/
// let del = document.createElement("button");
function delinput() {
  del.addEventListener("click", function (event) {
    const getElement = event.target.parentElement;
    const delIdx = getElement.dataset.userid;
    console.log(getElement);
    console.log(delIdx, "data value");
    getElement.remove();
    console.log("delId", delIdx);

    for (let i = 0; i < myContact.length; i++) {
      if (delIdx == myContact[i].id) {
        console.log("deletd");
        myContact.splice(i, 1);
      }
    }
    console.log(myContact, "After delete", myContact.length);
  });
  // localStorageFun();
}
//edit.classList.add("edit");

let myData = localStorage.getItem("values");
let data = JSON.parse(myData);

if (data.length > 0 && data.length <= 10) {
  myContact = data;
  myContact.forEach((value) => {
    if (max < value.id) {
      max = value.id;
    }
  });
  console.log(max);
  max++;
  dataValue = max;
  id = max;

  myContact.forEach((value) => {
    contactName.value = value.name;
    num.value = value.number;
    creatTag();
  });
  data = [];
  console.log("local storage");
}
// localStorage.clear();
