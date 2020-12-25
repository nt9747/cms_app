import React from "react";

import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grouped from "./auto_loai_hang_input";
import Icon from "@material-ui/core/Icon";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SearchIcon from "@material-ui/icons/Search";
import { requestGetListCar, resquestGetListCarType, resquestGetListLoaiHang } from '../../api'
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
      padding: theme.spacing(2),
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: theme.spacing(1),
    width: "20ch",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 300,
  },
  selectEmpty: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

function GetFormatDatePicker(a) {
  const b = new Date(a);
  b.setMinutes(b.getMinutes() - b.getTimezoneOffset());
  var hours = b.getUTCHours();
  var minutes = b.getUTCMinutes();
  var seconds = b.getUTCSeconds();
  var month = b.getUTCMonth() + 1;
  var day = b.getUTCDate();
  var year = b.getUTCFullYear();


  if (month.toString().length == 1) {
    month = '0' + month;
  }
  if (day.toString().length == 1) {
    day = '0' + day;
  }
  if (hours.toString().length == 1) {
    hours = '0' + hours;
  }
  if (minutes.toString().length == 1) {
    minutes = '0' + minutes;
  }
  if (seconds.toString().length == 1) {
    seconds = '0' + seconds;
  }
  return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggleOn: true,
      selectReport: 0,
      selectGate: 0,
      fromDate: '2017-05-24T10:30',
      toDate: '2017-05-24T10:30',
      plateNumber: '',
      portIn: '',
      numberCar: "",
      loaiHang: "",
      data: "",
      isLoading: true,
      page: "",
      selectCong: 0,
      selectReport: "listCar/listCarInOut?",
      selectPort: 0,
      portIn: "",
      PortOut: "",
      selectLoaiXe: "",
      limitPage: 500,
      bienCont: "",
      bienMooc: "",
    };
  }
  async list() {
    await this.setState({
      isLoading: true
    })
    console.log(GetFormatDatePicker(this.state.fromDate))
    console.log(GetFormatDatePicker(this.state.toDate))
    console.log(this.state.plateNumber, "bienXe")
    console.log(this.state.portIn, "portIn")
    console.log(this.state.PortOut, "portOut")
    console.log(this.state.numberCar, "Ma The")
    console.log(this.state.loaiHang, "Loai Hang")
    console.log(this.state.page, "page")
    console.log(this.state.selectReport, "Cong")
    console.log(this.state.selectLoaiXe, "Loai Xe")
    console.log(this.state.limitPage, "limitPage")
    console.log(this.state.orderNumber, "So Thu Tu")
    console.log(this.state.bienCont, "bienCont")
    console.log(this.state.bienMooc, "bienMooc")
    try {
      this.setState({ page: 1 })
      const res = await requestGetListCar({
        FROMDATE: GetFormatDatePicker(this.state.fromDate),
        TODATE: GetFormatDatePicker(this.state.toDate),
        PLATENUMBER: this.state.plateNumber,
        PORTIN: this.state.portIn,
        PORTOUT: this.state.PortOut,
        NUMBERCAR: this.state.numberCar,
        LOAIHANG: this.state.loaiHang,
        PAGE: this.state.page,
        CONG: this.state.selectReport,
        LOAIXE: this.state.selectLoaiXe,
        LIMIT: this.state.limitPage,
        ORDERNUMBER: this.state.orderNumber,
        BIENCONT: this.state.bienCont,
        BIENMOOC: this.state.bienMooc,
      })
      await this.setState({ data: res.data, isLoading: false });
      console.log(res.data, "check data");
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
      const res2 = await resquestGetListLoaiHang({
      })
      await this.setState({ dataHang: res2.data });
    } catch (err) {
      await this.setState({
        isLoading: false
      }, () => console.log(err))
    }
  }

  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  handlePortChange(field, event) {
    this.setState({ [field]: event.target.value })
    if (event.target.value == 4) {
      this.setState({ portIn: '1', PortOut: '3' })
    }
    else if (event.target.value == 0) {
      this.setState({ portIn: '', PortOut: '' })
    }
    else if (event.target.value == 1) {
      this.setState({ portIn: '0', PortOut: '' })
    }
    else if (event.target.value == 2) {
      this.setState({ portIn: '', PortOut: '2' })
    }
    else if (event.target.value == 3) {
      this.setState({ portIn: '', PortOut: '4' })
    }
  }


  handleAPIChange(field, event) {
    this.setState({ [field]: event.target.value })
    if (event.target.value == 0) {
      this.setState({ selectReport: '/listCar/listCarInOut?' })
    }
    else if (event.target.value == 1) {
      this.setState({ selectReport: '/listCar/listCarIn?' })
    }
    else if (event.target.value == 2) {
      this.setState({ selectReport: '/listCar/listCarOut?' })
    }
    else if (event.target.value == 3)
      this.setState({ selectReport: '/listCar/listCarParking?' })
  }

  componentDidMount() {
    this.list();
    this.start();
  }


  render() {
    const classes = useStyles;
    return (
      <div>
        <form className={classes.root} noValidate>
          <CssBaseline />

          <Grid container spacing={3} className={classes.selectEmpty}>
            <Grid item>
              <TextField
                id="datetime-local"
                label="Ngày vào"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,

                }}
                value={this.state.fromDate}
                onChange={(e) => this.handleTextChange('fromDate', e)}
              />
            </Grid>

            <Grid item>
              <TextField
                id="datetime-local"
                label="Ngày ra"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.toDate}
                onChange={(e) => this.handleTextChange('toDate', e)}
              />
            </Grid>

            <Grid item>
              <TextField
                id="bienso"
                label="Biển số xe"
                variant="outlined"
                className={classes.textField}
                value={this.state.plateNumber}
                onChange={(e) => this.handleTextChange('plateNumber', e)}
              />
            </Grid>

            <Grid item>
              <TextField
                id="bienso"
                label="Số thứ tự"
                variant="outlined"
                className={classes.textField}
                value={this.state.orderNumber}
                onChange={(e) => this.handleTextChange('orderNumber', e)}
              />
            </Grid>

            <Grid item>
              <TextField
                id="bienso"
                label="Mã thẻ"
                variant="outlined"
                className={classes.textField}
                value={this.state.numberCar}
                onChange={(e) => this.handleTextChange('numberCar', e)}
              />
            </Grid>

            <Grid item>
              <Grouped></Grouped>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.selectEmpty}>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="baocao">Báo cáo</InputLabel>
                <Select
                  labelId="baocao"
                  id="typeReport"
                  value={this.state.selectCong}
                  onChange={(e) => this.handleAPIChange("selectCong", e)}
                  label="Báo cáo"
                >
                  <MenuItem value={0}>Báo cáo vào/ ra</MenuItem>
                  <MenuItem value={1}>Báo cáo xe vào</MenuItem>
                  <MenuItem value={2}>Báo cáo xe ra</MenuItem>
                  <MenuItem value={3}>Báo cáo xe tồn</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="cong">Cổng</InputLabel>
                <Select
                  labelId="cong"
                  id="typeOfCong"
                  value={this.state.selectPort}
                  onChange={(e) => this.handlePortChange("selectPort", e)}
                  label="Cổng"
                >
                  <MenuItem value={0}>Tất cả</MenuItem>
                  <MenuItem value={1}>Làn vào VN</MenuItem>
                  <MenuItem value={2}>Làn ra quay đầu</MenuItem>
                  <MenuItem value={3}>Làn ra Xuất</MenuItem>
                  <MenuItem value={4}>Làn vào/ ra TQ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="loaixe">Loại Xe</InputLabel>
                <Select
                  labelId="loaixe"
                  id="loaixe"
                  value={this.state.selectLoaiXe}
                  onChange={(e) => this.handleTextChange("selectLoaiXe", e)}
                  label="Loại xe"
                >
                  <MenuItem value=''>Tất cả</MenuItem>
                  {this.state.dataXe && this.state.dataXe.map((item, i) =>
                    <MenuItem value={item.ID} >{item.Name}</MenuItem>
                  )}
                    
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="loaixe">Loại Hàng</InputLabel>
                <Select
                  labelId="loaixe"
                  id="loaixe"
                  value={this.state.loaiHang}
                  onChange={(e) => this.handleTextChange("loaiHang", e)}
                  label="Loại hàng"
                >
                  <MenuItem value=''>Tất cả</MenuItem>
                  {this.state.dataHang && this.state.dataHang.map((item, i) =>
                    <MenuItem value={item.cName} >{item.cName}</MenuItem>
                  )}
                    
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SearchIcon></SearchIcon>}
                onClick={() => this.list()}
              >
                Tìm kiếm
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<NoteAddIcon></NoteAddIcon>}
              >
                Xuất excel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchBox);
