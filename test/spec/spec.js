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

    it("can be created with the Object.create method", function() {
      // Object.create takes an object as an argument, and returns a new object
      // with prototype the object passed to it
      // First, add create method, in case is not supported by browser
      if (typeof Object.create !== "function") {
        Object.create = function(o) {
          function F() {}
          F.prototype = o || {};
          return new F();
        };
      }

      var prototype = {hello: function() { return 'hello';} };
      var obj = Object.create(prototype);

      expect(Object.getPrototypeOf(obj)).toBe(prototype);
      expect(obj.constructor).toBe(Object);
    });

  });

  describe("Functions", function() {

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

  describe("Inheritance types", function() {

    describe("Pseudoclassical", function() {
      var Mammal = function(name) {
        this.name = name;
      };
      Mammal.prototype.get_name = function() {
        return this.name;
      };
      Mammal.prototype.saying = function() {
        return this.saying || '';
      };

      it("can simulate classes to produce objects", function() {
        var myMammal = new Mammal('Monkey the mammal');

        // gets methods defined by the 'class'
        expect(myMammal.get_name).toBeTruthy();
        expect(myMammal.saying).toBeTruthy();
      });

      it("can define a class that inherits from another", function() {
        // Define a new class
        var Cat = function(name) {
          this.name = name;
          this.saying = 'meow';
        };
        // Define the inheritance relationship
        Cat.prototype = new Mammal();
        // Add new methods to Cat class
        Cat.prototype.purr = function() {
          return 'r-r-r';
        };

        var myCat = new Cat('Silvestre');

        //gets methods defined by Mammal, as well as own Cat methods
        expect(myCat.get_name()).toBe('Silvestre');
        expect(myCat.saying).toBeTruthy();
        expect(myCat.purr).toBeTruthy();
      });

      it("can do all the previous with a little sintactic sugar", function() {
        Function.prototype.inherits = function(Parent) {
          this.prototype = new Parent();
          return this;
        };

        var Cat = function(name) {
          this.name = name;
          this.saying = 'meow';
        };
        Cat.inherits(Mammal).
          prototype.purr = function() {
            return 'r-r-r';
          };

        var myCat = new Cat('Silvestre');

        //gets methods defined by Mammal, as well as own Cat methods
        expect(myCat.get_name()).toBe('Silvestre');
        expect(myCat.saying).toBeTruthy();
        expect(myCat.purr).toBeTruthy();
      });
    });

  });

  describe("Prototypal", function() {

    it("creates objects that inherit from other objects", function() {
      // Create an object
      var myMammal = {
        name : 'a mammal',
        get_name : function() {
          return this.name;
        },
        says : function() {
          return this.saying || '';
        }
      };

      //Create more instances of it and customize them
      var myCat = Object.create(myMammal);
      myCat.name = 'Silvestre';
      myCat.saying = 'meow';
      myCat.purr = function() {
        return 'r-r-r';
      };

      expect(myCat.get_name()).toBe('Silvestre');
      expect(myCat.saying).toBeTruthy();
      expect(myCat.purr).toBeTruthy();
    });

  });

  describe("Functional", function() {
    var mammal = function(spec) {
      var self = {};

      self.get_name = function() {
        return spec.name;
      };
      self.says = function() {
        return spec.saying;
      };

      return self;
    };

    it("can create objects using functional 'constructors'", function() {
      var myMammal = mammal({name: 'one mammal'});

      expect(myMammal.get_name()).toBe('one mammal');
    });

    it("allows having 'private' variables", function() {
      var withPrivates = function() {
        var self = {};
        var privateVariable = 'hello';
        
        return self;
      };
      var instance = withPrivates();

      expect(instance.privateVariable).toBe(undefined);
      expect(withPrivates.privateVariable).toBe(undefined);
    });

  });


});








