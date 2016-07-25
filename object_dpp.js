function Object_defineProtectedProperty(obj,prop) {
	function isCalledInbound(method) {
		for (let i in obj) {
	 		if (!obj.hasOwnProperty(i)) continue;
	 		if (method.caller === obj[i]) return true;
	 	};
	 	return false;
	};

	let protectedProperty;
	Object.defineProperty(obj,prop,{
		 configurable: false
		,get:function getProperty() {
		 	if (isCalledInbound(getProperty)) return this[protectedProperty];

		 	return undefined;
		}
		,set:function setProperty(value) {
			if (!protectedProperty) protectedProperty = Symbol();

		 	if (isCalledInbound(setProperty)) this[protectedProperty] = value;
		}
	});
};