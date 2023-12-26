import Footer from "./components/footer/Footer";

import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./components/detailsPage/DetailsPage";
import CatBasedPosts from "./components/categoryList/CatBasedPosts";
import SignIn from "./components/login/login";
import SignUp from "./components/login/signUp";
import AddPost from "./components/posts/AddPost";
import AddCategory from "./components/categoryList/AddCategory";
import UserEdit from "./components/login/user";


function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details/:slug" element={<DetailsPage />} />
          <Route path="/category/:id" element={<CatBasedPosts />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/useredit" element={<UserEdit />} />
          
          
        </Routes>
      </BrowserRouter>
      <Footer />
      
    </>
  );
}

export default App;
