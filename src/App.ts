/*
 * App.ts
 * ===========
 * Entry from Webpack, generates Three.js View
 */

import { Clock } from "three";
import View from "./webgl/View";

class App {
	private view: View;
	private clock: Clock;

	constructor() {
		const canvasBox = <HTMLCanvasElement>document.getElementById("webgl-canvas");
		this.view = new View(canvasBox);
		this.clock = new Clock();
		window.addEventListener("resize", this.resize);
		this.update(0);
	}

	private resize = (): void => {
		this.view.onWindowResize(window.innerWidth, window.innerHeight);
	}

	private update = (time: number): void => {
		const deltaTime = this.clock.getDelta();
		this.view.update(deltaTime);
		requestAnimationFrame(this.update);
	}
}

const app = new App();
