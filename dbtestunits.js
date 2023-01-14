var request = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const app = require('./app.js')
const conn = require('./Database/database.js');

let server = require('./server.js');
var expect = chai.expect;
chai.use(chaiHttp);

var test = require('mocha').test;
//1

describe('Check if the routes goes to login page!', function() {

    test('responds to /Log-In', async() => {
        const res = await request(app).get('/Log-in.html');
        expect(res.should.have.status(200));
    });
});
//2

describe('Check if the routes goes to register page!', function() {

    test('responds to /Sign-Up', async() => {
        const res = await request(app).get('/Sign-Up.html');
        expect(res.should.have.status(200));
    });
});

//3

describe('Check if the routes goes to profile page!', function() {

    test('responds to /profile', async() => {
        const res = await request(app).get('/profile.ejs');
        expect(res.should.have.status(200));
    });
});

//4

describe('Check if the routes goes to Home Page', function() {

    test('responds to /Home', async() => {
        const res = await request(app).get('/Home.html');
        expect(res.should.have.status(200));
    });

});
//5
describe('Check if the routes goes to customer profile Page', function() {

    test('responds to /Profile-cos', async() => {
        const res = await request(app).get('/Profile-cos.html');
        expect(res.should.have.status(200));
    });

});
//6
describe('Check if the routes goes to volunteerreq Page', function() {
    test('responds to /volunteerreq', async() => {
        const res = await request(app).get('/volunteerreq.html');
        expect(res.should.have.status(200));
    });

});
//7
describe('Check if the routes goes to customer donation request page', function() {
    test('responds to //Customer-Donation-Request', async() => {
        const res = await request(app).get('/Customer-Donation-Request.html');
        expect(res.should.have.status(200));
    });

});
//8
describe('Check if the routes goes to volunteerdetail page', function() {
    test('responds to /volunteer-detail', async() => {
        const res = await request(app).get('/volunteer-detail.ejs');
        expect(res.should.have.status(200));
    });

});
//9
describe('Check if the routes goes to Employees page', function() {
    test('responds to /Employees', async() => {
        const res = await request(app).get('/Employees.ejs');
        expect(res.should.have.status(200));
    });

});
//10
describe('Check if the routes goes to add product Page', function() {
    test('responds to /add-product', async() => {
        const res = await request(app).get('/add-product.html');
        expect(res.should.have.status(200));
    });

});
