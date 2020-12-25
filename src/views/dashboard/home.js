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
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      open: true,
      countIn: "",
      countOut: "",
      countTon: "",
      totalMoney: "",
      codeThongKeXe: "",
      dataThongKeXe: "",
      countInVn: "0",
      countOutVn: "0",
      countTonVn: "0",
      countDoanhThuVn: "0",
      countInCN: "0",
      countOutCN: "0",
      countTonCN: "0",
      countDoanhThuCn: "0",
      portInVN: "0",
      PortOutVN: "2",
      portInCN: "1",
      portOutCN: "3",
    };
  }
  handleDrawerOpen = () => {
    this.setState({open: true});
  };
  handleDrawerClose = () => {
    this.setState({open: false});
  };


  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  async list() {
    await this.setState({
        isLoading: true
    })
    try {
        this.setState({page: 1})
        const res2 = await requestGetListLoaiXe({
          FROMDATE: this.state.fromDate,
          TODATE: this.state.toDate,
          PLATENUMBER: this.state.plateNumber,
          PORTOUT: this.state.PortOut,
          PORTIN: this.state.portIn,
          NUMBERCAR: this.state.numberCar,
          LOAIHANG: this.state.loaiHang,
          LOAIXE: this.state.loaiXe,
          THONGKELOAIXE: this.state.thongKeLoaiXe,
          BIENCONT: this.state.bienCont,
          BIENMOOC: this.state.bienMooc,
      })
      await this.setState({countIn: res2.data.countIn, countOut: res2.data.countOut, totalMoney: res2.data.totalMoney })
      if (this.state.namePort == 1) {
          this.setState({
              countInVn: this.state.countIn, countOutVn: this.state.countOut, countDoanhThuVn: this.state.totalMoney,
              countInCN: '0', countOutCN: '0', countDoanhThuCn: '0', countTonCN: '0'
          })
          this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
      }
      if (this.state.namePort == 2) {
          this.setState({
              countInVn: '0', countOutVn: '0', countDoanhThuVn: '0', countTonVn: '0',
              countInCN: this.state.countIn, countOutCN: this.state.countOut, countDoanhThuCn: this.state.totalMoney
          })
          this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
      }
      if (this.state.namePort == 3) {
          this.setState({
              countInVn: this.state.countIn, countOutVn: this.state.countOut, countDoanhThuVn: this.state.totalMoney,
              countInCN: '0', countOutCN: '0', countDoanhThuCn: '0', countTonCN: '0'
          })
          this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
      }
      if (this.state.namePort == 4) {
          this.setState({
              countInVn: '0', countOutVn: '0', countDoanhThuVn: '0', countTonVn: '0',
              countInCN: this.state.countIn, countOutCN: this.state.countOut, countDoanhThuCn: this.state.totalMoney
          })
          this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
      }
      if (this.state.namePort == 5) {
          this.setState({
              countInVn: '0', countOutVn: '0', countDoanhThuVn: '0', countTonVn: '0',
              countInCN: this.state.countIn, countOutCN: this.state.countOut, countDoanhThuCn: this.state.totalMoney
          })
          this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
      }
      if (this.state.namePort == 6) {
          await this.setState({
              isLoading: true
          })
              const res3 = await requestGetListLoaiXe({
                  FROMDATE: this.state.fromDate,
                  TODATE: this.state.toDate,
                  PLATENUMBER: this.state.plateNumber,
                  PORTOUT: this.state.PortOutVN,
                  PORTIN: this.state.portInVN,
                  NUMBERCAR: this.state.numberCar,
                  LOAIHANG: this.state.loaiHang,
                  LOAIXE: this.state.loaiXe,
                  THONGKELOAIXE: this.state.thongKeLoaiXe,
                  BIENCONT: this.state.bienCont,
                  BIENMOOC: this.state.bienMooc,
              })
              await this.setState({ countInVn: res3.data.countIn, countOutVn: res3.data.countOut, countDoanhThuVn: res3.data.totalMoney })
              this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
              console.log(this.state.portInVN, this.state.PortOutVN)


              const res4 = await requestGetListLoaiXe({
                  FROMDATE: this.state.fromDate,
                  TODATE: this.state.toDate,
                  PLATENUMBER: this.state.plateNumber,
                  PORTOUT: this.state.PortOutCN,
                  PORTIN: this.state.portInCN,
                  NUMBERCAR: this.state.numberCar,
                  LOAIHANG: this.state.loaiHang,
                  LOAIXE: this.state.loaiXe,
                  THONGKELOAIXE: this.state.thongKeLoaiXe,
                  BIENCONT: this.state.bienCont,
                  BIENMOOC: this.state.bienMooc,
              })
              await this.setState({countInCN: res4.data.countIn, countOutCN: res4.data.countOut, countDoanhThuCn: res4.data.totalMoney })
              this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
              console.log(this.state.portInCN, this.state.portOutCN)
          }
          if (this.state.countTonVn < 0){
              this.setState({countTonVn: 0})
          }
          if (this.state.countTonCN < 0){
              this.setState({countTonCN: 0})
          }
          this.setState({isLoading: false})
  } catch (err) {
          await this.setState({
              isLoading: false
          }, () => console.log(err))
      }
  }

  async start() {
    await this.setState({
        isLoading: true
    })
    try {
        const res = await resquestGetListCarType({
        })
        await this.setState({ dataXe: res.data });

        const res3 = await requestGetListLoaiXe({
            FROMDATE: this.state.fromDate,
            TODATE: this.state.toDate,
            PLATENUMBER: this.state.plateNumber,
            PORTOUT: this.state.PortOutVN,
            PORTIN: this.state.portInVN,
            NUMBERCAR: this.state.numberCar,
            LOAIHANG: this.state.loaiHang,
            LOAIXE: this.state.loaiXe,
            THONGKELOAIXE: this.state.thongKeLoaiXe,
            BIENCONT: this.state.bienCont,
            BIENMOOC: this.state.bienMooc,
        })
        await this.setState({ countInVn: res3.data.countIn, countOutVn: res3.data.countOut, countDoanhThuVn: res3.data.totalMoney })
        this.setState({ countTonVn: this.state.countInVn - this.state.countOutVn })
        console.log(this.state.portInVN, this.state.PortOutVN)


        const res4 = await requestGetListLoaiXe({
            FROMDATE: this.state.fromDate,
            TODATE: this.state.toDate,
            PLATENUMBER: this.state.plateNumber,
            PORTOUT: this.state.PortOutCN,
            PORTIN: this.state.portInCN,
            NUMBERCAR: this.state.numberCar,
            LOAIHANG: this.state.loaiHang,
            LOAIXE: this.state.loaiXe,
            THONGKELOAIXE: this.state.thongKeLoaiXe,
            BIENCONT: this.state.bienCont,
            BIENMOOC: this.state.bienMooc,
        })
        await this.setState({countInCN: res4.data.countIn, countOutCN: res4.data.countOut, countDoanhThuCn: res4.data.totalMoney })
        this.setState({ countTonCN: this.state.countInCN - this.state.countOutCN })
        console.log(this.state.portInCN, this.state.portOutCN)
    
    if (this.state.countTonVn < 0){
        this.setState({countTonVn: 0})
    }
    if (this.state.countTonCN < 0){
        this.setState({countTonCN: 0})
    }

    } catch (err) {
        await this.setState({
            isLoading: false
        }, () => console.log(err))
    }
}


  render() {
    const { classes } = this.props;
    const { open } = this.state;
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
              <SearchBox></SearchBox>
            </Paper>

            {/* end box */}
            <Grid container spacing={1}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={9}>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <Pagination count={10} color="primary" />
                  <br/><br/>
              <MuiVirtualizedTable></MuiVirtualizedTable>
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
                                        <input type="text"/>
                                    </div>
                                </div>
                            </div>

                            <div >
                                <h3 >Ảnh ra</h3>
                            </div>
                            <div >
                                <div >
                                    <div >
                                        <input type="text"/>
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
export default withStyles(styles,{ withTheme: true })(Home);