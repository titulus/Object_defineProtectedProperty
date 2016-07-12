function Object_setProtectedProperty(className,name) {
	Object.defineProperty(className.prototype,name,{
		 configurable: false
		,get:function getProperty() {
		 	var inset = false
		 	for (var i in className.prototype) {
		 		if (!className.prototype.hasOwnProperty(i)) continue;
		 		if (getProperty.caller === className.prototype[i]) {
		 			inset = true;
		 			break;
		 		}
		 	}

		 	console.log('inset:',inset);
			return (inset)?this['_'+name]:undefined;
		}
		,set:function setProperty(v) {
			var inset = false
		 	for (var i in className.prototype) {
		 		if (!className.prototype.hasOwnProperty(i)) continue;
		 		if (setProperty.caller === className.prototype[i]) {
		 			inset = true;
		 			break;
		 		}
		 	}

		 	console.log('inset:',inset);
		 	if (inset) {
		 		Object.defineProperty(this,'_'+name,{
					 enumerable: false
					,writable: false
					,configurable:true
					,value:v
				})
		 	}
		}
	})
}