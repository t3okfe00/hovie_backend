import { expect } from "chai";
import { initializeTestDb } from "../functions/userFunctions";
import { createUser } from "../../models/userModel";

const base_url = "http://localhost:3000";

describe("POST REGISTER", () => {
  before(async () => {
    await initializeTestDb(); // Function to setup/clear your test database
  });

  it("should signup with valid name, email and password", async () => {
    const testUser = {
      name: "Test User 1",
      email: "testuser1@example.com",
      password: "Testuser4",
    };
    const response = await fetch(base_url + "/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.json();

    expect(response.status).to.equal(201);
    expect(data).to.be.an("object");
    expect(data).to.include.keys(
      "id",
      "email",
      "name",
      "profileUrl",
      "createAt"
    );
    expect(data.name).to.equal(testUser.name);
    expect(data.email).to.equal(testUser.email);
  });

  it("should fail when the password is missing an uppercase letter", async () => {
    const invalidUser = {
      name: "Test User",
      email: "testuser@example.com",
      password: "ouppercase1", // Missing uppercase letter
    };

    const response = await fetch(base_url + "/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidUser),
    });

    const data = await response.json();

    expect(response.status).to.equal(400); // Assuming 400 Bad Request for validation errors
    expect(data).to.have.property("errors");
    expect(data.errors[0].msg).to.equal(
      "Password must contain at least one uppercase letter"
    );
  });

  it("should fail when the email is invalid", async () => {
    const invalidUser = {
      name: "Test User",
      email: "invalid-email", // Invalid email format
      password: "ValidPass1",
    };

    const response = await fetch(base_url + "/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidUser),
    });

    const data = await response.json();

    expect(response.status).to.equal(400); // Assuming 400 Bad Request for validation errors
    expect(data).to.have.property("errors");
    expect(data.errors[0].msg).to.equal("Invalid email format");
  });

  it("should fail when the password is missing a number", async () => {
    const invalidUser = {
      name: "Test User",
      email: "testuser@example.com",
      password: "NoNumber", // No number in the password
    };

    const response = await fetch(base_url + "/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidUser),
    });

    const data = await response.json();

    expect(response.status).to.equal(400); // Assuming 400 Bad Request for validation errors
    expect(data).to.have.property("errors");
    expect(data.errors[0].msg).to.equal(
      "Password must contain at least one number"
    );
  });

  it("should fail when the email is already taken", async () => {
    const existingUser = {
      name: "Existing User",
      email: "testuser5@example.com", // Assuming this email already exists in the database
      password: "ValidPass1",
      profileUrl: "example",
    };

    await createUser(existingUser);

    const response = await fetch(base_url + "/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(existingUser),
    });

    const data = await response.json();

    expect(response.status).to.equal(500); // Assuming 409 Conflict for duplicate email
    expect(data).to.have.property("error");
    expect(data.error).to.be.equal("Error creating user");
  });
});

describe("POST LOGIN", async () => {
  it("should login with valid email and password", async () => {
    const validUser = {
      name: "Valid User",
      email: "validuser@example.com",
      password: "ValidPass1",
      profileUrl: "example",
    };

    await createUser(validUser);

    const response = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validUser.email,
        password: validUser.password,
      }),
    });

    const data = await response.json();
    const setCookieHeader = response.headers.get("set-cookie");

    expect(response.status).to.equal(200);
    expect(data).to.be.an("object");
    expect(data).to.include.keys("message", "user");
    expect(data.message).to.equal("Login successful");
    expect(data.user).to.include.keys("id", "email", "name", "profileUrl");
    expect(data.user.email).to.equal(validUser.email);

    // Cookie
    expect(setCookieHeader).to.include("jwt");
    expect(setCookieHeader).to.include("HttpOnly");
    if (process.env.NODE_ENV === "production") {
      expect(setCookieHeader).to.include("secure");
    }

    const maxAgeMatch = setCookieHeader?.match(/Max-Age=(\d+)/);
    expect(setCookieHeader).to.include("SameSite=Strict");
    expect(setCookieHeader).to.include("Max-Age");
    if (maxAgeMatch) expect(maxAgeMatch[1]).to.equal("3600");
  });

  it("should return 400 if password is missing", async () => {
    const response = await fetch(`${base_url}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "user@example.com" }), // Password missing
    });

    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data).to.have.property("error", "Missing credentials");
  });

  it("should return 400 if email is missing", async () => {
    const response = await fetch(`${base_url}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: "Nicepasword1" }), // Password missing
    });

    const data = await response.json();

    expect(response.status).to.equal(400);
    expect(data).to.have.property("error", "Missing credentials");
  });
  it("should return 401 if email is invalid", async () => {
    const response = await fetch(`${base_url}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "nonexistent@example.com",
        password: "ValidPass1",
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(401);
    expect(data).to.have.property("message", "Invalid Credentials");
  });

  it("should return 401 if password is incorrect", async () => {
    const userWithWrongPassword = {
      name: "User",
      email: "wrongpassword@example.com",
      password: "CorrectPass1",
      profileUrl: "example",
    };

    await createUser(userWithWrongPassword);

    const response = await fetch(`${base_url}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userWithWrongPassword.email,
        password: "WrongPass", // Incorrect password
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(401);
    expect(data).to.have.property("error", "Invalid Credentials");
  });
});
