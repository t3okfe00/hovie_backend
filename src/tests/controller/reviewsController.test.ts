import { reviews } from "./../../models/reviewModel";
import { expect } from "chai";
import { initializeTestDb } from "../functions/userFunctions";
import { createUser } from "../../models/userModel";
import { createReview } from "../../models/reviewModel";
import { db } from "../../db";
import { eq } from "drizzle-orm";
const base_url = "http://localhost:3000";

describe("REVIEWS API", () => {
  before(async () => {
    await initializeTestDb();
  });
  const clearAllReviews = async () => {
    await db.delete(reviews); // Deletes all records in the reviews table
  };

  describe("POST /reviews/:id", () => {
    let movieId = 1;
    let testUser;
    beforeEach(async () => {
      await clearAllReviews();

      // Create a fresh user before each test
      testUser = {
        name: "Test User",
        email: `testuser${Date.now()}@example.com`,
        password: "TestUser1",
        profileUrl: "/testuser1",
      };
      await createUser(testUser);
    });
    it("should create a review with valid data", async () => {
      const movieId = 1;

      const loginResponse = await fetch(`${base_url}/user/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });
      const cookie = loginResponse.headers.get("set-cookie");

      // Create a valid review
      const reviewData = {
        comment: "Amazing movie!",
        rating: 5,
        finnId: 1, // assuming this is a valid finnId
      };

      const response = await fetch(`${base_url}/reviews/${movieId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      expect(response.status).to.equal(200);
      expect(data).to.include({ message: "Review submitted successfully" });
      expect(data.result[0]).to.include({
        description: "Amazing movie!",
        rating: 5,
        finnId: 1,
      });
    });

    it("should return 401 if the user is not authenticated", async () => {
      const movieId = 1;
      const reviewData = {
        comment: "Nice movie!",
        rating: 4,
        finnId: 1, // assuming this is a valid finnId
      };

      const response = await fetch(`${base_url}/reviews/${movieId}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      expect(response.status).to.equal(401);
      expect(data).to.have.property("error", "Unauthorized");
    });
  });

  describe("DELETE /reviews/:id", () => {
    it("should delete a review with valid ID", async () => {
      const movieId = 1;

      const testUser = {
        name: "Test User",
        email: `testuser${Date.now()}@example.com`,
        password: "TestUser1",
        profileUrl: "/testuser1",
      };

      const user = await createUser(testUser);
      const loginResponse = await fetch(`${base_url}/user/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
      });
      const cookie = loginResponse.headers.get("set-cookie");

      const reviewData = {
        comment: "Great movie!",
        rating: 5,
        finnId: "1",
      };

      const createReviewResponse = await fetch(
        `${base_url}/reviews/${movieId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
          },
          body: JSON.stringify(reviewData),
        }
      );
      const reviewDataResponse = await createReviewResponse.json();
      const review = reviewDataResponse.result[0]; // Get the created review

      const deleteResponse = await fetch(`${base_url}/reviews/${review.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie,
        },
      });

      expect(deleteResponse.status).to.equal(204);
    });
  });

  describe("GET /reviews/:id", () => {
    it("should return reviews for a movie with valid pagination", async () => {
      const movieId = 1;

      const testUser = await createUser({
        name: "Test User",
        email: `testuser${Date.now()}@example.com`,
        password: "TestUser123",
        profileUrl: "/testuser",
      });

      await createReview(movieId, testUser.id, 4, "Good!", "1", "User1");
      await createReview(movieId, testUser.id, 5, "Excellent!", "1", "User2");

      const response = await fetch(
        `${base_url}/reviews/${movieId}?page=1&limit=2`
      );
      const data = await response.json();
      console.log("--------------------", data);

      expect(response.status).to.equal(200);
      expect(data).to.include.keys(
        "reviews",
        "totalReviews",
        "totalPages",
        "currentPage"
      );
      expect(data.reviews).to.be.an("array");
      expect(data.totalReviews).to.equal(2);
      expect(data.totalPages).to.equal(1);
      expect(data.currentPage).to.equal(1);
    });

    it("should return an empty list if no reviews exist", async () => {
      const movieId = -1;
      const response = await fetch(`${base_url}/reviews/${movieId}`);
      const data = await response.json();

      expect(response.status).to.equal(200);
      expect(data.reviews).to.be.an("array").that.is.empty;
    });
  });
});
