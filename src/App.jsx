import React, { Component } from "react";
import axios from "axios";
import {Form, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./Books";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import { Carousel } from "bootstrap";
const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:3001";

class BestBooks extends Component {
  state = {
    books: [],
    showAddForm: false,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(backendUrl + "/books");
      this.setState({ books: response.data });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
  renderBooks() {
    if (this.state.books.length === 0) {
      return <p>No More Books.</p>;
    } else {
      return (
        <div>
          <div>
            {this.state.books.map((book, index) => (
              <Carousel>
              <Carousel.Item key={index}>
                <img className="d-block w-100"
                src="https://www.google.com/books/edition/The_Color_Purple/1W8-c_m-noEC?hl=en&gbpv=1&dq=the%20color%20purple&pg=PP1&printsec=frontcover"
                alt="Slide 1"/>
                <img className="d-block w-100"
                src="https://www.google.com/books/edition/The_Silence_of_the_Lambs/zm9vEAAAQBAJ?hl=en&gbpv=1&dq=silence%20of%20the%20lambs&pg=PP1&printsec=frontcover"
                alt="Slide 2"/>
                <img className="d-block w-100"
                src="https://www.google.com/books/edition/Maybe_You_Never_Cry_Again/5ANCSjFRhf8C?hl=en&gbpv=1&pg=PP1&printsec=frontcover"
                alt="Slide 3"/>
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <p>{book.description}</p>
                  <p>{book.URL}</p>
                  </Carousel.Caption>
                  </Carousel.Item>
                  </Carousel>
                
              ))}
          </div>
        </div>
      );
    }
  }

  handleBookAdded = (newBook) => {
    
    this.setState((prevState) => ({
      books: [...prevState.books, newBook],
      showAddForm: false, 
    }));
  };
  

  render() {
    return (
      <div>
      
        <Button type="submit">Add Book</Button>
        <BookFormModal
        show={this.state.showAddForm}
        onHide={() => this.setState({ showAddForm: false })}
        onBookAdded={this.handleBookAdded}
      />
      
      <Routes>
        <Route path="/" element={<Books books={this.state.books}/>} />
        <Route path="/about" element={<About />} />
        
      </Routes>
      </div>
    );
  
  }
  
}
export default BestBooks;
 