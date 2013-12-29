context = describe;

describe("The javascript languaje and its good and bad parts", function() {

  describe("Objects", function() {

    it("inherit attributes from the prototype of the function that created them", function() {
        function CreateObject() {}
        CreateObject.prototype.attributeOne = 'attribute';
        var obj = new CreateObject();
        var inheritedAttribute = obj.attributeOne;

        expect(inheritedAttribute).toEqual('attribute');
    });

  });


});