// src/components/Header.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import { AuthContext } from "../contexts/AuthContext";

const renderWithAuth = (token: string | null) => {
  const mockLogin = vi.fn();
  const mockLogout = vi.fn();
  const mockUser = token ? { username: "testuser" } : null;

  return {
    ...render(
      <AuthContext.Provider
        value={{ user: mockUser, token, login: mockLogin, logout: mockLogout }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>
    ),
    mockLogout,
  };
};

describe("Header component", () => {
  it("affiche le bouton Connexion si utilisateur déconnecté", () => {
    renderWithAuth(null);
    expect(screen.getByText("ContentBoost")).toBeInTheDocument();
    expect(screen.queryByText("Déconnexion")).toBeNull();
  });

  it("affiche Dashboard et Déconnexion si utilisateur connecté", () => {
    renderWithAuth("fake-token");
    expect(screen.getByText("ContentBoost")).toBeInTheDocument();
    expect(screen.getByText("Déconnexion")).toBeInTheDocument();
  });

  it("appelle logout quand on clique sur Déconnexion", () => {
    const { mockLogout } = renderWithAuth("fake-token");

    const logoutButton = screen.getByText("Déconnexion");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled(); // ✅ passe maintenant
  });
});
