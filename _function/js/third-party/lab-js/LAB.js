// LAB.js (LABjs :: Loading And Blocking JavaScript)
// v0.9 (c) Kyle Simpson
// MIT License

(function(global){
	var sUNDEF = "undefined",				// constants used for compression optimization
		sSTRING = "string",
		sHEAD = "head",
		sBODY = "body",
		bFALSE = !1,
		bTRUE = !bFALSE,
		oDOC = global.document,
		fSETTIMEOUT = global.setTimeout,
		fGETELEMENTSBYTAGNAME = function(tn){return oDOC.getElementsByTagName(tn);},
		append_to = {},
		all_scripts = {},
		docScripts = fGETELEMENTSBYTAGNAME("script");
		
	append_to[sHEAD] = fGETELEMENTSBYTAGNAME(sHEAD)[0];
	append_to[sBODY] = fGETELEMENTSBYTAGNAME(sBODY)[0];
	
	function scriptFilename(src) { // extracts just the filename from a script's URL
		return (typeof src === sSTRING && src.length) ? /^([^#?]*\/)?([^?\/#]*)(\?.*)?(#.*)?$/i.exec(src)[2] : "";
	}
	
	function scriptTagExists(filename) { // checks if a script filename has ever been loaded into this page's DOM
		var i = 0, script;
		while (script = docScripts[i++]) {
			if (typeof script.src === sSTRING && filename === scriptFilename(script.src)) return bTRUE;
		}
		return bFALSE;
	}
		
	function engine(queueExec,which,wfunc) {
		queueExec = !(!queueExec);
		which = ((typeof which === sSTRING) ? which : sHEAD);
		
		var ready = bFALSE,
			wait = function(){},
			scripts_loading = bFALSE,
			publicAPI = null,
			scripts = {},
			exec = [];
						
		function handleScriptLoad(scriptentry) {
			if ((this.readyState && this.readyState!=="complete" && this.readyState!=="loaded") || scriptentry.done) { return; }
			this.onload = this.onreadystatechange = null; // prevent memory leak
			scriptentry.done = bTRUE;
			function isReady() {
				for (var key in scripts) {
					if (scripts.hasOwnProperty(key) && !(scripts[key].done)) return bFALSE;
				}
				return (ready = bTRUE); // assign 'true' to ready, then return it
			}
			if (isReady()) wait();
		}

		function loadScript(o) {
			var src = o.src, type = o.type, charset = o.charset, allowDup = o.allowDup, src_filename = scriptFilename(src);
			if (typeof type !== sSTRING) type = "text/javascript";
			if (typeof charset !== sSTRING) charset = null;
			allowDup = !(!allowDup);
			if (!allowDup && (typeof all_scripts[src_filename] !== sUNDEF || scriptTagExists(src_filename))) return;
			if (typeof scripts[src_filename] === sUNDEF) scripts[src_filename] = {};
			scripts[src_filename].done = bFALSE;
			all_scripts[src_filename] = bTRUE;
			scripts_loading = bTRUE;
			(function(_which){
				fSETTIMEOUT(function appendScript(){
					if (append_to[_which] === null) { // append_to object not yet ready
						fSETTIMEOUT(appendScript,25); 
						return;
					}
					var scriptElem = oDOC.createElement("script");
					scriptElem.setAttribute("type",type);
					if (typeof charset === sSTRING) scriptElem.setAttribute("charset",charset);
					scriptElem.onload = scriptElem.onreadystatechange = function(){handleScriptLoad.call(scriptElem,scripts[src_filename]);};
					scriptElem.setAttribute("src",src);
					append_to[_which].appendChild(scriptElem);
				},0);
			})(which);
		}
		
		function executeOrQueue(execBody) { // helper for publicAPI functions below
			if (queueExec) exec.push(execBody);	// if engine is in queueing mode, queue up execution for later
			else execBody(); // else, go ahead and execute
		}
				
		publicAPI = {
			script:function() {
				var args = arguments;
				executeOrQueue(function fn(){
					for (var i=0; i<args.length; i++) {
						if (Object.prototype.toString.call(args[i]) === "[object Array]") 
							// recurse back into this anonymous function with parameters as items of the 
							// current array parameter encountered
							fn.apply(null,args[i]); 
						else if (typeof args[i] === "object") loadScript(args[i]);
						else if (typeof args[i] === sSTRING) loadScript({src:args[i]});
					}				
				});
				return publicAPI;
			},
			block:function(func) {
				if (typeof func !== "function") func = function(){};
				
				// On this current chain's wait function, tack on call to trigger the queue for the *next* engine 
				// in the chain, which will be executed when the current chain finishes loading
				var e = engine(bTRUE,which),	// 'bTRUE' tells the engine to be in queueing mode
												// 'which' captures the current state of which so the queued engine
												// knows about that state even if it changes before the engine triggers.
					triggerNextChain = e.trigger, // store ref to e's trigger function for use by 'wfunc'
					wfunc = function(){ try { func(); } catch(err) {} triggerNextChain(); };
				delete e.trigger; // remove the 'trigger' property from e's public API, since only used internally
				executeOrQueue(function(){
					if (scripts_loading && !ready) wait = wfunc;
					else fSETTIMEOUT(wfunc,0);
				});
				return e;
			},
			toHEAD:function(){
				executeOrQueue(function(){ which=sHEAD; });
				return publicAPI;
			},
			toBODY:function(){
				executeOrQueue(function(){ which=sBODY; });
				return publicAPI;
			}
		};
		if (queueExec) {
			// if queueing, return a function that the previous chain's wait function can use to trigger this 
			// engine's queue. NOTE: this trigger function is not exposed to the public chain API.
			publicAPI.trigger = function() {
				for (var i=0; i<exec.length; i++) exec[i]();
			}
		}
		return publicAPI;
	};
		
	global.$LAB = {
		script:function(){ // will load one or more scripts in parallel
			return engine().script.apply(null,arguments);
		},
		block:function(){ // will 'stop' the execution chain until the previously called scripts are all loaded
			return engine().block.apply(null,arguments);
		},
		toHEAD:function(){ // will switch to appending scripts to the HEAD of the document
			return engine().toHEAD();
		},
		toBODY:function(){ // will switch to appending scripts to the BODY of the document
			return engine().toBODY();
		}
	};
})(window);