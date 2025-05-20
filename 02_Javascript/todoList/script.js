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

	// todo를 찾아서 checked값을 변경: id로 찾아야되겟다. 
	const newTodos = todoList.map((todo) => {
		if (todo.todoId === Number(li.dataset.id)) { 
			// todo.todoDone = !todo.todoDone; // 원본데이터를 직접수정하면 안된다. map이 새로운 배열을 반환하더라도 원본을 변경함
      return {
        ...todo,
        todoDone: !todo.todoDone,
      };
		}
		return todo;
	});
  console.log("newTodos", newTodos); 
  todoList = newTodos;
	saveTodo();
}

const deleteTodo = (e) => {
  const li = e.target.parentNode;

  console.log("삭제됨")
	todoList = todoList.filter((todo) => todo.todoId !== Number(li.dataset.id));
	saveTodo();
  li.remove();
};

const saveTodo = () => {
	localStorage.setItem("todoList_ls", JSON.stringify(todoList));
};

const addTodo = (inputValue, isChecked) => {
  const toBeAdded = {
    todoId: new Date().getTime(),
    text: inputValue, 
    todoDone: isChecked
  }
	todoList.push(toBeAdded);
	saveTodo();
	// console.log("todoList", todoList);
  drawTodo(toBeAdded);
};

const drawTodo = (todo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkbox = document.createElement("input");

  console.log("todo", todo);
  span.textContent = todo.text;
  li.style.cssText = "display: block;";
  li.draggable = true;
  li.className = "draggable";
  li.dataset.id = todo.todoId; // dataset을 통해 data-id 속성 추가. 단축API

  // checkbox 추가
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.style.cssText = "margin-right: 10px;";
  if (todo.todoDone) {
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
};
document.getElementById("add-btn").addEventListener("click", () => {
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
  if (loadedTodos !== null) {
    const parsedTodos = loadedTodos ? JSON.parse(loadedTodos) : [];
    // todoList = parsedTodos;
    todoList = Array.isArray(parsedTodos) ? parsedTodos : [];
    parsedTodos.forEach((todo) => drawTodo(todo));
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

		// todoList 순서 변경: 원본 배열을 수정 -> 권장X
		// const temp = todoList[currentIndex];
		// todoList[currentIndex] = todoList[indexDrop];
		// todoList[indexDrop] = temp;

    const newTodos = [...todoList];
    const movedItem = newTodos.splice(currentIndex, 1)[0]; // 기존 위치에서 삭제
    newTodos.splice(indexDrop, 0, movedItem); // 새로운 위치에 추가
    todoList = newTodos; // 새로운 배열로 교체
		saveTodo();
  }
});
