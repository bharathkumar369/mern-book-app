import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import CreateBook from "./components/CreateBook";
import DeleteBook from "./components/DeleteBook";
import EditBook from "./components/EditBook";
import Showbook from "./components/Showbook";
import Home from "./components/Home";


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books/details/:id" element={<Showbook/>}/>
        <Route path="/books/edit/:id" element={<EditBook/>}/>
        <Route path="/books/delete/:id" element={<DeleteBook/>}/>
        <Route path="/books/create" element={<CreateBook/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;