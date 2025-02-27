import React from 'react';
import Header from './Header';
import Footer from "./Footer"
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";


const Layout = ({ children, title, description, keywords, author, onLoginRegisterClick }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header onLoginRegisterClick={onLoginRegisterClick} />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "ToDoApp - Do Tasks",
  description: "MernStack Project",
  keywords: "Mern,React,Node,Express,MongoDB",
  author: "ToDoApplication"
}

export default Layout;