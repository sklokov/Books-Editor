import React, { useContext } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import { Container, Grid, Button, IconButton, Typography, makeStyles } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'formik-material-ui';
import UploadButtons from '../BookDetails/UploadButton'; 
import { Context } from '../MainPage/MainPage';
import { useParams, useHistory } from "react-router-dom";
import * as Yup from 'yup';
 
const ISBNRegexp = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/gm;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(30, 'Слишком длнинное название!')
    .required('Заполните поле!'),
  authors: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string()
          .max(20, 'Не более 20 символов')
          .required('Заполните поле!'),
        lastName: Yup.string()
          .max(20, 'Не более 20 символов')
          .required('Заполните поле!')
      })
    ),
  pagesNum: Yup.number()
    .min(1, 'Страниц должно быть > 1')
    .max(10000, 'Страниц должно быть не более 10 000')
    .required('Заполните поле!'),
  publisher: Yup.string()
    .max(30, 'Слишком длнинное название!')
    .required('Заполните поле!'),
  publicationYear: Yup.number()
    .min(1800, 'Не ранее 1800 года!')
    .required('Заполните поле!'),
  printDate: Yup.date()
    .min('1800-01-01', 'Не ранее 01.01.1800')
    .required('Заполните поле!'),
  isbn: Yup.string()
    .matches(ISBNRegexp, 'Введите код в формате ISBN-10 или ISBN-13')
    .required('Заполните поле!')
});

const useStyles = makeStyles({
  title: {
    margin: '50px 0 30px'
  },
  grid: {
    margin: '15px 0 30px'
  }
});

export const BookForm = () => {
  const { booksData, setBooksData } = useContext(Context);
  const { isbn } = useParams();
  const history = useHistory();
  const book = booksData.find( book => book.isbn === isbn);
  const classes = useStyles();
  const initialValues = {
    title: '',
    authors: [
      {
        firstName: '',
        lastName: ''
      }
    ],
    pagesNum: '',
    publisher: '',
    publicationYear: '',
    printDate: '',
    isbn: '',
    img: ''
  };

  if ( !book && isbn ) return null;

  return (
    <Container maxWidth="xs">
      <Formik
        validateOnChange
        initialValues={book ? book : initialValues}
        validationSchema={validationSchema}
        onSubmit={ values => {
          if ( isbn ) {
            const newBooksData = booksData.map( book => {
              if ( book.isbn !== isbn ) return book;

              return {...values}
            });

            setBooksData(newBooksData);

          } else {
            setBooksData([...booksData, values])
          }

          history.push('/')
        }}
      >
        { ({ values, handleSubmit, setFieldValue }) => (
          <Form>
            <Typography variant="h4" className={classes.title}>{isbn ? 'Редактирование книги' : 'Новая книга'}</Typography>

            <Grid className={classes.grid}>
              <Typography variant="h6">Название книги</Typography>
              <Field
                component={TextField}
                maxLength='10'
                variant="outlined"
                fullWidth
                id="title"
                label="Название книги"
                name="title"
              />
            </Grid>

            <Grid className={classes.grid}>
              <Typography variant="h6" gutterBottom>Авторы</Typography>
              <FieldArray
                name="authors"
                render={ arrayHelpers => (
                  <div>
                    {values.authors.map((author, index, array) => (
                      <Grid key={index}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                          <Field
                              component={TextField}
                              maxLength='10'
                              variant="outlined"
                              fullWidth
                              id={`authors.${index}.firstName`}
                              label="Имя"
                              name={`authors.${index}.firstName`}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              component={TextField}
                              maxLength='10'
                              variant="outlined"
                              fullWidth
                              id={`authors.${index}.lastName`}
                              label="Фамилия"
                              name={`authors.${index}.lastName`}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <IconButton 
                      onClick={() => arrayHelpers.pop()}
                      disabled={arrayHelpers.form.values.authors.length === 1 ? true : false }>
                      <RemoveIcon/>
                    </IconButton>

                    <IconButton onClick={() => arrayHelpers.push({ firstName: '', lastName: '' })}>
                      <AddIcon/>
                    </IconButton>
                  </div>
                )}
              />
            </Grid>

            <Grid className={classes.grid}>
              <Typography variant="h6" gutterBottom>Количество страниц</Typography>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                type="number"
                id="pagesNum"
                label="Количество страниц"
                name="pagesNum"
              />
            </Grid>

            <Grid className={classes.grid}>
              <Typography variant="h6" gutterBottom>Название издательства</Typography>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                id="publisher"
                label="Название издательства"
                name="publisher"
              />
            </Grid>

            <Grid className={classes.grid}>
              <Typography variant="h6" gutterBottom>Год публикации</Typography>
              <Field
                component={TextField}
                type="number"
                variant="outlined"
                fullWidth
                name="publicationYear"
                label="Год публикации"
                id="publicationYear"
              />
            </Grid>

            <Grid className={classes.grid}>
              <Typography variant="h6" gutterBottom>Дата выхода в тираж</Typography>
              <Field
                component={TextField}
                type="date"
                fullWidth
                name="printDate"
                label="Дата выхода в тираж"
                id="printDate"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid className={classes.grid}>
              <Typography variant="h6" gutterBottom>ISBN</Typography>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                name="isbn"
                label="ISBN"
                id="isbn"
              />
            </Grid>

            <Grid className={classes.grid}>
              <img src={values.img} style={{maxWidth: '100%'}}/>
              <UploadButtons setFieldValue={setFieldValue}/>
            </Grid>

            <Grid className={classes.grid}>
              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary">Сохранить</Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}