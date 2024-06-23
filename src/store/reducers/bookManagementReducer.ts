interface BookManagement {
  id: number;
  nameBook: string;
  nameStudent: string;
  borrowedDay: string;
  payDay: string;
  status: boolean;
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('bookManagement');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state from localStorage", e);
        return [];
    }
};

const saveToLocalStorage = (state: BookManagement[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('bookManagement', serializedState);
    } catch (e) {
        console.error("Could not save state to localStorage", e);
    }
};

const initialState: BookManagement[] = loadFromLocalStorage();

const bookManagementReducer = (state = initialState, action: any) => {
    let newState;
    switch (action.type) {
        case 'ADD_BOOK':
            newState = [...state, action.payload];
            saveToLocalStorage(newState);
            return newState;
        case 'DELETE_BOOK':
            newState = state.filter(book => book.id !== action.payload);
            saveToLocalStorage(newState);
            return newState;
        case 'EDIT_BOOK':
            newState = state.map(book => 
                book.id === action.payload.id ? action.payload : book
            );
            saveToLocalStorage(newState);
            return newState;
        default:
            return state;
    }
};

export default bookManagementReducer;
