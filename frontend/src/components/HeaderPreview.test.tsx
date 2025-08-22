import React from "react";
import { render, screen } from "@testing-library/react";
import { HeaderPreview } from "./HeaderPreview";

test("Header aperçu utilisateur déconnecté", () => {
  render(<HeaderPreview />);
  expect(screen.getByText("ContentBoost")).toBeInTheDocument();
  expect(screen.getByText("Connexion")).toBeInTheDocument();
});

test("Header aperçu utilisateur connecté", () => {
  localStorage.setItem("token", "fake-token");
  render(<HeaderPreview />);
  expect(screen.getByText("ContentBoost")).toBeInTheDocument();
  expect(screen.getByText("Déconnexion")).toBeInTheDocument();
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
});
