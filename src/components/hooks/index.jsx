/* eslint-disable react/prop-types */
import { useState } from "react";
const booksData = [
  { id: 1, name: "shihab" },
  { id: 2, name: "Hasan" },
  { id: 3, name: "Tashrif" },
];

const Modal = ({ modalText }) => {
  return <p>{modalText}</p>;
};
const UseReducer = () => {
  const [books, setBooks] = useState(booksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [bookName, setBookName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setBooks((prev) => {
      const NewBook = { id: new Date().getTime().toString(), name: bookName };
      return [...prev, NewBook];
    });
    setIsModalOpen(true);
    setModalText("Book is added");
  };
  return (
    <div>
      <h1>Books List :</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
      {isModalOpen && <Modal modalText={modalText} />}
      {books.map((book) => {
        const { id, name } = book;
        return <li key={id}>{name}</li>;
      })}
    </div>
  );
};

export default UseReducer;
