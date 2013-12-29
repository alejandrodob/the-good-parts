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

      expect(Object.getPrototypeOf(obj)).toEqual(prototype);
    });

    it("inherit attributes from the prototype of the function that created them", function() {
      function CreateObject() {}
      CreateObject.prototype.attributeOne = 'attribute';
      var obj = new CreateObject();
      var inheritedAttribute = obj.attributeOne;

      expect(inheritedAttribute).toEqual('attribute');
    });

  });

  describe("Functions", function() {

    it("are linked to Function.prototype, which represents the prototype of the function as an object", function() {
      var myFunc = function() {};

      expect(Object.getPrototypeOf(myFunc)).toBe(Function.prototype);
      expect(Object.getPrototypeOf(myFunc)).not.toBe(Object.prototype);
    });

    it("have an attribute called prototype", function() {
      var myFunc = function() {};
      var prototypeAttr = myFunc.prototype;

      expect(prototypeAttr).not.toBe(undefined);
    });

    it("the prototype of the function is not the same as the prototype attribute", function(){
      var myFunc = function() {};
      var prototypeAttr = myFunc.prototype;
      var _proto_ = Object.getPrototypeOf(myFunc);

      expect(_proto_=== prototypeAttr).toBeFalsy();
      });

  });


});