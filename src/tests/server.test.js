
let supertest = require("supertest");
let tape = require("tape")
let router = require("../router")

tape.test("initial test to check if the script works", t=>{
    t.equals(true,true,"passed");
    t.end()

})


tape.test('test "/"', t=>{
    supertest(router)
        .get("/")
        .expect(200)
        .expect("content-type", "text/html")
        .end( (err,res)=>{

            t.error(err,"loaded");
            t.end()
        })
})


tape.test('test "/search?q="', t=>{
    supertest(router)
        .get("/search?q=")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{

            t.error(err,"loaded");
            t.equals(res.body.length, 0, "returns an empty array")
            t.end()
        })
})
tape.test('test "/search?q=cat"', t=>{
    supertest(router)
        .get("/search?q=cat")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{


            t.error(err,"loaded");
            t.equals(res.body !== null, true, "returns json object")
            t.equals(res.body.length, 25, "returns default amount of object")
            t.end()
        })



})
tape.test('test "/search?q=cat&count=1"', t=>{
    supertest(router)
        .get("/search?q=cat&count=1")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{


            t.error(err,"loaded");
            t.equals(res.body.length, 1, "returns default amount of object")
            t.end()
        })



})
tape.test('test "/search?q=cat&count=2"', t=>{
    supertest(router)
        .get("/search?q=cat&count=2")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{


            t.error(err,"loaded");
            t.equals(res.body.length, 2, "returns default amount of object")
            t.end()
        })

})
tape.test('test "/search?q=cat&count=2&start=2"', t=>{
    supertest(router)
        .get("/search?q=cat&count=2&start=1")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res1)=>{

            t.error(err,"loaded");

            supertest(router)
                .get("/search?q=cat&count=2")
                .end((err, res2)=> {

                    t.equals(res1.body[0].id, res2.body[1].id, "returns result starting at the second index")
                    t.end()

                    })

        })

})


tape.test('test "/suggestions?q="', t=>{
    supertest(router)
        .get("/suggestions?q=")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{

            t.error(err,"loaded");
            t.equals(res.body.length ,0, "returns an empty array")
            t.end()
        })
})
tape.test('test "/suggestions?q=test"', t=>{
    supertest(router)
        .get("/suggestions?q=test")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{

            t.error(err,"loaded");
            t.ok(res.body.length !== 0 ,"returns an array of elements")
            t.ok(Array.from(res.body).every(element=> typeof element === "string"),"returns an array of strings")
            t.end()
        })
})


tape.test('test "/wallpaper"', t=>{
    supertest(router)
        .get("/wallpaper")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{

            t.error(err,"loaded");
            t.equals(typeof res.body.url ,"string", "returns an object with a url property")
            t.end()
        })
})
tape.test('test "/wallpaper?type=random"', t=>{
    supertest(router)
        .get("/wallpaper?type=random")
        .expect(200)
        .expect("content-type", "application/json")
        .end( (err,res)=>{

            t.equals(typeof res.body.url ,"string", "returns an object with a url property")
            t.end()
        })
})


