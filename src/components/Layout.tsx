import { AppBar, Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <Box sx={{ display: "flex" }}>
          <Container maxWidth="lg" sx={{ color: "white", my: 12 }}>
            {children}
          </Container>
      </Box>
  );
}
