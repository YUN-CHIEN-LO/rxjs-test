import { fromEvent } from "rxjs";
import { bufferTime, filter } from "rxjs/operators";

const btn = document.getElementById("btn");
const click = fromEvent(btn, 'click').pipe(
  bufferTime(500),
  filter(arr=>arr.length >= 2)
);
click.subscribe({
  next: (value) => {
    console.log('success');
  },
  error: (err) => {
    console.log("Error: " + err);
  },
  complete: () => {
    console.log("complete");
  },
});
