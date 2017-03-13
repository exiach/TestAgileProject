(function() {
    var sum = require('../../src/server/to-test');


    describe("Sum", function() {

        it("should sum two numbers", function() {
            expect(sum(1, 2)).toBe(3);
        });

        it("should take undefined as 0", function() {
            expect(sum(1, undefined)).toBe(1);
        });
    });
})();