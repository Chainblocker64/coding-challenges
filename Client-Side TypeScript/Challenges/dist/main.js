"use strict";
/**
 * Hello Button
 */
const helloButton = document.getElementById("helloBtn");
const helloParagraph = document.getElementById("output");
helloButton.addEventListener("click", (event) => {
    helloParagraph.textContent = "Hello from TypeScript!";
});
/**
 * End Hello Button
 */
/**
 * Name Input
 */
const nameInput = document.getElementById("nameInput");
const nameButton = document.getElementById("submitBtn");
const nameDisplay = document.getElementById("displayName");
nameButton.addEventListener("click", (event) => {
    const name = nameInput.value;
    nameDisplay.textContent = name;
});
/**
 * End Name Input
 */
/**
 * Toggle Button
 */
const toggleButton = document.getElementById("toggleBtn");
const toggleText = document.getElementById("hiddenText");
toggleButton.addEventListener("click", (event) => {
    const displayState = toggleText.style.display;
    //Could do a ternary one-liner to set style instead of switch, would leave an empty style attribute on the element though
    switch (displayState) {
        case "none":
            toggleText.removeAttribute("style");
            break;
        default:
            toggleText.style.display = "none";
            break;
    }
});
/**
 * End Toggle Button
 */
/**
 * Item List
 */
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");
addButton.addEventListener("click", (event) => {
    const input = itemInput.value;
    if (!input) {
        return;
    }
    const listItem = document.createElement("li");
    listItem.textContent = input;
    listItem.append(deleteButton());
    itemList.append(listItem);
});
function deleteButton() {
    const button = document.createElement("button");
    button.classList.add("list-delete");
    button.textContent = "Delete";
    button.addEventListener("click", (event) => {
        button.closest("li")?.remove();
    });
    return button;
}
/**
 * End Item List
 */
/**
 * Counter
 */
const decreaseButton = document.getElementById("decreaseBtn");
const increaseButton = document.getElementById("increaseBtn");
const counter = document.getElementById("counter");
increaseButton.addEventListener("click", (event) => {
    let newCount = parseInt(counter.textContent) + 1;
    counter.textContent = String(newCount);
});
decreaseButton.addEventListener("click", (event) => {
    let newCount = parseInt(counter.textContent) - 1;
    counter.textContent = String(newCount);
});
/**
 * End Counter
 */
/**
 * Color Changer
 */
const colorSelect = document.getElementById("colorSelect");
const colorBox = document.getElementById("colorBox");
colorSelect.addEventListener("change", (event) => {
    colorBox.style.background = colorSelect.value;
});
/**
 * End Color Changer
 */
/**
 * Character Count
 */
const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
textInput.addEventListener("input", (event) => {
    const count = textInput.value.length;
    charCount.textContent = String(count);
});
//# sourceMappingURL=main.js.map