import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './menu';
import SearchBox from '../components/search_box';
import Pagination from '@material-ui/lab/Pagination';
import MuiVirtualizedTable from '../rerport/rpt_tong_hop';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { requestGetListLoaiXe, resquestGetListCarType } from '../../api'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    height: 800,
  },
});



function countMoney(n) {
  n = parseFloat(n);
  var b = n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " vnd";
  if (b == "NaN vnd") {
    return ""
  }
  else {
    return b;
  }
}


class Home extends React.Component {
  state = { message: "" }
  callbackFunction = (childData) => {
    this.setState({ dataSearchBox: childData })
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      page: "1"
    };
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  // LoadingPage(){
    
  // }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  handleChange = (event, value) => {
    this.setState({page: value},()=>this.refs.search_box.list())
  };


  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const {dataSearchBox} = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Báo cáo tổng hợp
          </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={100} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          {/* <div className={classes.appBarSpacer} /> */}
          <Container maxWidth="xl" className={classes.container}>
            {/* serach box */}
            <Paper>
              <SearchBox ref="search_box" parentCallback={this.callbackFunction} dataFromHome = {this.state.page}/>
            </Paper>

            {/* end box */}
            <Grid container spacing={1}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={9}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <Typography>Page: {this.state.page}</Typography>
                  <Pagination count= {dataSearchBox && Math.ceil(dataSearchBox.data.total / dataSearchBox.data.limit)}
                   page={this.state.page} onChange={this.handleChange.bind(this)} 
                   />
                  {console.log(this.state.page, "page")}
                  <br /><br />
                  <MuiVirtualizedTable dataPage = {this.state.page} dataFromHome={this.state.dataSearchBox}
                  ></MuiVirtualizedTable>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <div style={{ height: 250, width: '100%' }}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center">Vào</TableCell>
                          <TableCell align="center">Ra</TableCell>
                          <TableCell align="center">Tồn</TableCell>
                          <TableCell align="center">Doanh thu</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Việt Nam</TableCell>
                          <TableCell align="center">{this.state.countInVn}</TableCell>
                          <TableCell align="center">{this.state.countOutVn}</TableCell>
                          <TableCell align="center">{this.state.countTonVn}</TableCell>
                          <TableCell align="center">{countMoney(this.state.countDoanhThuVn)}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Trung Quốc</TableCell>
                          <TableCell align="center">{this.state.countInCN}</TableCell>
                          <TableCell align="center">{this.state.countOutCN}</TableCell>
                          <TableCell align="center">{this.state.countTonCN}</TableCell>
                          <TableCell align="center">{countMoney(this.state.countDoanhThuCn)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div >
                    <div >
                      <h3>Ảnh vào</h3>
                    </div>
                    <div>
                      <div>
                        <div >
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                    <div >
                      <h3 >Ảnh ra</h3>
                    </div>
                    <div >
                      <div >
                        <div >
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                  </div>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>

                </Paper>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Home);