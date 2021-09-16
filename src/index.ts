import { fromEvent } from "rxjs";
import { delay, map } from "rxjs/operators";
const imgList = document.getElementsByTagName("img");
const movePos = fromEvent(document, "mousemove").pipe(
  map((e: any) => ({ x: e.clientX, y: e.clientY }))
);

function followMouse(DOMarr: any[]):void{
  const delayTime = 600;
  DOMarr.forEach((element:any, index:number) => {
    movePos.pipe(
      delay(delayTime*(Math.pow(0.65, index) + Math.cos(index/4))/2)
    ).subscribe(pos=>{
      element.style.transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
    });
  });
}

followMouse(Array.from(imgList))

