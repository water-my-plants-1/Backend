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

describe("plants router", () => {
    test("get plants", async () => {
        console.log("token", token)
        const res = await request(server)
            .get("/user/plants")
            .set({ authorization: token })
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
    })
    test("create plant", async () => {
        const user = await request(server)
            .post("/register")
            .send({ username: "wilcoxva", password: "1234", phoneNumber: "2344322344"})
        //     console.log("user", user)
        const res = await request(server)
            .post("/user")
            .send({nickname: "rosey", species: "rose", h2oFrequency: "3"})
            .set({ authorization: token })
        expect(res.status).toBe(201)
    })
    test("delete plant", async () => {
        const res = await request(server)
            .delete("/user/1")
            .set({ authorization: token })
        const plant = await db("plants").where({ id: 1 })
        expect(plant).toEqual([])
    })
})