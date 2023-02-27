import ModalSales from '../components/ModalSales';
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import {
  Button,
  Grid,
  Paper,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { getData, setData } from '../store/stock-actions';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  brand_id: "",
  product_id: "",
  quantity: "",
  price: "",
};


const Sales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { saleTransc, products, brands } = useSelector(state => state.stock);
  const [filterCategory, setFilterCategory] = useState("choose");
  const [filteredData, setFilteredData] = useState([]);
  const [field, setField] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [sort, setSort] = useState("default");
  const [info, setInfo] = useState(initialValues);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangeRowPerPage = (e) => { 
    setRowsPerPage(+e.target.value);
    setPage(0);
  }


  const handleEdit = (data) => { 
    setInfo(data);
    handleOpen();
  }

  const handleDelete = (id) => { 
    dispatch(setData('delete', 'sales', id, navigate, '/stock/sales'))
  }


  const getFilter = () => { 
    if (filterCategory === 'choose') {
      setFilteredData(saleTransc)
    } else if (filterCategory === 'brand') {
      if (field) {
        const rows = saleTransc?.filter(item => item.brand_id === field)
        setFilteredData(rows)
      }
    } else if (filterCategory === 'product') { 
      if (field) {
        const rows = saleTransc?.filter(item => item.product_id === field)
        setFilteredData(rows)
      }
    }
  }


  const getSort =()=> { 
    if (sort === "brand") {
      const sortData = filteredData.sort((a, b) => a.brand - b.brand)
      setFilteredData(sortData)
    } else if (sort === 'amount') {
      const sortData = filteredData.sort((a, b) => +(a.amount) - +(b.amount))
      setFilteredData(sortData)
    } else { 
      if (filterCategory !== 'choose') { 
        getFilter();
      }

    }
  } 

  useEffect(() => { 
    getFilter()
  }, [filterCategory, field])


  useEffect(() => {
    getSort();

  }, [sort])
  return (

    <Grid item xs={ 12 } sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
      <Typography component="h1" variant="h5" color="inherit" noWrap sx={ { p: 2, pt: "2px" } } >
        Sales
      </Typography>
      <Stack direction="row" spacing={ 2 }>
        <Button variant="contained" onClick={ handleOpen } color="warning"> New Sale</Button>
        <div style={ { flexGrow: 1, justifyContent: 'space-between' } }></div>
        <FormControl sx={ { height: "40px", justifyContent: "end" } }>
          <InputLabel id="sale-filter-label">Filter </InputLabel>
          <Select labelId="sale-filter-label" id="sale-select"
            value={ filterCategory } label="Filter" sx={ { height: '40px' } }
            onChange={ (e) => setFilterCategory(e.target.value) }
          >
            <MenuItem value="choose"> Choose</MenuItem>
            <MenuItem value="brand"> Brand Name</MenuItem>
            <MenuItem value="product"> Product Name</MenuItem>
          </Select>
        </FormControl>
        { filterCategory !== 'choose' && (
          <FormControl sx={ { height: "40px", justifyContent: "end" } }>
            <InputLabel id="name-filter-label">Name </InputLabel>
            <Select labelId="name-filter-label" id="name-select"
              value={ field } label="Name" sx={ { height: '40px', width: '80px' } }
              onChange={ (e) => setField(e.target.value) }
            >
              { filterCategory === 'brand' ? (
                brands?.map(item => (
                  <MenuItem key={ item.id } value={ item.id }> { item.name }</MenuItem>
                ))
              ) : filterCategory === 'product' ? (
                products?.map(item => (
                  <MenuItem key={ item.id } value={ item.id }> { item.name }</MenuItem>
                ))
              ) : "" }
            </Select>
          </FormControl>
        ) }
        <Button
          variant="contained"
          color="warning"
          sx={ { backgroundColor: "darkslategrey" } }
          onClick={ () => setShowSort(!showSort) }
        >
          Sort
        </Button>
        { showSort && (
          <RadioGroup row>
            <FormControlLabel value="" control={ <Radio /> } label="Default"
              checked={ sort === '' } onClick={ () => setSort('') } />
            <FormControlLabel value="brand" control={ <Radio /> } label="Brand Name"
              checked={ sort === 'brand' } onClick={ () => setSort('brand') } />
            <FormControlLabel value="amount" control={ <Radio /> } label="Amount"
              checked={ sort === 'amount' } onClick={ () => setSort('amount') } />
          </RadioGroup>
        ) }

        <FormControl sx={ { height: "40px", justifyContent: "end" } }>
          <InputLabel id="sort-filter-label">Sort </InputLabel>
          <Select labelId="sort-filter-label" id="sort-select"
            value={ sort } label="Sort" sx={ { height: '40px', width: '100px' } }
            onChange={ (e) => setSort(e.target.value) }
          >
            <MenuItem value="default"> Choose</MenuItem>
            <MenuItem value="amount"> Price Ascending</MenuItem>
            <MenuItem value="brand"> Brand's Name (A-Z)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Paper sx={ {
        width: "90%",
        overflow: "hidden",
        margin: "30px auto",
      } }>

        <TableContainer sx={ { border: '5px' } }>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Brand's Name</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              { filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow key={ index }>
                      <TableCell>{ row.createds }</TableCell>
                      <TableCell>{ row.name }</TableCell>
                      <TableCell>{ row.brand }</TableCell>
                      <TableCell>{ row.product }</TableCell>
                      <TableCell>{ row.quantity }</TableCell>
                      <TableCell>{ row.price }</TableCell>
                      <TableCell>${ row.amount }</TableCell>
                      <TableCell>
                        <EditIcon
                          onClick={ () => handleEdit(row) }
                          sx={ { cursor: "pointer" } }
                        />
                        <DeleteOutlineIcon
                          onClick={ () => handleDelete(row.id) }
                          sx={ { cursor: "pointer" } }
                        />
                      </TableCell>
                    </TableRow>
                  );
                }) }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={ [5, 10, 25, filteredData.length < 25 ? "All" : filteredData.length] }

          colsapn={ 3 }
          count={ filteredData.length }
          rowsPerPage={ rowsPerPage }
          onPageChange={ (e, newPage) => setPage(newPage) }
          onRowsPerPageChange={ handleChangeRowPerPage }
        >

        </TablePagination>
      </Paper>

      <ModalSales open={ open } initialValues={ initialValues } info={ info } setInfo={ setInfo } handleClose={ handleClose } />
    </Grid>
  )
}

export default Sales