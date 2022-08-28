import "./Table.scss";

import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import { AppContext } from "./../../index";
import { NavLink } from "react-router-dom";
import numeral from "numeral";
numeral.defaultFormat("0,0.00");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "rank",
    numeric: true,
    disablePadding: false,
    labelEn: "#",
    labelRu: "#",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    labelEn: "Name",
    labelRu: "Наименование",
  },
  {
    id: "priceUsd",
    numeric: true,
    disablePadding: false,
    labelEn: "Price",
    labelRu: "Цена",
  },
  {
    id: "changePercent24Hr",
    numeric: true,
    disablePadding: false,
    labelEn: "1h %",
    labelRu: "1h %",
  },
  {
    id: "marketCapUsd",
    numeric: true,
    disablePadding: false,
    labelEn: "Market Cap",
    labelRu: "Рыночная капитализация",
  },
  {
    id: "volumeUsd24Hr",
    numeric: true,
    disablePadding: false,
    labelEn: "Volume(24h)",
    labelRu: "Объем (24ч)",
  },
  {
    id: "supply",
    numeric: true,
    disablePadding: false,
    labelEn: "Circulating Supply",
    labelRu: "Циркулирующее предложение",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const { lang } = useContext(AppContext);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className="category_head"
            >
              {lang === "en" ? headCell.labelEn : headCell.labelRu}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const { currs, currency, lang } = useContext(AppContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptycurrs =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - currs.length) : 0;

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          cellSpacing={0}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={currs.length}
          />
          <TableBody>
            {stableSort(currs, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell width="1" padding="normal" align="right">
                      {row.rank}
                    </TableCell>
                    <TableCell
                      component="td"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      <NavLink
                        to={`/currency/${row.symbol}`}
                      >{`${row.name} (${row.symbol})`}</NavLink>
                    </TableCell>
                    <TableCell align="right">{`${currency}${numeral(
                      row.priceUsd
                    ).format()}`}</TableCell>
                    <TableCell align="right">
                      {`${Number(row.changePercent24Hr).toFixed(1)}%`}
                    </TableCell>
                    <TableCell align="right">{`${currency}${numeral(
                      row.marketCapUsd
                    ).format("0,0")}`}</TableCell>
                    <TableCell align="right">{`${currency}${numeral(
                      row.volumeUsd24Hr
                    ).format("0,0")}`}</TableCell>
                    <TableCell align="right">
                      {`${numeral(row.supply).format("0,0")} ${row.symbol}`}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptycurrs > 0 && (
              <TableRow
                style={{
                  height: 53 * emptycurrs,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={currs.length}
        labelRowsPerPage={
          lang === "en" ? "Rows per page:" : "Рядов на странице:"
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table_pagination"
      />
    </>
  );
}
