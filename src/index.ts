import { fromEvent } from "rxjs";
import { map, filter, takeUntil, concatAll, withLatestFrom } from "rxjs/operators";

const video = document.getElementById("video");
const anchor = document.getElementById("anchor");

const scroll = fromEvent(document, "scroll");
const mouseDown = fromEvent(video, "mousedown");
const mouserUp = fromEvent(document, "mouseup");
const mouseMove = fromEvent(document, "mousemove");

const validValue = (value:number, max:number, min:number):number => {
  return Math.min(Math.max(value, min), max)
}

scroll.pipe(map((e) => anchor.getBoundingClientRect().bottom < 0)).subscribe({
  next: (val) => {
    console.log(val);
    if (val) {
      video.classList.add("video-fixed");
    } else {
      video.classList.remove("video-fixed");
    }
  },
  complete: () => {
    console.log("complete");
  },
  error: (error) => {
    console.log(error);
  },
});

mouseDown.pipe(
  filter((e) => video.classList.contains("video-fixed")),
  map((e) => mouseMove.pipe(takeUntil(mouserUp))),
  concatAll(),
  withLatestFrom(mouseDown, (move:any, down:any)=>{
    return {
      x: validValue(move.clientX - down.offsetX, window.innerWidth - video.getBoundingClientRect().width, 0),
      y: validValue(move.clientY - down.offsetY, window.innerHeight - video.getBoundingClientRect().height, 0)
    }
  })
).subscribe(pos => {
  video.style.top = pos.y + 'px';
  video.style.left = pos.x + 'px';
});
