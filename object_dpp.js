function Object_defineProtectedProperty(obj,prop,descriptor) {
	function isCalledInbound(method) {
		for (let i in obj) {
	 		if (method.caller === obj[i]) return true;
	 	};
	 	return false;
	};
	let protectedProperty = (descriptor)?descriptor.value:undefined;
	let configurable = (!descriptor)?false:descriptor.configurable||false;
	Object.defineProperty(obj,prop,{
		 configurable: configurable
		,get:function getProperty() {
		 	if (isCalledInbound(getProperty)) return protectedProperty;
		}
		,set:function setProperty(value) {
		 	if (isCalledInbound(setProperty)) protectedProperty = value;
		}
	});
};