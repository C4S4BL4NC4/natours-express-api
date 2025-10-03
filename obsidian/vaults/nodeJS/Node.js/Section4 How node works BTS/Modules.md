[[Section4]]

Each #JavaScript file is treated like a separate module.

#NodeJS uses #CommonJS module system: `require(), exports, or module.exports`

ES module system is used in browsers: import/export.



#### What happens when we require() a module:

1. Resolving and Loading:
		1.  Start with *core modules*.
		2. if begins with *./* or *../* Try to load dev module
		3.  If no file found try to find folder with *index.js* in it.
		4. Else got to *node_modules* and try to find the module there.
	
2. Wrapping:
		Runtime put the module inside an iife (wrapper function) `passing exports, require, module __filename and __dirname`
	
3. Execution:
		Module code get executed.
	
4. Returning Exports:
		- require function return **exports** of the require module.
		- `module.exports` is a return object.
		- Use `module.exports` to export one single variable, e.g. one class or one function (`module.exports = Calculator`)
		- Use `exports` to export multiple named variables (exports.add = (a, b) => a + b)
	
5. Caching:
		Modules are cached when are first loaded. Meaning requiring them multiple times will only load them once.


`arguments` ==is an array that contains all the arguments we pass in a functions if it returns something at top level that means the whole file itself wrapped in a function(the IIFE we mentioned earlier)== 
