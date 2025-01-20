import { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { UserContext } from "../../app";


const Kyctable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [Data, setData] = useState([]);
    const {baseURL} =useContext(UserContext)
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    useEffect(() => {
      axios.get(`${baseURL}/kyc/create-kyc`).then((responce) => {
        console.log(responce.data);
        setData(responce.data);
      });
    }, []);
  
       const columns = ['id',
    'username',
    'email',
    'mlm_id',
    'sponsor',
    'left',
    'right',
    'custom_sponsor_id',
    'position',
    'kyc Status',
    // 'parent'
    ]

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Country
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                 key={column}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((item, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell key={item.id}>{item.id}</TableCell>
                
                  <TableCell><img src={`${baseURL}`} alt="" /></TableCell>
                  <TableCell>{item.back_aadhar_img}</TableCell>
                  <TableCell>{item.front_pan_img}</TableCell>
                  <TableCell>{item.back_pan_img}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Kyctable
