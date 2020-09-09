import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Menu, Dropdown, Button} from 'antd';
import { SortAscendingOutlined, ClockCircleOutlined, DownOutlined } from '@ant-design/icons';
import defaultData from "../../data/BooksData";
import { Route, Switch, useHistory } from "react-router-dom";
import './MainPage.css';
import SignUp from "../BookDetails/BookFormDetails";
import { BookForm } from '../form/form';
import BooksGalleryList from "../BooksGallery/BooksGalleryList";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
    '&:hover': {
      color: '#fff'
    }
  },
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    fontSize: '14px'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const Context = React.createContext();

export default function PrimarySearchAppBar() {
  const history = useHistory();
  const [booksData, setBooksData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortType, setSortType] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    const localData = localStorage.getItem('books');

    if (localData) {
      const parsedData = JSON.parse(localData);
      setBooksData(parsedData);
      setFilteredData(parsedData);
    }
    else {
      localStorage.setItem('books', JSON.stringify(defaultData));
      setBooksData(defaultData);
      setFilteredData(defaultData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(booksData));
  }, [booksData]);

  useEffect(() => {
    setFilteredData(
      booksData.filter(dataItem =>
        dataItem.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, booksData]);

  useEffect(() => {
    localStorage.setItem('sortType', JSON.stringify(sortType));
  }, [sortType])

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => setSortType(0)}
        key="1"
        icon={<SortAscendingOutlined />}>по заголовку</Menu.Item>
      <Menu.Item
        onClick={() => setSortType(1)}
        key="2"
        icon={<ClockCircleOutlined />}>по году публикации</Menu.Item>
    </Menu>
  );


  const SplitButton = () => {
    return (
      <div id="components-dropdown-demo-dropdown-button">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button>
            Сортировать <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    );
  }

  return (
    <Context.Provider value={{
      booksData,
      setBooksData,
      filteredData,
      sortType
    }}>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap onClick={() => history.push('/')}>Books Editor</Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={e => setSearch(e.target.value)}
              />
              <SplitButton />

            </div>

            <IconButton
              onClick={() => history.push('/form')}
              variant="contained">
                <AddIcon style={{ color: '#fff' }}/>
              </IconButton>

            <div className={classes.grow} />
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/'
            render={() => <BooksGalleryList />} />
          <Route path='/book-info/:isbn'
            render={props => <SignUp data={booksData} {...props} />} />
          <Route path={['/form/:isbn', '/form']}
            render={() => <BookForm />} />
        </Switch>
      </div>
    </Context.Provider>
  );
}