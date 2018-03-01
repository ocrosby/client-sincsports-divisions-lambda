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

    describe('getSub', () => {
        it('returns "3" when given "fall"', () => {
            expect(index.getSub('fall')).to.equal('3');
        });

        it('returns "3" when given nothing', () => {
            expect(index.getSub()).to.equal('3');
        });

        it('returns "2" when given "spring"', () => {
            expect(index.getSub('spring')).to.equal('2');
        });
    });

    describe('generatePath', () => {
        it('returns "/TTSchedules.aspx?tid=NCFL&tab=3&sub=3&sTid=NCFL&sYear=2017" when given "fall" 2017', () => {
            expect(index.generatePath('fall', 2017)).to.equal('/TTSchedules.aspx?tid=NCFL&tab=3&sub=3&sTid=NCFL&sYear=2017');
        });
    });
});
