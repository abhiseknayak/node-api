const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos =[{
  text:"First todo"
},{
  text:"second todo"
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