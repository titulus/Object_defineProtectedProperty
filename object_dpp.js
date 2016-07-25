function Object_defineProtectedProperty(className,name) {
	function isCalledInbound(method) {
		for (let i in className.prototype) {
	 		if (!className.prototype.hasOwnProperty(i)) continue;
	 		if (method.caller === className.prototype[i]) return true;
	 	};
	 	return false;
	};

	let protectedProperty;
	Object.defineProperty(className.prototype,name,{
		 configurable: false
		,get:function getProperty() {
		 	if (isCalledInbound(getProperty)) return this[protectedProperty];

		 	return undefined;
		}
		,set:function setProperty(value) {
		 	if (isCalledInbound(setProperty)) this[protectedProperty = Symbol()] = value;
		}
	});
};