import { ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";

import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryList } from "./features/categories/ListCategory";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { darkTheme } from "./config/theme";
import { SnackbarProvider } from "notistack"
import { ListCastmembers } from "./features/cast/ListCastmembers";
import { CreateCastMember } from "./features/cast/CreateCastMembers";
import { EditCastMember } from "./features/cast/EditCastMember";



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={3}>
        <Box
          component="main"
          sx={{
            height: "100vh",
            backgroundColor: (theme) => darkTheme.palette.grey[900],
          }}>

          <Header />
          <Layout>
            <Routes>
              {/* Category*/}
              <Route path="/" element={<CategoryList />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="categories/create" element={<CategoryCreate />} />
              <Route path="categories/edit/:id" element={<CategoryEdit />} />

              {/* Cast members */}
              <Route path="/cast-members" element={<ListCastmembers />} />
              <Route path="/cast-members/create" element={<CreateCastMember />} />
              <Route path="/cast-members/edit/:id" element={<EditCastMember />} />


              <Route path="*" element={
                <Box sx={{ color: "white" }}>
                  <Typography variant="h1">404</Typography>
                  <Typography variant="h2">Page not found</Typography>
                </Box>
              } />
            </Routes>
          </Layout>

        </Box>
      </SnackbarProvider>

    </ThemeProvider>
  );
}

export default App;
