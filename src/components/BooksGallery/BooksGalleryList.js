import React, {useContext} from 'react';
import './BooksGalleryList.css';
import BooksGalleryItem from "./BooksGalleryItem";
import { Context } from '../MainPage/MainPage';


const BooksGalleryList = () => {
    const { filteredData, sortType } = useContext(Context);
    let sortedList;
    
    if (sortType === 0) {
        sortedList = filteredData.sort((a, b) => a.title.localeCompare(b.title));
    } 
    else if (sortType === 1) {
        sortedList = filteredData.sort((a, b) => Number(a.publicationYear) - Number(b.publicationYear));
    } 
    else {
        sortedList = filteredData;
    }

    return (
        <div className="card-container">
            {sortedList.map( (item, idx) => (
                <BooksGalleryItem key={idx} {...item}/>
            ))}
        </div>
    )

}

export default BooksGalleryList;

