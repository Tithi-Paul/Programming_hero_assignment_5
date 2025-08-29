# JavaScript DOM and Event Handling QA

## What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### `getElementById`
- Gets a single element by its unique ID.

### `getElementsByClassName`
- Returns a collection of elements that share the same class name.

### `querySelector`
- Returns the first element that matches a specified CSS selector.

### `querySelectorAll`
- Returns a collection of all elements that match a specified CSS selector.

---

## How do you create and insert a new element into the DOM?

- A new element is created using the `document.createElement()` method, which accepts the tag name as an argument.  
- The element can then be inserted into the DOM using methods such as:
  - `appendChild()` → Adds as the last child of a parent node.
  - `insertBefore()` → Inserts before a specified child node.

---

## What is Event Delegation in JavaScript? Why is it useful?

### Event Bubbling
- Event bubbling occurs when an event happens on an element, it first runs on that element, then passes up through its parent elements until it reaches the `document`.  
- Example: Clicking a `<p>` inside a `<div>` triggers the `<p>`’s click first, then the `<div>`, then `<body>`, and finally `document`.

### Event Delegation
- Event delegation uses event bubbling by placing one listener on a parent instead of many on children.  
- The parent checks `event.target` to see which child triggered it.  
- Benefits:
  - Improves performance (fewer listeners)
  - Works well with dynamically added elements

### What is the difference between preventDefault() and stopPropagation() methods?
- `preventDefault()` → Stops the browser’s default action (e.g., link navigation, form submit).  
- `stopPropagation()` → Stops the event from bubbling up to parent elements.
