var app = require('./server'),
    chai = require('chai'),
    http = require('chai-http'),
    request = require('supertest'),
    expect = chai.expect,
    should = chai.should();

    chai.use(http);



    describe('TODOS', function() { 
        it("it should fail if there are no tasks", function(done) {
            request(app)
                .get('/todos')
                .expect(501)
                .expect("Content-Type", "application/json")
                .end(function(err, res){
                        expect(res.body).to.be.equal("No tasks found");
                        done();

                });
        })

    	it("should get all tasks", function(done) {
    		request(app)
		    	.get('/todos')
		    	.expect(200)
		    	.expect("Content-Type", "application/json")
		    	.end(function(err, res){
		    			expect(res.body).to.be.an('array');
		    			done();

		    	});
    	})
    })