const index = require('../src/index');

const chai = require('chai');

global.expect = chai.expect;

describe('index', () => {
    describe('getTid', () => {
        it('returns "NCFL" when given "fall"', () => {
            expect(index.getTid('fall')).to.equal('NCFL');
        });

        it('returns "NCCSL" when given "spring"', () => {
            expect(index.getTid('spring')).to.equal('NCCSL');
        });

        it('returns "NCFL" when given nothing', () => {
            expect(index.getTid()).to.equal('NCFL');
        });

        it('returns "NCFL" when given null', () => {
            expect(index.getTid(null)).to.equal('NCFL');
        });

        it('returns "NCFL" when given undefined', () => {
            expect(index.getTid(undefined)).to.equal('NCFL');
        });
    });
});
