const readlineSync = require("readline-sync");

console.log(`TODO List Application 
--------------`);

const appMenu: string = `Actions: 
1. Press 'a' to add a task. 
2. Press 'r' to remove a task. 
3. Press 'l' to view the task list. 
4. Press 'c' to change task status. 
5. Press 'e' to edit a task.
6. Press 'b' to exit the program.`;

console.log(appMenu);

const taskList: Task[] = [];

let programRunning: boolean = true;

type TaskStatus = "new" | "done";

class Task {
  description: string;
  status: TaskStatus = "new";
  constructor(description: string) {
    this.description = description;
  }

  isEmpty(): boolean {
    return this.description === "";
  }
}

function showHighlightText(text: string) {
  console.log("--------------");
  console.log(`${text}`);
  console.log("--------------");
}

function showAllTasks() {
  showHighlightText("YOUR TASKS");
  if (taskList.length === 0) {
    console.log("No tasks yet.");
    return;
  }
  taskList.forEach((el, index) =>
    console.log(`Task ${index + 1}: ${el.description}, status: ${el.status}`)
  );
}

function addTask() {
  const newTask = new Task(
    readlineSync.question("Enter your task, please: ").trim()
  );
  if (newTask.isEmpty()) {
    console.log("You can not add an empty task");
  } else {
    taskList.push(newTask);
    showHighlightText(
      `Task "${newTask.description}" has been added, status: ${newTask.status}`
    );
    console.log(appMenu);
  }
}

function removeTask() {
  showAllTasks();
  const taskNumForRemove = readlineSync.question(
    "Choose number of the task you want to delete: "
  );
  if (taskNumForRemove > 0 && taskNumForRemove <= taskList.length) {
    const removedTask = taskList.splice(taskNumForRemove - 1, 1)[0];
    showHighlightText(`Task "${removedTask.description}" was removed.`);
  } else {
    console.log("Invalid task number. Please try again.");
  }
  console.log(appMenu);
}

function changeTaskStatus() {
  showAllTasks();
  const taskNumForChangingStatus = readlineSync.question(
    "Choose number of the task you want to change to 'Done': "
  );
  if (
    taskNumForChangingStatus > 0 &&
    taskNumForChangingStatus <= taskList.length
  ) {
    const changedTask = taskList[taskNumForChangingStatus - 1];
    changedTask.status = "done";
    showHighlightText(`Task "${changedTask.description}" marked as 'Done'`);
  } else {
    console.log("Invalid task number. Please try again.");
  }
  console.log(appMenu);
}

function editTaskDescription() {
  showAllTasks();
  const taskNumForEditing = readlineSync.question(
    "Choose number of the task you want to edit: "
  );
  if (taskNumForEditing > 0 && taskNumForEditing <= taskList.length) {
    const editedDescription = readlineSync.question("Write a new text: ");
    taskList[taskNumForEditing - 1].description = editedDescription.trim();
    console.log(`Task ${taskNumForEditing} has been updated.`);
    showAllTasks();
  } else {
    console.log("Invalid task number. Please try again.");
  }
  console.log(appMenu);
}

while (programRunning) {
  const key = readlineSync.keyIn("", { hideEchoBack: true, mask: "" });

  switch (key) {
    case "a":
      addTask();
      break;

    case "r":
      removeTask();
      break;

    case "l":
      showAllTasks();
      break;

    case "c":
      changeTaskStatus();
      break;

    case "b":
      console.log("You exited the program");
      programRunning = false;
      break;

    case "e":
      editTaskDescription();
      break;

    default:
      console.log("Unknown command");
  }
}
