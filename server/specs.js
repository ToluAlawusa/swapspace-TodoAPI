var app = require('./server'),
    chai = require('chai'),
    http = require('chai-http'),
    mongoose = require('mongoose'),
    Todomodel = require('../todo/todomodel'),
    request = require('supertest'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();

    chai.use(http);

    mongoose.Promise = global.Promise;

    describe('TODOS', function() { 

            Todomodel.collection.drop();
        //   beforeEach(function(done){
        //     Todomodel.collection.drop();
        //     done();
        // });

        var item = {
            "task" : "i have arrived"
        };

        var upd = {
            "task" : "i have arrived in abuja"
        };

        var dnd = {
            "task" : "safely arrived in Vienna"
        };

        var dada = {
            "task" : "scratch...safely arrived in Gbagada"
        };

       

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

        it("should add a task to the todo database", function(done) {
            chai.request(app)
                .post('/todos')
                .send(upd)
                .end(function(err, res) {
                    res.should.have.status(200);
                    should.not.exist(err);
                    res.body.should.be.an("Object");
                    done();
            });
        });

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

        it("should update a task by id", function(done) {
            request(app)
                .post("/todos")
                .send(dada)
                .end(function(err, res){
                    var taska = res.body.task;
                    var item2_id = res.body._id;
                    request(app)
                        .put("/todos/" + item2_id)
                        .send(dnd)
                        .end(function(err, res) {
                            res.status.should.equal(200);
                            var ntask = res.body.task;
                            should.not.exist(err);
                            res.body.should.be.an("Object");
                            done();

                        });
                });
        });


        it("should delete/drop all tasks", function(done) {
            request(app)
                .delete('/todos')
                .expect(200)
                .expect("Content-Type", "application/json")
                .end(function(err, res){
                        res.body.should.have.property('ok');
                        done();

                });
        });

        it("should delete a task by id", function(done) {
            request(app)
                .post('/todos')
                .send(upd)
                .end(function(err, res){
                    var spark = res.body.task;
                    var spark_id = res.body._id;
                    request(app)
                    .delete('/todos/' + spark_id)
                    .end(function(error, response){
                        var del = response.body._id;
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.an('object');
                        response.body.should.have.property('_id');
                        done();
                    })

                })
        })

        
    });