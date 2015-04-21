/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine, spyOn, HistoryBuffer, jsc */
/* jshint browser: true*/

describe('Fun with generators', function () {
    'use strict';

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

    var shrinkableLongArrayGenerator = jsc.bless({
        generator: function (size) {
            var arrsize = jsc.random(0, size);
            var arr = new Array(arrsize);
            for (var i = 0; i < arrsize; i++) {
                arr[i] = jsc.random(0, size);
            }
            return arr;
        },
        shrink: jsc.array(jsc.nat()).shrink,
        show: jsc.show.def
    });


    it('should be able to use non shrinkable custom generators', function () {
        var property = jsc.forall(longArrayGenerator, function (a) {
            return a.length <= 10;
        });
        expect(property).toHold();
    });

    it('should be able to use shrinkable custom generators', function () {
        var property = jsc.forall(shrinkableLongArrayGenerator, function (a) {
            return a.length <= 10;
        });
        expect(property).toHold();
    });


});