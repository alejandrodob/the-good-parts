context = describe;

describe("The javascript languaje and its good and bad parts", function() {

  describe("Objects", function() {

    it("are created with a link to Object.prototype, if created as literals", function() {
      var object = {};

      expect(Object.getPrototypeOf(object)).toBe(Object.prototype);
    });

    it("are created with a link to the prototype of the function that created them", function() {
      function Creator() {}
      var prototype = {method: function() {}};
      Creator.prototype = prototype;
      var obj = new Creator();

      expect(Object.getPrototypeOf(obj)).toBe(prototype);
    });

    it("inherit attributes from the prototype of the function that created them", function() {
      function Creator() {}
      Creator.prototype.attributeOne = 'attribute';
      var obj = new Creator();
      var inheritedAttribute = obj.attributeOne;

      expect(inheritedAttribute).toEqual('attribute');
    });

    it("have a constructor property, pointing to the function that created them", function() {
      function Creator() {}
      var obj = new Creator();

      expect(obj.constructor).toBe(Creator);
    });

  });

  describe("Functions", function() {

    describe("The prototype of a function and its prototype property", function() {

      it("are linked to Function.prototype, which represents the prototype of the function as an object", function() {
        var myFunc = function() {};

        expect(Object.getPrototypeOf(myFunc)).toBe(Function.prototype);
        expect(Object.getPrototypeOf(myFunc)).not.toBe(Object.prototype);
      });

      it("have an property called prototype", function() {
        var myFunc = function() {};
        var prototypeProperty = myFunc.prototype;

        expect(prototypeProperty).not.toBe(undefined);
      });

      it("the prototype of the function is not the same as the prototype property", function(){
        var myFunc = function() {};
        var prototypeProperty = myFunc.prototype;
        var _proto_ = Object.getPrototypeOf(myFunc);

        expect(_proto_=== prototypeProperty).toBeFalsy();
        });

      it("the prototype property is what objects created with 'new' will inherit", function() {
        var Creator = function() {};
        var obj = new Creator();
        var objectInheritedPrototype = Object.getPrototypeOf(obj);
        var prototypeProperty = Creator.prototype;

        expect(objectInheritedPrototype).toBe(prototypeProperty);
      });

      it("the prototype of the function as an object is not what objects created with 'new' will inherit", function() {
        var Creator = function() {};
        var obj = new Creator();
        var objectInheritedPrototype = Object.getPrototypeOf(obj);
        var functionPrototype = Object.getPrototypeOf(Creator);

        expect(Object.getPrototypeOf(obj)).not.toBe(functionPrototype);
      });

      it("has a constructor property inside its prototype property, being the function itself", function() {
        var myFunc = function() { return "Hey, I am a function"; };

        expect(myFunc.prototype.constructor).toBe(myFunc);
      });

    });

  });


});