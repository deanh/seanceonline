import {Tarot} from "./tarot.ts";
import {DragBehavior} from "./dragBehavior.ts";

let t = new Tarot();

let div = document.getElementById("main");

let img = t.createNewCard(div);
let d = new DragBehavior(img);