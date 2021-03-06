const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos =[{
  _id:new ObjectID(),
  text:"First todo"
},{
  _id:new ObjectID(),
  text:"second todo",
  completed:true,
  completedAt:333
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    Todo.insertMany(todos);
  }).then(()=>done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = "test text1";
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

          Todo.find().then((todos)=>{
          expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text);
          done();

        }).catch((e)=>done(e));
      });
  });

  it("should not make a todo",(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));
    })
  });
});


describe("GET /todos",()=>{
  it("should get all todos",(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);


      })
      .end(done);
  });
});

describe("GET /todos/:id",()=>{
  it("should return doc",(done)=>{
    request(app)
      .get(`/todos/${String(todos[0]._id)}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);

  });

  it("should return 404 if todo not found",(done)=>{
      request(app)
        .get(`/todos/${(new ObjectID()).toHexString()}`)
        .expect(404)
        .end(done);
  });

  it("should return 404 for non object-id",(done)=>{
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
});


describe("DELETE /todos/:id",()=>{
  it("should remove a todo",(done)=>{
    request(app)
      .delete(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

   it("should 404 if todo not found",(done)=>{
     request(app)
      .delete(`/todos/${new ObjectID()+''}`)
      .expect(404)
      .end(done);


   });

   it("should 404 if object-id not found",(done)=>{
      request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);

   });
});

describe("PATCH /todos/:id",()=>{
  it("should update todo",(done)=>{
    var body={text:"hello testing",completed:true}
    request(app)
      .patch(`/todos/${todos[0]._id}`)
      .send(body)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completed).toBe(true);
        //console.log(typeof res.body.todo.completedAt );
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  it("should set completedAt to Null",(done)=>{
    var body={text:"hello testing",completed:false};
    request(app)
      .patch(`/todos/${todos[1]._id}`)
      .send(body)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();

      })
      .end(done);
  });

});
