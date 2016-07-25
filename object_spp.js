function Object_setProtectedProperty(className,name) {
	let protectedProperty;
	Object.defineProperty(className.prototype,name,{
		 configurable: false
		,get:function getProperty() {
		 	let inset = false
		 	for (let i in className.prototype) {
		 		if (!className.prototype.hasOwnProperty(i)) continue;
		 		if (getProperty.caller === className.prototype[i]) {
		 			inset = true;
		 			break;
		 		};
		 	};

		 	if (inset) return this[protectedProperty];

		 	return undefined;
		}
		,set:function setProperty(v) {
			let inset = false
		 	for (let i in className.prototype) {
		 		if (!className.prototype.hasOwnProperty(i)) continue;
		 		if (setProperty.caller === className.prototype[i]) {
		 			inset = true;
		 			break;
		 		};
		 	};

		 	if (inset) this[protectedProperty = Symbol()] = v;
		}
	});
};