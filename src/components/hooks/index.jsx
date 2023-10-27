/* eslint-disable react/prop-types */
import { useState, useReducer } from "react";
const booksData = [
  { id: 1, name: "shihab" },
  { id: 2, name: "Hasan" },
  { id: 3, name: "Tashrif" },
];

const Modal = ({ modalText }) => {
  return <p>{modalText}</p>;
};

const reducer = (state, action) => {
  // action.type , action.payload are come from dispatch
  //state is the current state which is come from dispatch automatically
  if (action.type == "ADD") {
    const allbooks = [...state.books, action.payload];
    return {
      ...state,
      books: allbooks,
      isModalOpen: true,
      modalText: "book is added",
    };
  }
  if (action.type == "REMOVE") {
    const allbooks = state.books.filter((book) => book.id != action.payload);

    return {
      ...state,
      books: allbooks,
      isModalOpen: true,
      modalText: "Item removed",
    };
  }
  return state;
};
const UseReducer = () => {
  /*const [books, setBooks] = useState(booksData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  */
  const [bookState, dispatch] = useReducer(reducer, {
    books: booksData,
    isModalOpen: false,
    modalText: "",
  });

  const [bookName, setBookName] = useState("");

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: new Date().getTime().toString(), name: bookName };

    dispatch({ type: "ADD", payload: newBook });
    setBookName("");
  };
  //handle remove
  const removeBook = (id) => {
    dispatch({ type: "REMOVE", payload: id });
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
      {bookState.isModalOpen && <Modal modalText={bookState.modalText} />}

      {bookState.books.map((book) => {
        const { id, name } = book;
        return (
          <>
            <li key={id}>
              {name}{" "}
              <button
                onClick={() => {
                  removeBook(id);
                }}
              >
                Remove
              </button>
            </li>
            <br />
          </>
        );
      })}
    </div>
  );
};

export default UseReducer;
