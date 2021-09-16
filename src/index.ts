import { fromEvent, EMPTY } from "rxjs";
import { mapTo, startWith, merge, scan } from "rxjs/operators";

const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const number = document.getElementById("number");

const plusClick = fromEvent(plusBtn, "click").pipe(mapTo(1));
const minusClick = fromEvent(minusBtn, "click").pipe(mapTo(-1));


const numberstate = EMPTY;
numberstate
  .pipe(
    startWith(0),
    merge(plusClick, minusClick),
    scan((origin: number, next: number) => {
      return origin + next;
    }, 0)
  )
  .subscribe({
    next: (val) => {
      console.log(val);
      number.innerText = val.toString();
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log("complete");
    },
  });
