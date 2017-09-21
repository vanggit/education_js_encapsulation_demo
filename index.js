// Learn the base for this code: http://www.crockford.com/javascript/private.html

// This code with comments should make the most sense to those
// who are already experienced with "classical" OOP.

// Here comes the definition.
// The function is kinda all-in-one class name and the constructor. Heh.
// (The argument also becomes another private member)
function oopjs(argument)  { 
    
    // Private methods -- created without "this" inside of the constructor, non-static.
    function privateMethod () { 
        return "Success in PRIVATE method execution!";
    }

    // Private member(field) -- created inside of the constructor without "this", non-static.
    let privateMember = "Private value!";
    
    // Public member(field) -- created inside of the constructor through "this", non-static.
    this.publicMember = "Public value";
    
    // Public non-static method -- created inside of the constructor.
    this.publicMethod_constructed = function(){
        return "Successful public non-static method execution";
    }

    // "Privileged" public methods -- created in the constructor, recreated in every instance
    this.privilegedMethod_getPrivateValue = function (){ 
        return privateMember; // works, cuz the methos is "privileged"
    }
    this.privilegedMethod_callPrivateMethod = function (){
        return privateMethod(); // works, cuz the methos is "privileged"
    }
}

// Public static methods -- created for the object prototype.
// THey are having access to all the _public_ methods and _public_ values.
// [Wrapped into an IIFE for the beauty of folding] (IIFE - http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
(function wtfjs_PublicMethodsDefinition(){

    oopjs.prototype.publicMethod_static = function(){
        return "Success in PUBLIC method execution";
    }

    oopjs.prototype.publicMethod_static_publicMemberAccessAttempt = function(){
        return this.publicMember;
    }

    oopjs.prototype.publicMethod_static_privateMemberAccessAttempt = function(){
        try {
            return privateMember;
        } catch(exception){
            return `${exception}`;
        }
    }

    oopjs.prototype.publicMethod_static_privateMethodAccessAttempt = function(){
        try {
            return privateMethod;
        } catch(exception){
            return `${exception}`;
        }
    }
})()
;


// After construction the argument is only accessible from private and privileged methods.
const oopjsInstance = new oopjs("This value will be silently engraved inside the object");


(function Basic_Accessing_Attemts(){

    console.log(`Public member accessing:
        ${oopjsInstance.publicMember}
    `); // the public value should show up

    console.log(`Private members accessing:
        ${oopjsInstance.privateMember}, 
        ${oopjsInstance.argument}
    `); // undefined -- failed to access

    console.log(`Calling a public static(prototype'd) method:  
        ${oopjsInstance.publicMethod_static()}
    `); // A successful string should be  returned

    console.log(`Calling a public non-static (constructed) method:  
        ${oopjsInstance.publicMethod_constructed()}
    `); // A successful string should be  returned

    console.log(`Accessing a private method (not calling to avoid an exception):  
        ${oopjsInstance.privateMethod}
    `); // undefined -- failed to access

})()
;


(function Through_Methods_Accessing_Attemts(){

    console.log(`Accessing private value from privileged method:  
        ${oopjsInstance.privilegedMethod_getPrivateValue()}
    `); // the private value should show up

    console.log(`Calling private method from privileged method:  
        ${oopjsInstance.privilegedMethod_callPrivateMethod()}
    `); // the private method should work out

    console.log(`Accessing private value from public static (prototype'd) method:
        ${oopjsInstance.publicMethod_static_privateMemberAccessAttempt()}
    `); // Should fail and output the exception

    console.log(`Accessing private method from public static (prototype'd) method:
        ${oopjsInstance.publicMethod_static_privateMethodAccessAttempt()}
    `); // Should fail and output the exception

})()
;
