function Object_defineProtectedProperty(obj,prop,descriptor) {
	function isCalledInbound(method) {
		for (let i in obj) {
	 		if (method.caller === obj[i]) return true;
	 	};
	 	return false;
	};
	let protectedProperty = (descriptor)?descriptor.value:undefined;
	Object.defineProperty(obj,prop,{
		 configurable: false
		,get:function getProperty() {
		 	if (isCalledInbound(getProperty)) return protectedProperty;
		}
		,set:function setProperty(value) {
		 	if (isCalledInbound(setProperty)) protectedProperty = value;
		}
	});
};