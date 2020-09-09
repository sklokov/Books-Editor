import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function UploadButtons({ setFieldValue }) {
    const classes = useStyles();

    const handleChange = ({ currentTarget }) => {
        const reader = new FileReader();
        reader.readAsDataURL(currentTarget.files[0]);
        reader.onloadend = () => {
            setFieldValue('img', reader.result);
        };

    };

    return (
        <div className={classes.root}>
            <input 
                onChange={handleChange}
                accept="image/*" 
                className={classes.input} 
                id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </div>
    );
}

export default UploadButtons;