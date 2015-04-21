/* global jasmine:true, beforeEach:true, jsc:true */
beforeEach(function () {
    "use strict";
    jasmine.addMatchers({
        // Expects that property is synchronous
        toHold: function () {
            return {
                compare: function (actual, opts) {
                    /* global window */
                    var quiet = window && !(/verbose=true/).test(window.location.search);

                    var r = jsc.check(actual, {
                        quiet: quiet,
                        size: (opts && opts.size) ? opts.size : 100,
                        tests: (opts && opts.tests) ? opts.tests : 100,
                    });

                    var pass = r === true;
                    var message;

                    if (pass) {
                        message = "Expected property not to hold.";
                    } else {
                        message = "Expected property to hold. Counterexample found: " + r.counterexamplestr;
                    }

                    return {
                        pass: pass,
                        message: message,
                    };
                }
            };
        },
    });
});