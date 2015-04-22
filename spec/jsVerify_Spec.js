/* global $, describe, it, xit, after, beforeEach, afterEach, expect, jasmine, spyOn, HistoryBuffer, jsc */
/* jshint browser: true*/

describe('Fun with JSVerify', function () {
    'use strict';

    // returns an array with the duplicates removed
    var unique = function (a) {
        return a.filter(function (self, index, array) {
            return array.indexOf(self, index + 1) < 0;
        });
    };

    // predicate - check if the array lenght is the same with the duplicates removed
    var uniqueArrayIsTheSameLength = function (array) {
        return array.length === unique(array).length;
    };

    // predicate - check if the array lenght is smaller or the same with the duplicates removed
    var uniqueArrayIsSmallerOrEq = function (array) {
        return unique(array).length <= array.length;
    };

    it('should fail to validate that the length of the array is the same with the duplicates removed', function () {
        var property = jsc.forall(jsc.array(jsc.nat()), uniqueArrayIsTheSameLength);

        expect(property).toHold();
    });

    it('validates that the length of an array with the duplicates removed is smaller or the same', function () {
        var property = jsc.forall(jsc.array(jsc.nat()), uniqueArrayIsSmallerOrEq);
        expect(property).toHold();
    });

    it('should validate that the length of the array is smaller or the same with the duplicates removed.(use DSL to specify inputs)', function () {
        var property = jsc.forall('array nat', uniqueArrayIsSmallerOrEq);
        expect(property).toHold();
    });

    it('should verify that add is commutative', function () {
        var property = jsc.forall('integer', 'integer', function (a, b) {
            return a + b === b + a;
        });
        expect(property).toHold();
    });

    it('should verify that add is associative', function () {
        var property = jsc.forall('number', 'number', 'number', function (a, b, c) {
            return a + (b + c) === (a + b) + c;
        });
        expect(property).toHold();
    });

    it('should not verify that subtract is commutative', function () {
        var property = jsc.forall('integer', 'integer', function (a, b) {
            return a - b === b - a;
        });
        expect(property).toHold();
    });

    it('should verify that subtract is not associative', function () {
        var property = jsc.forall('integer', 'integer', 'integer', function (a, b, c) {
            return ((a - b) - c) === (a - (b - c));
        });
        expect(property).not.toHold();
    });

    it('should have a working suchthat method', function () {
        var arrayAndIndex = jsc.suchthat(jsc.pair(jsc.array(jsc.integer()), jsc.nat()), function (pair) {
            return pair[1] <= pair[0].length;
        });

        var property = jsc.forall(arrayAndIndex, function (pair) {
            return pair[1] < pair[0].length;
        });

        expect(property).toHold();
    });
    
    
});