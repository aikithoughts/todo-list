// If an li element is clicked, toggle the class "done" on the <li>

// If a delete link is clicked, delete the li element / remove from the DOM

// If an 'Add' link is clicked, adds the item as a new list item with
// addListItem function has been started to help you get going!
// Make sure to add an event listener(s) to your new <li> (if needed)

const todayList = document.querySelector('#sortable-list');

const addListItem = function(e) {
  e.preventDefault();
  const input = this.parentNode.querySelector('input');
  const text = input.value;

  if (input.value !== '') {
    const newItem = createDraggableListItem(`<span>${text}</span><a class="delete">Delete</a>`);
    todayList.appendChild(newItem);
    input.value = '';
  }
};

const addButton = document.querySelector('.add-item');
const taskList = document.querySelector('.today-list');

addButton.addEventListener('click', addListItem);


todayList.addEventListener('click', function(e) {
  if (e.target) {
    const listItem = e.target.closest('li');

    if (e.target.classList.contains('delete')) {
      listItem.remove();
    } else {
      listItem.classList.toggle('done');
    }
  }
});

// Set a visual cue that you're dragging something.
todayList.addEventListener('dragstart', function(e) {
  const draggedElement = e.target;
  draggedElement.classList.toggle('dragging');
  e.dataTransfer.setData('text/plain', e.target.innerHTML);
  e.target.style.opacity = '0.5';
});

// Learning about dragover!
todayList.addEventListener('dragover', function (e) {
  e.preventDefault();
  const draggedElement = document.querySelector('.dragging');
  const targetElement = e.target;

  if (targetElement.tagName === 'LI' && draggedElement !== targetElement) {

    const rect = targetElement.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;

    if (e.clientY < midY ) {
      targetElement.parentNode.insertBefore(draggedElement, targetElement);
    } else {
      targetElement.parentNode.insertBefore(draggedElement, targetElement.nextElementSibling);
    }
  }
});


// Now handle what happens when we drop the list item.
todayList.addEventListener('drop', function(e) {
  e.preventDefault();

  const data = e.dataTransfer.getData('text/plain');
  const draggedElement = document.querySelector('.dragging');

  // Check if the dataTransfer contains data (external source)
  if (data && draggedElement) {
    const newItem = createDraggableListItem(data);

    // Find the target element
    const targetElement = e.target.closest('li');

    // Insert the new item at the correct position
    if (targetElement) {
      targetElement.parentNode.insertBefore(newItem, targetElement);
    } else {
      todayList.appendChild(newItem);
    }

    // Remove the original dragged element
    draggedElement.remove();
  }
});

function createDraggableListItem(info) {
  const listItem = document.createElement('li');
  listItem.innerHTML = info;
  listItem.setAttribute("draggable", "true");
  return listItem;
}







