import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: 'popular',
      sortProperty: 'rating'
    }
  },
  reducers: {
    setCategoryId(state, action) {
      console.log("action", action)
      state.categoryId = action.payload
    },
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      setSortType(state, action) {
        console.log("action", action)
        state.sort = action.payload;
     
      },
      setCurrentPage(state, action) {
        state.currentPage = action.payload
      },
      setFilters(state, action) {
        state.categoryId = Number(action.payload.categoryId);
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
      }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer