import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Signup from "./Signup";

describe("Signup component", () => {
  it("renders signup form", () => {
    render(<Signup />);
    const signUpElements = screen.getAllByText("Sign Up"); // Use getAllByText
    expect(signUpElements).toHaveLength(2); // Check if there are two elements with "Sign Up" text
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });

  it("allows user to fill in username, email, and password", () => {
    render(<Signup />);
    const usernameInput = screen.getByLabelText("Username:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("displays error message for existing user", async () => {
    // Mock the fetch function to simulate existing user
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 409,
        json: () => Promise.resolve({ message: "User already exists" }),
      })
    );

    render(<Signup />);
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("User already exists")).toBeInTheDocument();
    });
  });

  it("displays error message for failed signup", async () => {
    // Mock the fetch function to simulate failed signup
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: "Server Error" }),
      })
    );

    render(<Signup />);
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Sign up failed. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
