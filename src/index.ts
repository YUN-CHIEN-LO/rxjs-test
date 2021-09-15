import { fromEvent } from "rxjs";
import { map, takeUntil, concatAll } from "rxjs/operators";

const dragDOM = document.getElementById("drag");
const body = document.body;

let mouseDown = fromEvent(dragDOM, "mousedown");
let mouseUp = fromEvent(dragDOM, "mouseup");
let mouseMove = fromEvent(body, "mousemove");

const source = mouseDown.pipe(
  map((event: any) => mouseMove.pipe(takeUntil(mouseUp))),
  concatAll(),
  map((event: any) => {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  })
);
source.subscribe((pos) => {
  dragDOM.style.left = pos.x + "px";
  dragDOM.style.top = pos.y + "px";
});

let subscriber = {
  next: (val: any) => {
    console.log(val);
  },
  complete: () => {
    console.log("complete");
  },
  error: (error: any) => {
    console.log(error);
  },
};
