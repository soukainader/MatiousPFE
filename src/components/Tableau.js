import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import {Select,MenuItem} from '@material-ui/core'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
      minWidth:650,
  },
  radius: {
    borderRadius:15,
    marginTop:30,
    marginLeft:200,
    maxWidth:1200,
    marginBottom:50,
},
});

const Tableau = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState("");
  const [category,setCategory]=useState('all')
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [priceDirection, setPriceDirection] = useState("asc");
  const [rateDirection, setRateDirection] = useState("asc");
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  

 function handleChange(event) {
    setSelected(event.target.value);
  }

  const emptyRows =
  rowsPerPage - Math.min(rowsPerPage, product.length - page * rowsPerPage);


  const getProductData = async () => {
    try {
      const data = await axios.get(
        "https://fakestoreapi.com/products"
      );
      console.log(data.data);
      setProduct(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  const sortByPrice = () => {
    if (priceDirection === "asc") {
      setProduct(
        product.slice().sort((a, b) => {
          console.log(a.price);
          return b.price - a.price;
        })
      );
      setPriceDirection("desc");
    }

    if (priceDirection === "desc") {
      setProduct(
        product.slice().sort((a, b) => {
          console.log(a.price);
          return a.price - b.price;
        })
      );
      setPriceDirection("asc");
    }
  };

  const sortByRate = () => {
    if (rateDirection === "asc") {
      setProduct(
        product.slice().sort((a, b) => {
          console.log(a.rating.rate);
          return b.rating.rate - a.rating.rate;
        })
      );
      setRateDirection("desc");
    }

    if (rateDirection === "desc") {
      setProduct(
        product.slice().sort((a, b) => {
          console.log(a.rating.rate);
          return a.rating.rate - b.rating.rate;
        })
      );
      setRateDirection("asc");
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

    
  return (
    <div className="App">
      <Select
        style={{ width: "30%", cursor: "pointer",float: "right", marginTop:10, marginBottom:10,}}
        value={selected}
        onChange={handleChange}
        name="category"
        displayEmpty
        className={classes.selectEmpty}
      >
        <MenuItem value="all" selected>all</MenuItem>
        <MenuItem value="Men">Men's clothing</MenuItem>
        <MenuItem value="Jewelery">Jewelery</MenuItem>
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Women">Women's clothing</MenuItem>
      </Select>

  
      <TableContainer component={Paper} className={classes.radius} id="table">
        <Table className={classes.table} aria-label="customized table" >
          <TableHead>
            <TableRow>
            <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell id="category">Category</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell onClick={() => sortByPrice("price")} width="10%">Price&nbsp;&nbsp;<i class="fas fa-sort"></i></StyledTableCell>
              <StyledTableCell onClick={() => sortByRate("rating")} width="10%">&nbsp;&nbsp;&nbsp;&nbsp;Rating&nbsp;&nbsp;<i class="fas fa-sort"></i></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product
              .filter((item) => {
                if (selected == "all") {
                  return item;
                } else if (
                  item.category.toLowerCase().includes(selected.toLowerCase())
                ) {
                  return item;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                      <img width="100px" height="100px" src={item.image}/>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {item.title}
                    </StyledTableCell>
                    <StyledTableCell id="category">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.price}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.rating.rate} - {item.rating.count}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
               {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={product.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      </TableContainer>
  
    </div>
  );
};

export default Tableau;