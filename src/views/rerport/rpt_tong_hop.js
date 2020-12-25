import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
});

function GetFormatDate(a) {
  const b = new Date(a);
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
  if (year == 1970) {
    return ""
  }
  else return hours + ":" + minutes + ":" + seconds + "  " + day + "/" + month + "/" + year
}

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

class MuiVirtualizedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  handleTextChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }


  render() {
    const classes = useStyles;
    const { dataFromHome, dataPage } = this.props
    console.log(dataFromHome, "dataTable")
    return (

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>STT vào bãi</TableCell>
              <TableCell>Biển số xe vào/ra</TableCell>
              <TableCell>Biển Cont</TableCell>
              <TableCell>Biển Mooc</TableCell>
              <TableCell>Loại xe</TableCell>
              <TableCell>Mã số thẻ</TableCell>
              <TableCell>Thời gian vào bãi</TableCell>
              <TableCell>Thời gia ra bãi</TableCell>
              <TableCell>Thời gian lưu bãi</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Nhân viên vào/ra</TableCell>
              <TableCell>Nhân cho phép ra</TableCell>
              <TableCell>Loại hàng</TableCell>
              <TableCell>Cổng vào</TableCell>
              <TableCell>Cổng ra</TableCell>
              <TableCell>Phiếu hải quan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFromHome && dataFromHome.data.data.map((item, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {(dataPage - 1) * 50 + i + 1}
                </TableCell>
                <TableCell >{item.SoThuTuTrongNgay}</TableCell>
                <TableCell >{item.BienXe || item.BienXeVao + " / " + (item.BienXeRa || "")}</TableCell>
                <TableCell>{item.BienCont || item.BienContVao}</TableCell>
                <TableCell>{item.BienMooc || item.BienMoocVao}</TableCell>
                <TableCell>{(item.LoaiXeChiTiet || "Chưa có") || item.Name} </TableCell>
                <TableCell>{item.MaSoTrenThe || "Chưa có"} </TableCell>
                <TableCell>{GetFormatDate(item.NgayGioVao) || "Chưa có"}</TableCell>
                <TableCell>{GetFormatDate(item.NgayGioRa) || "Chưa có"}</TableCell>
                <TableCell>{item.ThoiGianTrongBai || "Chưa có"}</TableCell>
                <TableCell>{countMoney(item.TongTienThu) || "Chưa có"}</TableCell>
                <TableCell>{(item.NhanVienVao || "") + " / " + (item.NhanVienRa || "")}</TableCell>
                <TableCell>{item.NhanVienDongYRa || "Chưa có"}</TableCell>
                <TableCell>{item.LoaiHangChiTiet || item.LoaihangChiTiet}</TableCell>
                <TableCell>{item.CongVaoName}</TableCell>
                <TableCell>{item.CongRaName || "Chưa có"}</TableCell>
                <TableCell>{item.PhieuHaiQuan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default withStyles(useStyles)(MuiVirtualizedTable);