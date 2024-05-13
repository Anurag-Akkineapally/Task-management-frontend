import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";

describe("Login component", () => {
  it("renders login form", () => {
    render(<Login />);
    expect(screen.queryByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("allows user to fill in email and password", () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("submits login form with valid credentials", async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(3); // Check that localStorage items are set
      expect(window.location.reload).toHaveBeenCalled(); // Check that window reload is called
    });
  });

  it("displays error message for invalid credentials", async () => {
    render(<Login />);
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Invalid email or password.")
      ).toBeInTheDocument();
    });
  });

  it("redirects to task list page after successful login", async () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: "" };

    render(<Login />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe("/tasklist");
    });
  });

  it('redirects to signup page when "Create new account" link is clicked', () => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: "" };

    render(<Login />);
    const signupLink = screen.getByText("Create new account");

    fireEvent.click(signupLink);

    expect(window.location.href).toBe("/signup");
  });
});
