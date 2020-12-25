/**
 * Based off
 * https://docs.godotengine.org/en/stable/tutorials/platform/html5_shell_classref.html
 */
export declare class Engine {

	/**
	 * Load the engine from the specified base path.
	 * @param basePath Base path of the engine to load.
	 * @returns Promise which resolves once the engine is loaded.
	 */
	public static load(basePath: String): Promise<any>;

	/**
	 * Unload the engine to free memory.
	 * This method is called automatically once the engine is started unless explicitly disabled using `engine.setUnloadAfterInit()`.
	 */
	public static unload(): void;

	/**
	 * Check whether WebGL is available. Optionally, specify a particular version of WebGL to check for.
	 * @param majorVersion The major WebGL version to check for. Defaults to `1` for *WebGL 1.0.*
	 * @returns `true` if the given major version of WebGL is available, `false` otherwise.
	 */
	public static isWebGLAvailable(majorVersion?: number): boolean;

	/**
	 * Set an alternative filename extension for the WebAssembly module. By default it is assumed to be `wasm`.
	 * @param extension Filename extension without preceding dot.
	 */
	public static setWebAssemblyFilenameExtension(extension: String): void;

	/**
	 * The runtime environment provided by Emscripten's `Module`. For more information refer to the [official documentation](https://emscripten.org/docs/api_reference/module.html) on Emscripten.
	 */
	public rtenv: any;

	/**
	 * Create a new instance of the `Engine` class.
	 */
	constructor();

	/**
	 * Initialize the engine instance. Optionally, pass the base path to the engine to load it, if it hasn't been loaded yet. See `Engine.load()`
	 * @param basePath Base path of the engine to load.
	 * @returns Promise that resolves once the engine is loaded and initialized.
	 */
	public init(basePath?: String): Promise<any>;

	/**
	 * Load a file so it is available in the instance's file system once it runs. Must be called **before** starting the instance.
	 * @param file If type is `string`, the file will be loaded from that path.
	 * 
	 * If type is `ArrayBuffer` or a view on one, the buffer will used as the content of the file.
	 * @param path Path by which the file will be accessible. Required, if `file` is not a string. If not passed, the path is derived from the URL of the loaded file.
	 * @returns Promise that resolves once the file is loaded.
	 */
	public preloadFile(file: String | ArrayBuffer, path?: String): Promise<any>;

	/**
	 * Start the instance of the engine, using the passed strings as command line arguments.`engine.startGame()` can be used in typical cases instead.
	 * 
	 * This will initialize the instance if it is not initialized. For manual initialization, see `engine.init()`. The engine must be loaded beforehand.
	 * 
	 * Fails if a canvas cannot be found on the page.
	 * @param args Command line argument(s)
	 * @returns Promise that resolves once the engine started.
	 */
	public start(...args: String[]): Promise<any>;


	/**
	 * Start the game instance using the given executable URL and main pack URL.
	 * 
	 * This will initialize the instance if it is not initialized. For manual initialization, see `engine.init()`.
	 * 
	 * This will load the engine if it is not loaded. The base path of the executable URL will be used as the engine base path.
	 * @param execName Executable name in a form of URL, omitting filename extension.
	 * @param mainPack URL of the main pack to start the game.
	 * @returns Promise that resolves once the game started.
	 */
	public startGame(execName: String, mainPack: String): Promise<any>;

	/**
	 * Specify whether the engine will be unloaded automatically after the instance is initialized. Enabled by default.
	 * @param enabled `true` if the engine shall be unloaded after initializing, `false` otherwise.
	 */
	public setUnloadAfterInit(enabled: boolean): void;

	/**
	 * Specify a canvas HTML element to use. By default, the first canvas element on the page is used for rendering.
	 * @param canvasElem The canvas element to use.
	 */
	public setCanvas(canvasElem: HTMLCanvasElement): void;

	/**
	 * Specifies whether the canvas will be resized to the width and height specified in the project settings on start. Enabled by default.
	 * @param enabled `true` if the canvas shall be resized on start, `false` otherwise.
	 */
	public setCanvasResizedOnStart(enabled: boolean): void;

	/**
	 * Specify a language code to select the proper localization for the game.
	 * 
	 * Complete list of [supported locales](https://docs.godotengine.org/en/stable/tutorials/i18n/locales.html#doc-locales).
	 * @param locale Language code.
	 */
	public setLocale(locale: String): void;

	/**
	 * Specify the virtual filename of the executable. By default, the base name of the loaded engine files is used.
	 * This affects the output of [OS.get_executable_path()](https://docs.godotengine.org/en/stable/classes/class_os.html#class-os-method-get-executable-path) and sets the automatically started main pack to `ExecutableName.pck`.
	 * @param execName Executable name.
	 */
	public setExecutableName(execName: String): void;

	/**
	 * Specify a callback function for displaying download progress. The callback function is called once per frame, so that the usage of `requestAnimationFrame()` is not necessary.
	 * 
	 * If the callback function receives a total amount of bytes as 0, this means that it is impossible to calculate. Possible reasons include:
	 * 
	 * - Files are delivered with server-side chunked compression
	 * - Files are delivered with server-side compression on Chromium
	 * - Not all file downloads have started yet (usually on servers without multi-threading)
	 * @param callback The callback function must accept two numeric arguments: the amount of bytes loaded so far, and the total number of bytes to load.
	 */
	public setProgressFunc(callback: Function): void;

	/**
	 * Specify a callback function for handling the standard output stream. This method should usually only be used in debug pages. By default, `console.log()` is used.
	 * @param callback The callback function must accept one string argument: the message to print.
	 */
	public setStdoutFunc(callback: Function): void;

	/**
	 * Specify a callback function for handling the standard error stream. This method should usually only be used in debug pages. By default, `console.warn()` is used.
	 * @param callback The callback function must accept one string argument: the message to print.
	 */
	public setStderrFunc(callback: Function): void;

}