The place where i got inspired: http://www.crockford.com/javascript/private.html
So yeah, it's possible to ENCAPSULATE in pure JavaScript.
JS gurus would kindly smile on me, and yes, i was surprised.
Surprised so much i felt it impossible not to create (yet another) demonstration of the patterns to understand them.

Here is the output i get from NodeJS and browsers:
```
Public member accessing:
        Public value

Private members accessing:
        undefined,
        undefined

Calling a public static(prototype'd) method:
        Success in PUBLIC method execution

Calling a public non-static (constructed) method:
        Successful public non-static method execution

Accessing a private method (not calling to avoid an exception):
        undefined

Accessing private value from privileged method:
        Private value!

Calling private method from privileged method:
        Success in PRIVATE method execution!

Accessing private value from public static (prototype'd) method:
        ReferenceError: privateMember is not defined

Accessing private method from public static (prototype'd) method:
        ReferenceError: privateMethod is not defined
```