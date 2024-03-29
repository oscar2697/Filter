import { Person, localStorageTypes } from "@/models";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: Person[] = []

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: getLocalStorage(localStorageTypes.FAVORITES) ? JSON.parse(getLocalStorage(localStorageTypes.FAVORITES) as string) : initialState,
    reducers: {
        addFavorite: (state, action) => {
            setLocalStorage(localStorageTypes.FAVORITES, action.payload)
            return action.payload
        },
        removeFavorites: (state, action) => {
            const filterState = current(state).filter((p: Person) => p.id !== action.payload.id)
            setLocalStorage(localStorageTypes.FAVORITES, filterState)
            return filterState
        } 
    }
})

export const { addFavorite, removeFavorites } = favoritesSlice.actions
export default  favoritesSlice.reducer