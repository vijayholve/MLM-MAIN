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
import { Dialog, DialogContent, Select, MenuItem } from "@mui/material";

const styles = {
  image: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "5px",
    border: "1px solid #ddd",
    cursor: "pointer",
  },
  tableCell: {
    textAlign: "center",
    verticalAlign: "middle",
  },
  dialogImage: {
    width: "100%",
    height: "auto",
    maxWidth: "500px",
    borderRadius: "10px",
  },
};

const Kyctable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [Data, setData] = useState([]);
  const { baseURL } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // API call to update the status
      await axios.patch(`${baseURL}/kyc/operate-kyc/${id}/`, {
        status: newStatus,
      });
      // Update the local state after successful API response
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    axios.get(`${baseURL}/kyc/operate-kyc`).then((response) => {
      setData(response.data);
    });
  }, []);

  const columns = [
    "id",
    "front_aadhar_img",
    "back_aadhar_img",
    "front_pan_img",
    "back_pan_img",
    "status",
  ];

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  KYC
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((item, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell sx={styles.tableCell}>{item.id}</TableCell>
                  <TableCell sx={styles.tableCell}>
                    <img
                      src={`${baseURL}${item.front_aadhar_img}`}
                      alt="Front Aadhar"
                      style={styles.image}
                      onClick={() =>
                        handleImageClick(`${baseURL}${item.front_aadhar_img}`)
                      }
                    />
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    <img
                      src={`${baseURL}${item.back_aadhar_img}`}
                      alt="Back Aadhar"
                      style={styles.image}
                      onClick={() =>
                        handleImageClick(`${baseURL}${item.back_aadhar_img}`)
                      }
                    />
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    <img
                      src={`${baseURL}${item.front_pan_img}`}
                      alt="Front PAN"
                      style={styles.image}
                      onClick={() =>
                        handleImageClick(`${baseURL}${item.front_pan_img}`)
                      }
                    />
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    <img
                      src={`${baseURL}${item.back_pan_img}`}
                      alt="Back PAN"
                      style={styles.image}
                      onClick={() =>
                        handleImageClick(`${baseURL}${item.back_pan_img}`)
                      }
                    />
                  </TableCell>
                  <TableCell sx={styles.tableCell}>
                    <Select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      displayEmpty
                      sx={{ width: "120px" }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
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
      {/* Dialog for Image Preview */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogContent sx={{ textAlign: "center" }}>
          <img src={selectedImage} alt="Preview" style={styles.dialogImage} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Kyctable;
