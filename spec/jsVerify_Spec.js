/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine, spyOn, HistoryBuffer, jsc */
/* jshint browser: true*/

describe('JSVerify Spec', function () {
    'use strict';

    var unique = function (a) {
        return a.filter(function (self, index, array) {
            return array.indexOf(self, index + 1) < 0;
        });
    };

    var uniqueProducesAnArrayWithTheSameLength = function (array) {
        return array.length === unique(array).length;
    };

    var uniqueProducesAnArrayWithTheSameLengthOrSmaller = function (array) {
        return array.length >= unique(array).length;
    };

    it('should fail with an invalid property check', function () {
        var property = jsc.forall(jsc.array(jsc.nat()), uniqueProducesAnArrayWithTheSameLength);

        expect(property).toHold();
    });

    it('should not fail with an valid property check', function () {
        var property = jsc.forall(jsc.array(jsc.nat()), uniqueProducesAnArrayWithTheSameLengthOrSmaller);
        expect(property).toHold();
    });

    it('should not fail with an valid property check when using the DSL to specify the inputs', function () {
        var property = jsc.forall('array nat', uniqueProducesAnArrayWithTheSameLengthOrSmaller);
        expect(property).toHold();
    });
});