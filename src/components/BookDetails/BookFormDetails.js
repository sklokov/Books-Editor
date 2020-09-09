import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddButton from "./AddAuthorBtn";
import UploadButtons from "./UploadButton";
import {useParams} from "react-router-dom";
import './BookFormDetails.css';
import { Context } from '../MainPage/MainPage'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignUp(props) {
  const [formState, setFormState] = useState({});
  const classes = useStyles();
  let { isbn } = useParams();
  let { booksData } = useContext(Context);
  
  let book = booksData.filter( item => item.isbn === isbn)[0] || {};

  return (
    <Container  component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                  Заголовок
              </Typography>
              <TextField
                  value={book.title}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Заголовок"
                  name="title"
                  autoComplete="title"
                />
            </Grid>
            
            <Grid item xs={12}>
              <AddButton data={book}/>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Количество страниц
              </Typography>
              <TextField
                value={book.pagesNum}
                variant="outlined"
                required
                fullWidth
                id="pagesNum"
                label="Количество страниц"
                name="pagesNum"
                autoComplete="pagesNum"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Название издательства
              </Typography>
              <TextField
                value={book.publisher}
                variant="outlined"
                required
                fullWidth
                id="publisher"
                label="Название издательства"
                name="publisher"
                autoComplete="publisher"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Год публикации
              </Typography>
              <TextField
                value={book.publicationYear}
                variant="outlined"
                required
                fullWidth
                name="publicationYear"
                label="Год публикации"
                id="publicationYear"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Дата выхода в тираж
              </Typography>
              <TextField
                value={book.printDate}
                variant="outlined"
                required
                fullWidth
                name="printDate"
                label="Дата выхода в тираж"
                id="printDate"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                ISBN
              </Typography>
              <TextField
                value={book.isbn}
                variant="outlined"
                required
                fullWidth
                name="ISBN"
                label="ISBN"
                id="ISBN"
                autoComplete="current-password"
              />
              
              <img className="form-img" src={book.img} alt="" style={{width: 60+'%', objectFit: "contain"}}/>

              <UploadButtons />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Сохранить
              </Button>
            </Grid>

          </Grid>

        </form>
      </div>
    </Container>
  );
}