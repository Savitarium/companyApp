const mongoose = require('mongoose');
const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {
    before(async () => {
        try {
            await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
            console.error(err);
        }
    });

    describe('Reading data', () => {
        beforeEach(async () => {
            const empOne = new Employee({
                firstName: "Test firstName One",
                lastName: "Test lastName One",
                department: "Test Department One",
            });
            await empOne.save();

            const empTwo = new Employee({
                firstName: "Test firstName Two",
                lastName: "Test lastName Two",
                department: "Test Department Two",
            });
            await empTwo.save();
        });

        it('should find all employees with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees).to.have.lengthOf(expectedLength);
        });

        it('should return proper document by various params with findOne method', async () => {
            const cases = [
                { firstName: "Test firstName One" },
                { lastName: "Test lastName One" },
                { department: "Test Department One" },
            ];
            for (let employee of cases) {
                const emp = await Employee.findOne(employee);
                expect(emp).to.exist;
            }
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe("Creating data", () => {
        it('should insert new employee with insertOne method', async () => {
            const employee = new Employee({
                firstName: "Test firstName One",
                lastName: "Test lastName One",
                department: "Test Department One",
            });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe("Updating data", () => {
        beforeEach(async () => {
            const empOne = new Employee({
                firstName: "Test firstName One",
                lastName: "Test lastName One",
                department: "Test Department One",
            });
            await empOne.save();

            const empTwo = new Employee({
                firstName: "Test firstName Two",
                lastName: "Test lastName Two",
                department: "Test Department Two",
            });
            await empTwo.save();
        });

        it('should properly update one employee with "updateOne" method', async () => {
            await Employee.updateOne(
                { firstName: "Test firstName One" },
                { firstName: "Test firstName One Updated" }
            );
            const employee = await Employee.findOne({
                firstName: "Test firstName One Updated",
            });
            expect(employee).to.exist;
        });

        it("should properly update one employee with save method", async () => {
            const employee = await Employee.findOne({
                firstName: "Test firstName One",
            });
            employee.firstName = "Test firstName One Updated";
            await employee.save();
            const updatedEmployee = await Employee.findOne({
                firstName: "Test firstName One Updated",
            });
            expect(updatedEmployee).to.exist;
        });

        it("should properly update multiple employees with updateMany method", async () => {
            await Employee.updateMany({}, { $set: { firstName: "UPDATED!" } });
            const employees = await Employee.find();
            expect(employees[0].firstName).to.equal("UPDATED!");
            expect(employees[1].firstName).to.equal("UPDATED!");
        });
    });

    describe('Removing data', () => {
        beforeEach(async () => {
            const empOne = new Employee({
                firstName: "Test firstName One",
                lastName: "Test lastName One",
                department: "Test Department One",
            });
            await empOne.save();

            const empTwo = new Employee({
                firstName: "Test firstName Two",
                lastName: "Test lastName Two",
                department: "Test Department Two",
            });
            await empTwo.save();
        });

        it('should properly delete one employee with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: "Test firstName One" });
            const employee = await Employee.findOne({
                firstName: "Test firstName One",
            });
            expect(employee).to.not.exist;
        });

        it("should properly delete one employee with remove method", async () => {
            const employee = await Employee.findOne({
                firstName: "Test firstName One",
            });
            await employee.remove();
            const removeEmployee = await Employee.findOne({
                firstName: "Test firstName One",
            });
            expect(removeEmployee).to.not.exist;
        });

        it('should properly delete multiple employees with "deleteMany" method', async () => {
            await Employee.deleteMany({});
            const employees = await Employee.find();
            expect(employees).to.have.lengthOf(0);
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });
});