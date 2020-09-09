import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

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

function AddButton({ data }) {
  console.log(data);
  const classes = useStyles()
  const authorFirstName = data.authorFirstName;
  const authorLastName = data.authorLastName
  const [inputFields, setInputFields] = useState([
    {firstName: `${authorFirstName}`, lastName: `${authorLastName}`}
  ]);


  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, {firstName: '', lastName: ''}])
  }

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }

  useEffect(() => {
    setInputFields([])
  }, [data])

  return (
    <div>
      <CssBaseline/>
      <Typography variant="h6" gutterBottom>
        Список авторов
      </Typography>

      {inputFields.map((inputField, index, array) => (
        <Grid key={index} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={inputField.firstName}
                onChange={event => handleChangeInput(index, event)}
                required
                fullWidth
                id="firstName"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={inputField.lastName}
                onChange={event => handleChangeInput(index, event)}
                id="lastName"
                label="Фамилия"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
          </Grid>
          <IconButton
            onClick={() => handleRemoveFields(index)}
            disabled={array.length === 1 ? true : false }
          >
            <RemoveIcon/>
          </IconButton>
          <IconButton
            onClick={() => handleAddFields()}
          >
            <AddIcon/>
          </IconButton>
        </Grid>
      ))}
    </div>

  );
}

export default AddButton;


