import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';


function createData(id, player, team, games, ppg, apg, rpg) {
  return { id, player, team, games, ppg, apg, rpg };
}

const rows = [
  createData(1,  'Player One', "Team One", 10, 6.0, 24, 4.0),
  createData(2,  'Player Ten', "Team One", 10, 9.0, 37, 4.3),
  createData(3,  'Player Two', "Team One", 10, 16.0, 24, 6.0),
  createData(4,  'Player Four', "Team Two", 10, 3.7, 67, 4.3),
  createData(5,  'Player Nine', "Team Two", 10, 16.0, 49, 3.9),
  createData(6,  'Player Thirty', "Team Two", 10, 6.0, 24, 4.0),
  createData(7,  'Player Three', "Team Three", 10, 9.0, 37, 4.3),
  createData(8,  'Player Five', "Team Three", 10, 16.0, 24, 6.0),
  createData(9,  'Player Seven', "Team Three", 10, 3.7, 67, 4.3),
  createData(10, 'Player Twenty', "Team Four", 10, 16.0, 49, 3.9),
  createData(11, 'Player Twenty-One', "Team Four", 10, 6.0, 24, 4.0),
  createData(12, 'Player Six', "Team Four", 10, 9.0, 37, 4.3),
  createData(13, 'Player Eight', "Team Five", 10, 16.0, 24, 6.0),
  createData(14, 'Player Eleven', "Team Five", 10, 3.7, 67, 4.3),
  createData(15, 'Player Twelve', "Team Five", 10, 16.0, 49, 3.9),
  createData(16, 'Player Thirteen', "Team Six", 10, 6.0, 24, 4.0),
  createData(17, 'Player Fourteen', "Team Six", 10, 9.0, 37, 4.3),
  createData(18, 'Player Fifteen', "Team Six", 10, 16.0, 24, 6.0),
  createData(19, 'Player Sixteen', "Team Seven", 10, 3.7, 67, 4.3),
  createData(20, 'Player Seventeen', "Team Seven", 10, 16.0, 49, 3.9),
  createData(21, 'Player Eighteen', "Team Seven", 10, 6.0, 24, 4.0),
  createData(22, 'Player Nineteen', "Team Eight", 10, 9.0, 37, 4.3),
  createData(23, 'Player Twenty-Two', "Team Eight", 10, 16.0, 24, 6.0),
  createData(24, 'Player Twenty-Three', "Team Eight", 10, 3.7, 67, 4.3),
  createData(25, 'Player Twenty-Four', "Team Nine", 10, 16.0, 49, 3.9),
  createData(26, 'Player Twenty-Five', "Team Nine", 10, 6.0, 24, 4.0),
  createData(27, 'Player Twenty-Six', "Team Nine", 10, 9.0, 37, 4.3),
  createData(28, 'Player Twenty-Seven', "Team Ten", 10, 16.0, 24, 6.0),
  createData(29, 'Player Twenty-Eight', "Team Ten", 10, 3.7, 67, 4.3),
  createData(30, 'Player Twenty-Nine', "Team Ten", 10, 16.0, 49, 3.9),
];

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    width: 200,
    label: 'Player',
    id: 'player',
    disablePadding: false,
  },
  {
    width: 120,
    label: 'Team',
    id: 'team',
    disablePadding: false,
  },
  {
    width: 120,
    label: 'Games',
    id: 'games',
    numeric: true,
    disablePadding: false,
  },
  {
    width: 120,
    label: 'PPG',
    id: 'ppg',
    numeric: true,
    disablePadding: false,
  },
  {
    width: 120,
    label: 'APG',
    id: 'apg',
    numeric: true,
    disablePadding: false,
  },
  {
    width: 120,
    label: 'RPG',
    id: 'rpg',
    numeric: true,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/*<Checkbox
            color="primary" // cant change??
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all players',
            }}
          />*/}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: 'white',
                '&.MuiTableSortLabel-root:hover': {
                  color: 'lightgrey', // Add your hover styles here
                },
                '&.Mui-active': {
                  color: 'red', // Active (clicked) styles
                },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        color:"white",
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),

        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Player Statistics
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function PlayerStatsTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ 
        width: '100%', 
        mb: 2 , 
        background:"radial-gradient(circle at 50% 50%, #260880, #000)", 
        border:"1px solid #260880",
        borderRadius:2.5,
        overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            // stickyHeader
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ 
                      cursor: 'pointer', 
                      color:"white", 
                      '&:hover': {
                        border: '1px solid grey', // Add your hover styles here
                    },}}
                  >
                    <TableCell padding="checkbox">
                      {/*<Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />*/}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{color:"white"}}
                    >
                      {row.player}
                    </TableCell>
                    <TableCell align="left"  sx={{color:"white"}}>{row.team}</TableCell>
                    <TableCell align="right" sx={{color:"white"}}>{row.games}</TableCell>
                    <TableCell align="right" sx={{color:"white"}}>{row.ppg}</TableCell>
                    <TableCell align="right" sx={{color:"white"}}>{row.apg}</TableCell>
                    <TableCell align="right" sx={{color:"white"}}>{row.rpg}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}

// export default PlayerStatsTable;