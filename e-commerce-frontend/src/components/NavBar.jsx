import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/endpoint";

export default function NavBar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("name");
  return (
    <div className="navbar">
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="material-symbols-outlined">home</span>Home
      </button>
      <button
        onClick={() => {
          user ? navigate("/") : navigate("/signin");
        }}
      >
        {user ? (
          <>
            <span className="material-symbols-outlined">person</span> {user}
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">login</span> Sign In
          </>
        )}
      </button>
      <button
        onClick={() => {
          if (user) {
            localStorage.clear();
            window.location.href = "/";
          } else {
            navigate("/signup");
          }
        }}
      >
        {user ? (
          <>
            <span className="material-symbols-outlined">logout</span>Sign Out
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">person_add</span>Sign Up
          </>
        )}
      </button>
      <button
        style={{ cursor: user ? "pointer" : "not-allowed" }}
        onClick={() => {
          navigate("/cart");
        }}
        disabled={!user}
      >
        <span className="material-symbols-outlined">shopping_bag</span>Cart
      </button>
    </div>
  );
}
