export class DragBehavior {
  static mouseX: number = 0;
  static mouseY: number = 0;

  constructor(el: HTMLElement) {
    el.classList.add("draggable");
    el.addEventListener("mousedown", DragBehavior.mouseDownHandler, true);
  }

  static mouseDownHandler(e: MouseEvent) {
    let el = e.target as HTMLElement;
    DragBehavior.mouseX = e.clientX;
    DragBehavior.mouseY = e.clientY;

    // Add the handlers for `mousemove` and `mouseup`
    console.log("in mousedown");
    document.addEventListener("mousemove", DragBehavior.mouseMoveHandler);
    document.addEventListener("mouseup", DragBehavior.mouseUpHandler);
  }

  static mouseMoveHandler(e: MouseEvent) {
    let el = e.target as HTMLElement;
    const dx = e.clientX - DragBehavior.mouseX;
    const dy = e.clientY - DragBehavior.mouseY;

    // Set the position of element
    console.log("in mousemove");
    el.style.top = `${el.offsetTop + dy}px`;
    el.style.left = `${el.offsetLeft + dx}px`;

    // Reassign the position of mouse
    DragBehavior.mouseX = e.clientX;
    DragBehavior.mouseY = e.clientY;
  }

  static mouseUpHandler(e: MouseEvent) {
    let el = e.target as HTMLElement;
    console.log('in mouseup')
    console.log(DragBehavior.mouseX);
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", DragBehavior.mouseMoveHandler);
    document.removeEventListener("mouseup", DragBehavior.mouseUpHandler);
  }
}
