import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import { requestGetListCar } from '../../api'



const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
    fromDate: '01/10/2020 00:00:00',
            toDate: '26/12/2020 00:00:00',
            plateNumber: '',
            portIn: '',
            numberCar: "",
            loaiHang: "",
            data: "",
            isLoading: true,
            page: 1,
            PortOut: '',
            SelectCong: "/listCar/listCarInOut?",
            total: "",
            dataXe: "",
            loaiXe: "",
            showBienXe: true,
            showLoaiXe: false,
            showLoaiHang: false,
            pictureDauXeVao: "",
            pictureDauXeRa: "",
            pictureVaoFull: "",
            pictureRaFull: "",
            pictureBienSo: "",
            dataPicture: "",
            totalPage: "",
            namePort: "",
            dataThongKeXe: "",
            thongKeLoaiXe: "/Statistic/statisticCarInOut",
            TongKetCong: "",
            countIn: "",
            countOut: "",
            countTon: "",
            totalMoney: "",
            codeThongKeXe: "",
            limitPage: "20",
            orderNumber: "",
            bienCont: "",
            bienMooc: "",
            dataHang: "",
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---
const sample = [
  [14344, '29-3C159', 6456, 24644, 46540],
];
const rows = [];
function createData(id, STT, Bienso, BienCont, BienMooc, protein) {
  return { id, STT, Bienso, BienCont, BienMooc, protein };
}
for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

class TongHop extends React.Component {
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
  async list() {
    await this.setState({
        isLoading: true
    })
    try {
        this.setState({page: 1})
        const res = await requestGetListCar({
            FROMDATE: this.state.fromDate,
            TODATE: this.state.toDate,
            PLATENUMBER: this.state.plateNumber,
            PORTIN: this.state.portIn,
            PORTOUT: this.state.PortOut,
            NUMBERCAR: this.state.numberCar,
            LOAIHANG: this.state.loaiHang,
            PAGE: this.state.page,
            CONG: this.state.SelectCong,
            LOAIXE: this.state.loaiXe,
            LIMIT: this.state.limitPage,
            ORDERNUMBER: this.state.orderNumber,
            BIENCONT: this.state.bienCont,
            BIENMOOC: this.state.bienMooc,

        })
        await this.setState({ isActive: null, data: res.data, total: res.data.total, previousPage: res.data.previousPage, nextPage: res.data.nextPage });
        this.setState({ totalPage: Math.ceil(this.state.total / this.state.limitPage)})
        if ((this.state.SelectCong == "/listCar/listCarIn?" && (this.state.PortOut == "2" || this.state.PortOut == "4")) || (this.state.SelectCong == "/listCar/listCarOut?" && (this.state.portIn == "0" || (this.state.portIn == "1" && this.state.PortOut == null)))) {
            alert("Wrong choose!")
            window.location.href = '/home'
        }
        if ((this.state.SelectCong == "/listCar/listCarParking?" && this.state.namePort == "3")) {
            alert("Cổng quay đầu ko xem được danh sách xe tồn, vui lòng chọn đúng cổng!")
            window.location.href = '/home'
        }
      } catch (err) {
        await this.setState({
            isLoading: false
        }, () => console.log(err))
    }
  }
  render() { 
  return (
    <Paper style={{ height: 300, width: '160%' }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 200,
            label: 'STT',
            dataKey: 'id',
          },
          {
            width: 200,
            label: 'STT vào bãi',
            dataKey: 'STT',
          },
          {
            width: 200,
            label: 'Biển số xe vào/ra',
            dataKey: 'Bienso',
          },
          {
            width: 200,
            label: 'Biển Cont',
            dataKey: 'BienCont',
          },
          {
            width: 200,
            label: 'Biển Mooc',
            dataKey: 'BienMooc',
          },
          {
            width: 200,
            label: 'Loại xe',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Mã số thẻ',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Thời gian vào bãi',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Thời gia ra bãi',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Thời gian lưu bãi',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Số tiền',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Nhân viên vào/ra',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Nhân cho phép ra',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Loại hàng',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Cổng vào',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Cổng ra',
            dataKey: '',
          },
          {
            width: 200,
            label: 'Phiếu hải quan',
            dataKey: '',
          },
        ]}
      />
    </Paper>
  );
}
}
export default withStyles(styles,{ withTheme: true })(TongHop);