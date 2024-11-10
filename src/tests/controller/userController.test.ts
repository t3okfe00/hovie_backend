import { logOutUser } from "./../../controller/userController";
import { expect } from "chai";
import { initializeTestDb } from "../functions/userFunctions";
import { createUser } from "../../models/userModel";
import { log, profile } from "console";
import { loginUser } from "../../controller/authController";

const base_url = "http://localhost:3000";

describe("POST LOGOUT", () => {
  //   before(async () => {
  //     await initializeTestDb(); // Function to setup/clear your test database
  //   });

  it("should log out a user that is already logged in", async () => {
    const testUser = {
      name: "testuser50",
      email: "testuser50@gmail.com",
      password: "Testuser50",
      profileUrl: "/users/50",
    };
    await createUser(testUser);

    const loginResponse = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUser),
    });

    const loogedInUser = await loginResponse.json();
    if (loginResponse.status !== 200) {
      console.log(loogedInUser);
      console.log("************************");
    }

    const cookie = loginResponse.headers.get("set-cookie");
    if (!cookie) {
      throw new Error("No cookie found in login response, cannot log out.");
    }

    // Verify that the user is logged in
    expect(cookie).to.include("jwt");

    //Logout
    const logOutResponse = await fetch(base_url + "/user/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
    });

    const logOutUser = await logOutResponse.json();
    console.log("LOOOOOOG OOOOUUUUT", logOutUser);
    const logoutCookie = logOutResponse.headers.get("set-cookie");
    console.log("LOG OUT COOKCIE", logoutCookie);

    //Verify logout response
    expect(logOutResponse.status).to.equal(200);
    expect(logOutUser.message).to.equal("Logged Out");
    expect(logoutCookie).include("jwt=;");
    expect(logoutCookie).include("Max-Age=0");
    expect(logoutCookie).include("HttpOnly");
    expect(logoutCookie).include("SameSite=Strict");
  });
});
