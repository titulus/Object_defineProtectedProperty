function Object_setProtectedProperty(className,name) {
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

		 	if (inset) return this[Symbol.for(name)];

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

		 	if (inset) this[Symbol.for(name)] = v;
		}
	});
};