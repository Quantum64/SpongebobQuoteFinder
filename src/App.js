import React, { Component } from 'react';
import './App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CloudDownload from '@material-ui/icons/CloudDownload';

const theme = createMuiTheme({
  palette: {
    primary: { main: orange[900] },
    secondary: amber,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      pwa: props.prompt
    };
  }

  updateSearch(text) {
    let results = [];
    if (text.trim() !== "") {
      import('./episodes/search').then((episodes) => {
        results = episodes.search(text);
        this.setState({
          search: text,
          results: results
        });
      });
      return;
    }
    this.setState({
      search: text,
      results: results
    });
  }

  installClick() {
    this.state.pwa().prompt();
    this.state.pwa().userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          this.setState({
            pwa: () => undefined
          });
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
  }

  render() {
    let results = [];
    let resultIndex = 0;
    for (let result of this.state.results) {
      const resultDisplay = (
        <Grid item key={"result-card-" + resultIndex}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Season {result.season} Episode {result.episode}: {result.title}
              </Typography>
              <Typography color="textSecondary">
                About {result.percent}% through the episode
              </Typography>
              <br />
              <Typography component="p">
                “{result.line}”
              </Typography>
              <Typography stype={{ fontSize: 14 }} color="textSecondary" gutterBottom>
                <i>— {result.by}</i>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
      results.push(resultDisplay)
      resultIndex++;
    }
    let extraText = "© 2018 Quantum Development @ University of Cincinnati"
    if (results.length === 0) {
      extraText = "Type a quote you want to find above...";
    }

    const { classes } = this.props;
    console.log(this.state.pwa())
    const cloud = this.state.pwa() === undefined ? "" : (
      <div className={classes.cloudIcon}>
        <IconButton
          aria-owns={'menu-appbar'}
          aria-haspopup="true"
          onClick={() => this.installClick()}
          color="inherit"
        >
          <CloudDownload />
        </IconButton>
      </div>
    )
    const appbarTitle = "Spongebob Quote Finder";
    return (
      <div className="App">
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <AppBar position="static">
            <Typography className={classes.mobileTitle} variant="h6" color="inherit" noWrap>
              {appbarTitle}
            </Typography>
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                {appbarTitle}
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  id="search"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={this.state.search}
                  onChange={(event) => this.updateSearch(event.target.value)}
                >
                </InputBase>
                <label htmlFor="search" style={{ display: "none" }}>Search</label>
              </div>
              {cloud}
            </Toolbar>
          </AppBar>
          <Grid container spacing={24} direction="column" justify="center" alignItems="center" style={{ padding: 20, margin: 0, width: '100%', }}>
            {results}
            <Grid item>
              <Typography variant="subheading" gutterBottom align="center" style={{ color: "grey" }}>
                {extraText}
              </Typography>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  mobileTitle: {
    display: 'block',
    marginTop: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    //backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      //backgroundColor: fade(theme.palette.common.white, 0.40),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  cloudIcon: {
    display: 'flex',
    float: 'right',
    marginLeft: 'auto',
    marginRight: 0
  },
});

export default withStyles(styles)(App);
