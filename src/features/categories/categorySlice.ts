import { createSlice } from "@reduxjs/toolkit";
import { Result, Results, CategoryParams } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}
const endpointUrl = "/categories";

const category: Category = {
  id: "234",
  name: "Olive",
  description: "Olive",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  updated_at: "2022-08-15T10:59:09+0000"
};


export const initalState = 
  [
    category,
    {...getCategory, id:"123", name: "Peach"},
    {...getCategory, id:"124", name: "Apple"},
    {...getCategory, id:"125", name: "Banana"},
  ];


const categoriesSlice = createSlice({
  name: "categories",
  initialState: initalState,
  reducers: {
    createCategory(state, action) {},
    updagteCreateCategory(state, action) {},
    deleteCategory(state, action) {},
  }

});

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function createCategoryMutation(category: Category) {
  return { url: endpointUrl, method: "POST", body: category };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function getCategory({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export default categoriesSlice.reducer;
export const { createCategory, updagteCreateCategory, deleteCategory } = 
  categoriesSlice.actions;

export const {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApiSlice;
