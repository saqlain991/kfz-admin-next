"use client";
import React from "react";

const LoginLayout = ({ children }) => {
  return (
    <html>
      <body className="min-h-screen">{children}</body>
    </html>
  );
};

export default LoginLayout;
