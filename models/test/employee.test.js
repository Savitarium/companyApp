const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employee({}); // create new Employee, but don't set `firstName` attr value

        emp.validate(err => {
            expect(err.errors.firstName).to.exist;
        });
    });
    it('should throw an error if "firstName" is not a string', () => {

        const cases = [{}, []];
        for(let firstName of cases) {
            const emp = new Employee({ firstName });

            emp.validate(err => {
                expect(err.errors.firstName).to.exist;
            });

        }
    });
    it('should not throw an error if "firstName" is ok', () => {
        const cases = ['Lucas', 'Marlene', 'John']; // various cases of Employee firstNames
        for(let firstName of cases) {
            const emp = new Employee({ firstName });

            emp.validate(err => {
                expect(err.errors.firstName).to.not.exist;
            });
        }
    });
    it('should throw an error if no "lastName" arg', () => {
        const emp = new Employee({}); // create new Employee, but don't set `lastName` attr value

        emp.validate(err => {
            expect(err.errors.lastName).to.exist;
        });
    });
    it('should throw an error if "lastName" is not a string', () => {

        const cases = [{}, []];
        for(let lastName of cases) {
            const emp = new Employee({ lastName });

            emp.validate(err => {
                expect(err.errors.lastName).to.exist;
            });

        }
    });
    it('should not throw an error if "lastName" is ok', () => {
        const cases = ['Doe', 'Williams', 'Brice']; // various cases of Employee lastNames
        for(let lastName of cases) {
            const emp = new Employee({ lastName });

            emp.validate(err => {
                expect(err.errors.lastName).to.not.exist;
            });
        }
    });

    after(() => {
        mongoose.models = {};
    });
});