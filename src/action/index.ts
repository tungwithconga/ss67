interface BookManagement {
  id: number;
  nameBook: string;
  nameStudent: string;
  borrowedDay: string;
  payDay: string;
  status: boolean;
}
export const addBook = (book: BookManagement) => ({
    type: 'ADD_BOOK',
    payload: book
});

export const deleteBook = (id: number) => ({
    type: 'DELETE_BOOK',
    payload: id
});

export const editBook = (book: BookManagement) => ({
    type: 'EDIT_BOOK',
    payload: book
});
