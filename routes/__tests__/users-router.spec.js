const request = require("supertest")
const db = require("../../data/config")
const server = require("../../index")
const jwt = require("jsonwebtoken")
const jwtSecret = "secret key"

beforeAll(() => {
    const generateToken = (user) => {
        const payload = {
            userId: user.id,
            username: user.username
        }
        const options = {
            expiresIn: "1d"
        }
        return jwt.sign(payload, jwtSecret, options)
    }
    token = generateToken({ id: 1, username: "username1" })
})

afterAll(async () => {
    await db("users").truncate()
    await db("plants").truncate()
})

describe("users router", () => {
    test("get users", async () => {
        const res = await request(server)
            .get("/users")
            .set({ authorization: token })
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
    })
    test("get user", async () => {
        const res = await request(server)
            .get("/user")
            .set({ authorization: token })
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
    })
    test("delete user", async () => {
        const res = await request(server)
            .delete("/user")
            .set({ authorization: token })
        const user = await db("users").where({ id: 1 })
        expect(user).toEqual([])
    })
})