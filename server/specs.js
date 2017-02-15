var app = require('./server'),
    chai = require('chai'),
    http = require('chai-http'),
    todomodel = require('../todo/todomodel'),
    request = require('supertest'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();

    chai.use(http);



    describe('TODOS', function() { 

        //  beforeEach(function(done){
        //     todomodel.remove().then(function(){
        //     assert(todomodel == 0);
        //     done();

        // }); 

        var item = {
            "task" : "i have arrived"
        };

        var upd = {
            "task" : "i have arrived in abuja"
        };

       

        it.skip("it should fail if there are no tasks", function(done) {
            request(app)
                .get('/todos')
                .expect(501)
                .expect("Content-Type", "application/json")
                .end(function(err, res){
                        expect(res.body).to.be.equal("No tasks found");
                        done();

                });
        })

    	it.skip("should get all tasks", function(done) {
    		request(app)
		    	.get('/todos')
		    	.expect(200)
		    	.expect("Content-Type", "application/json")
		    	.end(function(err, res){
		    			expect(res.body).to.be.an('array');
		    			done();

		    	});
    	})

        it.skip("should add a task to the todo database", function(done) {
            chai.request(app)
                .post('/todos')
                .send(item)
                .end(function(err, res) {
                    res.should.have.status(200);
                    console.log(res.body);
                    should.not.exist(err);
                    res.body.should.be.an("Object");
                    done();
            });
        });

        it("should get a task by id", function(done) {
            request(app)
                .post("/todos")
                .send(upd)
                .end(function(err, res) {
                    var item_id = res.body._id;
                    request(app)
                        .get("/todos/" + item_id)
                        .expect(200)
                        .expect("Content-type", "application/json")
                        .end(function(err, res){
                            expect(res.body).to.be.an('object');
                            res.body.should.have.property('task');
                            res.body.task.should.equal("i have arrived in abuja");
                            done();
                        });
                });
        });
    })