import request from "supertest";
import { main } from "../app";

describe("Post Endpoints", () => {
    //@ts-ignore
    test("should register a new user", async (done) => {
        const res = await request(main()).post("/api/register").send({
            username: "uncle bob",
            email: "uncle_bob@gmail.com",
            password: "uncle_bob@gmail.com",
            user_type: "VA",
            tckn: "38492384289",
            mobile: "5376852365",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("post");
        done();
    });
});
