/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine, spyOn, HistoryBuffer, jsc */
/* jshint browser: true*/

describe('Fun with generators', function () {
    'use strict';

    /*custom nonshrinkable input generator for nat arrays*/
    var longArrayGenerator = jsc.bless({
        generator: function (size) {
            var arrsize = jsc.random(0, size);
            var arr = new Array(arrsize);
            for (var i = 0; i < arrsize; i++) {
                arr[i] = jsc.random(0, size);
            }
            return arr;
        }
    });

    /*custom shrinkable input generator for arb arrays*/
    var sLongArrayGenerator = function (arb) {
        return {
            generator: function (size) {
                var arrsize = jsc.random(0, size);
                var arr = new Array(arrsize);
                for (var i = 0; i < arrsize; i++) {
                    arr[i] = arb.generator(size);
                }
                return arr;
            },
            shrink: jsc.array(arb).shrink,
            show: jsc.array(arb).show
        };
    };

    var shrinkableLongArrayGenerator  = function(arb) {return jsc.bless(sLongArrayGenerator(arb))};


    it('should be able to use non shrinkable custom generators', function () {
        var property = jsc.forall(longArrayGenerator, function (a) {
            return a.length <= 10;
        });
        expect(property).toHold();
    });

    it('should be able to use shrinkable custom generators', function () {
        var property = jsc.forall(shrinkableLongArrayGenerator(jsc.nat()), function (a) {
            return a.length <= 10;
        });
        expect(property).toHold();
    });
});