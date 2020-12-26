import { Engine } from "./engine";

export interface GodotOptions {
	canvas: HTMLCanvasElement;
	path: String;

	staticRef?: any;
}


// https://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
export class Godot {

	public engine: Engine;

	private _path: String;
	private _stdoutHandles: Array<(output: String) => void> = [];
	private _stderrHandlers: Array<(output: String) => void> = [];
	private _progressHandlers: Array<(current: number, total: number) => void> = [];
	private _startHandlers: Array<() => void> = [];

	
	constructor(options: GodotOptions) {
		this.engine = new Engine();

		this.engine.setStdoutFunc( (output) => {
			for(var handler of this._stdoutHandles) {
				handler(output);
			}
		})

		this.engine.setStderrFunc( (output) => {
			for(var handler of this._stderrHandlers) {
				handler(output);
			}
		})

		this.engine.setProgressFunc( (current, total) => {
			for(var handler of this._progressHandlers) {
				handler(current, total)
			}
		})

		this._path = options.path;
		this.engine.setCanvas(options.canvas);
	}

	public async start(): Promise<void> {
		return new Promise((res,err) => {
			this.engine.startGame(this._path, this._path + ".pck").then(() => {
				let next = this._startHandlers.pop();
				while(next !== undefined) {
					next();
					next = this._startHandlers.pop()
				}
				res();
			})
		})
	}

	
	public on(event: 'stdout' | 'stderr', handler: (data: String) => void ): (data: String) => void;
	
	public on(event: 'progress', handler: (current: number, total:number) => void ): (current: number, total:number) => void;

	public on(event: 'start', handler: () => void): () => void;

	public on<T>(event: 'stdout' | 'stderr' | 'progress' | 'start', handler: T): T {
		if(event === 'stdout')
			this._stdoutHandles.push(handler as any);
		else if(event === 'stderr')
			this._stderrHandlers.push(handler as any);
		else if(event === 'progress')
			this._progressHandlers.push(handler as any);
		else
			this._startHandlers.push(handler as any);
		
		return handler;
	}


}