import React, { useContext } from 'react';
import {Card, Avatar} from "antd";
import './BooksGalleryList.css';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import { Context } from '../MainPage/MainPage';


const BooksGalleryItem = ({ img, title, isbn, authors, pagesNum, publisher, publicationYear, printDate }) => {
    const { booksData, setBooksData } = useContext(Context)

    const { Meta } = Card;
    const authorsString = authors.map( ({ firstName, lastName }) => `${firstName} ${lastName}` ).join(', ');

    const removeItem = (isbn) => {
        const newBooksData = booksData.filter((item) => item.isbn !== isbn);
        setBooksData(newBooksData);
    }

    return (
        <div className="card-container">
            <Card
                bodyStyle={{padding: "0", paddingBottom: 25, paddingTop: 25}}
                style={{width: 300}}
                cover={
                  <img
                      id="card-img" src={img} alt={title}
                  />
                }
                actions ={[
                  <div id="edit-id">
                      <NavLink to={`/form/${isbn}`}>
                          <p><EditOutlined key="edit"/> edit</p>
                      </NavLink>
                  </div>,
                  <p onClick={() => removeItem(isbn)}><DeleteOutlined key="ellipsis"/> delete</p>
                ]}
            >
                <p><b>{title}</b></p>
                <Meta/>
                <br>
                </br>
                <div className="content">
                  <p>{authors.length > 1 ? 'Авторы' : 'Автор'}: {authorsString}</p>
                  <p>Количество страниц: {pagesNum}</p>
                  <p>Издательство {publisher}</p>
                  <p>Год публикации {publicationYear}</p>
                  <p>Выход в тираж {printDate}</p>
                  <p>ISBN {isbn}</p>
                </div>
            </Card>
        </div>
    )

}

export default BooksGalleryItem;

