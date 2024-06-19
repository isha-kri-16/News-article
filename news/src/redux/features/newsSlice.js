import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  articles: [],            
  loading: true,           
  error: null,            
  page: 1,               
  totalResults: 0,          
};

// const apiKey = "a1813f3ce83349d2a8c2a21f106bd6a1"; 
const apiKey = "a0e209b9d2d84f999e65495b9eb4365f"
const pageSize = 10; 

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category, { getState }) => {
    const {
      news: { page },
    } = getState(); 
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
); 

const newsSlice = createSlice({
  name: "news", 
  initialState, 
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = newsSlice.actions;
export default newsSlice.reducer;
