import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBook, editBook,deleteBook } from '../../action';
import ModalAdd from '../modals/add/ModalAdd';
import ModalEdit from '../modals/edit/ModalEdit';
import swal from 'sweetalert';
interface BookManagement {
  id: number;
  nameBook: string;
  nameStudent: string;
  borrowedDay: string;
  payDay: string;
  status: boolean;
}
export default function ListBookManagement() {
  const books = useSelector((state: any) => state.bookManagementReducer);
  const dispatch = useDispatch();

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<BookManagement | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleStatus = (id: number) => {
    const book = books.find((book: BookManagement) => book.id === id);
    if (book) {
      const updatedBook = { ...book, status: !book.status };
      dispatch(editBook(updatedBook));
    }
  };

  const handleAdd = () => {
    setModalAdd(true);
  };

  const closeModalAdd = () => {
    setModalAdd(false);
  };

  const handleEdit = (book: BookManagement) => {
    setCurrentBook(book);
    setModalEdit(true);
  };

  const closeModalEdit = () => {
    setModalEdit(false);
    setCurrentBook(null);
  };

  const updateBook = (updatedBook: BookManagement) => {
    dispatch(editBook(updatedBook));
  };

  const handleDelete = (id: number) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBook(id));
        swal("Xoá thành công", {
          icon: "success",
        });
      }
    });
  };

  const addBook = (newBook: BookManagement) => {
    dispatch(addBook(newBook));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const filteredBooks = books.filter((book: BookManagement) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'Đã trả') return book.status;
    if (filterStatus === 'Chưa trả') return !book.status;
    return true;
  });

  return (
    <>
      <div>
        <button onClick={handleAdd}>Thêm thông tin</button>
        <div>
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="all">Lọc theo trạng thái</option>
            <option value="Đã trả">Đã trả</option>
            <option value="Chưa trả">Chưa trả</option>
          </select>
        </div>
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book: BookManagement, index: number) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.nameBook}</td>
              <td>{book.nameStudent}</td>
              <td>{book.borrowedDay}</td>
              <td>{book.payDay}</td>
              <td onClick={() => handleStatus(book.id)}>
                {book.status ? (
                  <button style={{ backgroundColor: "#32CD32", color: "white", border: "none", borderRadius: "10px" }}>Đã trả</button>
                ) : (
                  <button style={{ backgroundColor: "#DC143C", color: "white", border: "none", borderRadius: "10px" }}>Chưa trả</button>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(book)}>Sửa</button>
                <button onClick={() => handleDelete(book.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalAdd && <ModalAdd closeModalAdd={closeModalAdd} addBook={addBook} />}
      {modalEdit && currentBook && (
        <ModalEdit book={currentBook} closeModalEdit={closeModalEdit} updateBook={updateBook} />
      )}
    </>
  );
}
