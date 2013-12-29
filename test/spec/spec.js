context = describe;

describe("The javascript languaje and its good and bad parts", function() {

  describe("Objects", function() {

    it("are created with a link to Object.prototype, if created as literals", function() {
      var object = {};
      expect(Object.getPrototypeOf(object)).toEqual(Object.prototype);
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

    it();
  });


});