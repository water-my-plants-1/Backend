const request = require("supertest")
const db = require("../../data/config")
const server = require("../../index")

beforeEach(async () => {
    await db("users").truncate()
    await db("plants").truncate()
    await db.seed.run()
})

afterEach(async () => {
    await db("users").truncate()
    await db("plants").truncate()
})

describe("auth router", () => {
    test("register a new user", async () => {
        const res = await request(server)
            .post("/register")
            .send({ username: "username10", password: "password", phoneNumber: "7038226955" })
        expect(res.status).toBe(201)
    })
    test("register a new user", async () => {
        const res = await request(server)
            .post("/register")
            .send({ username: "username9", password: "password", phoneNumber: "6465758829" })
        expect(res.body.phoneNumber).toBe("6465758829")
    })
    test("login user with correct password", async () => {
        const res = await request(server)
            .post("/login")
            .send({ username: "username3", password: "password" })
        expect(res.status).toBe(200)
    })
    test("login user with incorrect password", async () => {
        const res = await request(server)
            .post("/login")
            .send({ username: "username3", password: "1234" })
        expect(res.status).toBe(401)
    })
})
