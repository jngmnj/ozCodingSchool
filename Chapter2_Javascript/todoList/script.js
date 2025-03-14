let todoList = [];

const input = document.querySelector("#todo-input");
const ul = document.querySelector("#todo-list");
const btn = document.querySelector("#add-btn");

const toggleCheckTodo = (e) => {
	const li = e.target.parentNode;
	const span = li.querySelector("span");
	if (e.target.checked) {
		span.style.textDecoration = "line-through";
	} else {
		span.style.textDecoration = "none";
	}

	// localStorage에서 해당 todo를 찾아서 checked값을 변경
	const newTodos = todoList.map((todo) => {
		if (todo.text === span.textContent) {
			todo.checked = e.target.checked;
			console.log("todo", todo);
		}
		return todo;
	});
  todoList = newTodos;
	saveTodo();
}

const deleteTodo = (e) => {
  const li = e.target.parentNode;
	const span = li.querySelector("span");

	todoList = todoList.filter((todo) => todo.text !== span.textContent);
	saveTodo();
  li.remove();
  // ul.removeChild(li);
};

const saveTodo = () => {
	localStorage.setItem("todoList_ls", JSON.stringify(todoList));
};

const addTodo = (inputValue, isChecked) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkbox = document.createElement("input");

  span.textContent = inputValue;
  li.style.cssText = "display: block;";
  li.draggable = true;
  li.className = "draggable";
	
	// checkbox 추가
	checkbox.type = "checkbox";
	checkbox.className = "checkbox";
	checkbox.style.cssText = "margin-right: 10px;";
	if(isChecked) {
		checkbox.checked = true;
		span.style.textDecoration = "line-through";
	}
	li.append(checkbox);
	checkbox.addEventListener("change", toggleCheckTodo);

  // delete button 추가
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "삭제";
   deleteBtn.addEventListener("click", deleteTodo);
  li.append(span);
  li.append(deleteBtn);

  ul.append(li);

	todoList.push({ text: inputValue, checked: isChecked });
	saveTodo();
	console.log("todoList", todoList);
};

document.getElementById("add-btn").addEventListener("click", function () {
	const inputValue = input.value;
	  if (!inputValue) {
      alert("할일을 입력하세요!");
      return;
    }

  addTodo(inputValue, false);
  input.value = "";
});

// 심화1) 입력한 TO-DO가 Local Storage에 저장되어 새로 고침 후에도 유지되도록 해보세요.
const loadTodos = () => {
  const loadedTodos = localStorage.getItem("todoList_ls");
  if (loadedTodos) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach((todo) => {
      addTodo(todo.text, todo.checked);
    });
  }
};

loadTodos();

// 심화2) 할 일 항목에 완료 표시를 할 수 있는 체크박스를 추가해 보세요.
// 심화3) TO-DO 리스트를 드래그 앤 드롭으로 정렬할 수 있는 방법을 검색하고 적용해 보세요.

let currentItem;
let currentIndex;
let indexDrop;
let listArr;

ul.addEventListener("dragstart", ({ target }) => {
  currentItem = target;
	listArr = [...currentItem.parentElement.children];
	currentIndex = listArr.indexOf(currentItem);
  console.log(currentIndex);
});

ul.addEventListener("dragover", (event) => {
  event.preventDefault();
});

ul.addEventListener("drop", ({ target }) => {
  if (target.className == "draggable") {
    currentItem.remove(currentItem);
    for (let i = 0; i < listArr.length; i += 1) {
      if (listArr[i] === target) {
        indexDrop = i;
      }
    }
    console.log(currentIndex, indexDrop);
    if (currentIndex > indexDrop) {
      target.before(currentItem);
    } else {
      target.after(currentItem);
    }

		// todoList 순서 변경
		const temp = todoList[currentIndex];
		todoList[currentIndex] = todoList[indexDrop];
		todoList[indexDrop] = temp;
		saveTodo();
  }
});
