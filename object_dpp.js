function Object_defineProtectedProperty(obj,prop,descriptor) {
	function isCalledInbound(method) {
		for (let i in obj) {
	 		if (!obj.hasOwnProperty(i)) continue;
	 		if (method.caller === obj[i]) return true;
	 	};
	 	return false;
	};
	let protectedProperties = new WeakMap();
	Object.defineProperty(obj,prop,{
		 configurable: false
		,get:function getProperty() {
		 	if (isCalledInbound(getProperty)) return protectedProperties.get(this);

		 	return undefined;
		}
		,set:function setProperty(value) {
		 	if (isCalledInbound(setProperty)) protectedProperties.set(this,value);
		}
	});
};