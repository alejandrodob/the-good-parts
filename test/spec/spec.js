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

    it("permits us to implement our own 'new' operator", function() {
      function myNew(constructor) {
        var object = Object.create(constructor.prototype);
        var args = [].slice.call(arguments);
        constructor.apply(object, args.slice(1));
        return object;
      }
      function Car(brand, color) {
        this.brand = brand;
        this.color = color;
      }
      Car.prototype.drive = function() { return 'Runnnnnning'; };

      var newCar = new Car('ford', 'blue');
      var myNewCar = myNew(Car, 'ford', 'blue');

      expect(newCar.color).toEqual(myNewCar.color);
      expect(newCar.brand).toEqual(myNewCar.brand);
      expect(newCar.drive()).toEqual(myNewCar.drive());
      expect(Object.getPrototypeOf(newCar)).toBe(Object.getPrototypeOf(myNewCar));
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
      Mammal.prototype.says = function() {
        return this.saying || '';
      };

      it("can simulate classes to produce objects", function() {
        var myMammal = new Mammal('Monkey the mammal');

        // gets methods defined by the 'class'
        expect(myMammal.get_name).toBeTruthy();
        expect(myMammal.says).toBeTruthy();
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
        expect(myCat.says()).toBe('meow');
        expect(myCat.purr()).toBe('r-r-r');
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
        expect(myCat.says()).toBe('meow');
        expect(myCat.purr()).toBe('r-r-r');
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
      expect(myCat.says()).toBe('meow');
      expect(myCat.purr()).toBe('r-r-r');
    });

  });

  describe("Functional", function() {

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

    it("allows the public exposure of some variables or methods", function() {
      var withExposed = function() {
        var self = {};
        var privateVariable = 'hello';
        var publicMethod = function() {
          return privateVariable;
        };
        self.publicMethod = publicMethod;
        return self;
      };

      var exposed = withExposed();

      expect(exposed.privateVariable).toBe(undefined);
      expect(exposed.publicMethod()).toBe('hello');
    });

    it("can create objects that inherit from other objects", function() {
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
      var cat = function(spec) {
        spec.saying = spec.saying || 'meow';
        var self = mammal(spec);
        self.purr = function() {
          return 'r-r-r';
        };

        return self;
      };

      var myMammal = mammal({name: 'one mammal'});
      var myCat = cat({name: 'Silvestre'});

      expect(myMammal.get_name()).toBe('one mammal');
      expect(myCat.get_name()).toBe('Silvestre');
      expect(myCat.says()).toBe('meow');
      expect(myCat.purr()).toBe('r-r-r');
    });

  });

  describe("Arrays", function() {

    describe("When removing elements", function() {
      var myArray, initialLength;
      beforeEach(function() {
        myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        initialLength = myArray.length;
      });

      it("delete leaves 'holes' in the array", function() {
        // delete removes an element, but puts 'undefined' instead
        delete myArray[2];
        expect(myArray[2]).toBe(undefined); 
        // and thus the length remains the same
        expect(myArray.length).toBe(initialLength);
      });

      it("if using splice, the element is completely removed", function() {
        myArray.splice(2,1);
        // as it does not leave holes, the elements on the right are moved to the left
        expect(myArray[2]).toBe(3);
        expect(myArray.length).toBe(initialLength - 1);
      });

    });



  });


});








