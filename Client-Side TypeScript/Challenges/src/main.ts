/**
 * Hello Button
 */
const helloButton = document.getElementById("helloBtn") as HTMLButtonElement;
const helloParagraph = document.getElementById(
  "output",
) as HTMLParagraphElement;

helloButton.addEventListener("click", (event: MouseEvent) => {
  helloParagraph.textContent = "Hello from TypeScript!";
});
/**
 * End Hello Button
 */

/**
 * Name Input
 */
const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const nameButton = document.getElementById("submitBtn") as HTMLButtonElement;
const nameDisplay = document.getElementById(
  "displayName",
) as HTMLParagraphElement;

nameButton.addEventListener("click", (event: MouseEvent) => {
  const name = nameInput.value;
  nameDisplay.textContent = name;
});
/**
 * End Name Input
 */

/**
 * Toggle Button
 */
const toggleButton = document.getElementById("toggleBtn") as HTMLInputElement;
const toggleText = document.getElementById("hiddenText") as HTMLButtonElement;

toggleButton.addEventListener("click", (event: MouseEvent) => {
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
const itemInput = document.getElementById("itemInput") as HTMLInputElement;
const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const itemList = document.getElementById("itemList") as HTMLUListElement;

addButton.addEventListener("click", (event: PointerEvent) => {
  const input = itemInput.value;

  if (!input) {
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = input;
  listItem.append(deleteButton());
  itemList.append(listItem);
});

function deleteButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.classList.add("list-delete");
  button.textContent = "Delete";

  button.addEventListener("click", (event: MouseEvent) => {
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
const decreaseButton = document.getElementById(
  "decreaseBtn",
) as HTMLInputElement;
const increaseButton = document.getElementById(
  "increaseBtn",
) as HTMLButtonElement;
const counter = document.getElementById("counter") as HTMLUListElement;

increaseButton.addEventListener("click", (event: MouseEvent) => {
  let newCount = parseInt(counter.textContent) + 1;
  counter.textContent = String(newCount);
});

decreaseButton.addEventListener("click", (event: MouseEvent) => {
  let newCount = parseInt(counter.textContent) - 1;
  counter.textContent = String(newCount);
});
/**
 * End Counter
 */

/**
 * Color Changer
 */
const colorSelect = document.getElementById("colorSelect") as HTMLSelectElement;
const colorBox = document.getElementById("colorBox") as HTMLButtonElement;

colorSelect.addEventListener("change", (event: Event) => {
  colorBox.style.background = colorSelect.value;
});

/**
 * End Color Changer
 */

/**
 * Character Count
 */
const textInput = document.getElementById("textInput") as HTMLInputElement;
const charCount = document.getElementById("charCount") as HTMLButtonElement;

textInput.addEventListener("input", (event: InputEvent) => {
  const count = textInput.value.length;
  charCount.textContent = String(count);
});

/**
 * End Character Count
 */
