import { expect } from "chai";
import { initializeTestDb } from "./functions/userFunctions";
import { createUser } from "../models/userModel";

const base_url = "http://localhost:3000";

describe("POST REGISTER", async () => {
  before(() => {
    initializeTestDb(); // Function to setup/clear your test database
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
