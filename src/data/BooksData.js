import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";
import image4 from "./4.jpg";
import image5 from "./5.jpg";
import image6 from "./6.jpg";
import image7 from "./7.jpg";
import image8 from "./8.jpg";

let BooksData = [
    {
        img: image1,
        title: 'JS. Подробное руководство',
        authors: [
            {
                firstName: 'Дэвид',
                lastName: 'Флэнаган'
               
            },
            {
                firstName: 'Стоян',
                lastName: 'Стефанов'
            }
        ],
        isbn: "978-5-93286-215-5",
        publisher: 'O`Reilly',
        pagesNum: 1080,
        publicationYear: 2012,
        printDate: "2012-05-30"
    },
    {
        img: image2,
        title: 'JS. Шаблоны',
        authors: [
            {
                firstName: 'Стоян',
                lastName: 'Стефанов'
            }
        ],
        isbn: "978-5-93286-208-7",
        publisher: 'O`Reilly',
        pagesNum: 262,
        publicationYear: 2010,
        printDate: "2011-05-01"
    },
    {
        img: image3,
        title: 'Выразительный JS',
        authors: [
            {
                firstName: 'Марейн',
                lastName: 'Хавербеке'
            }
        ],
        isbn: "978-5-4461-1226-5",
        publisher: 'O`Reilly',
        pagesNum: 480,
        publicationYear: 2019,
        printDate: "2019-06-13"
    },
    {
        img: image4,
        title: 'Node.JS. Путеводитель',
        authors: [
            {
                firstName: 'Кирилл',
                lastName: 'Сухов'
            }
        ],
        isbn: "978-5-97060-164-8",
        publisher: 'ДМК Пресс',
        pagesNum: 418,
        publicationYear: 2015,
        printDate: "2017-09-05"
    },
    {
        img: image5,
        title: 'Замыкания и объекты',
        authors: [
            {
                firstName: 'Кайл',
                lastName: 'Симпсон'
            }
        ],
        isbn: "978-5-4461-1255-5",
        publisher: 'ИД Питер',
        pagesNum: 336,
        publicationYear: 2014,
        printDate: "2019-05-13"
    },
    {
        img: image6,
        title: 'ES6 и не только',
        authors: [
            {
                firstName: 'Кайл',
                lastName: 'Симпсон'
            }
        ],
        isbn: "978-5-4960-2445-7",
        publisher: 'ИД Питер',
        pagesNum: 336,
        publicationYear: 2016,
        printDate: "2016-07-18"
    },
    {
        img: image7,
        title: 'Python. К вершинам мастерства',
        authors: [
            {
                firstName: 'Лучано',
                lastName: 'Рамальо'
            }
        ],
        isbn: "978-5-97060-3840",
        publisher: 'ДМК Пресс',
        pagesNum: 770,
        publicationYear: 2015,
        printDate: "2019-11-01"
    },
    {
        img: image8,
        title: 'Программирование на JS',
        authors: [
            {
                firstName: 'Алексей',
                lastName: 'Васильев'
            }
        ],
        isbn: "978-5-699-95459-9",
        publisher: 'Эксмо',
        pagesNum: 721,
        publicationYear: 2017,
        printDate: "2017-10-24"
    }
]

export default BooksData;
