const assert = require('assert');
const Object_defineProtectedProperty = require('../')

describe('single Object',function(){
    const testingObject = {
        id:'testingObject'
        ,setProtected:function(value){
            this.protectedProperty = value;
        }
        ,getProtected:function(){
            return this.protectedProperty;
        }
    };
    Object_defineProtectedProperty(testingObject,'protectedProperty')
    it('protectedProperty is unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` when getting outside from object methods');
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` after attempt to set it from outside');
    });
    it('protectedProperty is availible inside',function(){
        assert.deepStrictEqual(testingObject.getProtected(),undefined,'getProtected() should return `undefined` because property is not setted yet');
        testingObject.setProtected('setted inside');
        assert.equal(testingObject.getProtected(),'setted inside','getProtected() should return "setted inside" after setting from inside');
    });
    it('protectedProperty is still unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
    });
});
describe('getter & setter in [[Prototype]]',function(){
    const testingObject = {
        id:'testingObject'
    };
    const prototype = {
        id:'prototype'
        ,setProtected:function(value){
            this.protectedProperty = value;
        }
        ,getProtected:function(){
            return this.protectedProperty;
        }
    };
    testingObject.__proto__ = prototype;
    Object_defineProtectedProperty(testingObject,'protectedProperty')
    it('protectedProperty is unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` when getting outside from object methods');
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` after attempt to set it from outside');
    });
    it('protectedProperty is availible inside',function(){
        assert.deepStrictEqual(testingObject.getProtected(),undefined,'getProtected() should return `undefined` because property is not setted yet');
        testingObject.setProtected('setted inside');
        assert.equal(testingObject.getProtected(),'setted inside','getProtected() should return "setted inside" after setting from inside');
    });
    it('protectedProperty is still unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
    });
});
describe('protectedProperty in [[Prototype]]',function(){
    const testingObject = {
        id:'testingObject'
        ,setProtected:function(value){
            this.protectedProperty = value;
        }
        ,getProtected:function(){
            return this.protectedProperty;
        }
    };
    const prototype = {
        id:'prototype'
    };
    testingObject.__proto__ = prototype;
    Object_defineProtectedProperty(prototype,'protectedProperty')
    it('protectedProperty is unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` when getting outside from object methods');
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` after attempt to set it from outside');
    });
    it('protectedProperty is unavailible in nested object',function(){
        assert.deepStrictEqual(testingObject.getProtected(),undefined,'getProtected() should return `undefined` because property is not setted yet');
        testingObject.setProtected('setted in nested');
        assert.equal(testingObject.getProtected(),undefined,'getProtected() should return `undefined` after setting from inside');
    });
    it('protectedProperty is still unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
    });
});
describe('redefine protectedProperty',function(){
    const testingObject = {
        id:'testingObject'
    };
    Object_defineProtectedProperty(testingObject,'protectedProperty');
    it('protectedProperty throws error when redifined',function(){
        assert.throws(function(){
            Object_defineProtectedProperty(testingObject,'protectedProperty');
        },Error,'Object_defineProtectedProperty should throw Error when called for already defined protectedProperty');
    });
});
describe('define with value',function(){
    const testingObject = {
        id:'testingObject'
        ,setProtected:function(value){
            this.protectedProperty = value;
        }
        ,getProtected:function(){
            return this.protectedProperty;
        }
    };
    Object_defineProtectedProperty(testingObject,'protectedProperty',{value:'setted via descriptor'})
    it('protectedProperty is unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` when getting outside from object methods');
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined,'property should return `undefined` after attempt to set it from outside');
    });
    it('protectedProperty is availible inside',function(){
        assert.deepStrictEqual(testingObject.getProtected(),'setted via descriptor','getProtected() should return "setted via descriptor" because property is not setted yet');
        testingObject.setProtected('setted inside');
        assert.equal(testingObject.getProtected(),'setted inside','getProtected() should return "setted inside" after setting from inside');
    });
    it('protectedProperty is still unavailible outside',function(){
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
        testingObject.protectedProperty = 'setted outside';
        assert.deepStrictEqual(testingObject.protectedProperty,undefined);
    });
});
describe('redefineable protectedProperty',function(){
    const testingObject = {
        id:'testingObject'
        ,setProtected:function(value){
            this.protectedProperty = value;
        }
        ,getProtected:function(){
            return this.protectedProperty;
        }
    };
    Object_defineProtectedProperty(testingObject,'protectedProperty',{configurable:true});
    it('protectedProperty successfully redifined',function(){
        assert.doesNotThrow(function(){
            Object_defineProtectedProperty(testingObject,'protectedProperty',{value:'setted while redifined'});
        },Error,'Object_defineProtectedProperty should not throw Error when called for already defined protectedProperty with descriptor.configurable==true');
        assert.equal(testingObject.getProtected(),'setted while redifined','getProtected() should return "setted while redifined" after redifining');
    });
});