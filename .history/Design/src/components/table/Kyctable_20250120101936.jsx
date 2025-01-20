import React from 'react'

const Kyctable = () => {
  return (
    <>
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
                  <a href={`/mlm-tree/${item.id}`}>
                  <TableCell key={item.id}>{item.id}</TableCell>
                  </a>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.mlm_id}</TableCell>
                  <TableCell>{item.sponsor}</TableCell>
                  <TableCell>{item.left}</TableCell>
                  <TableCell>{item.right}</TableCell>
                  <TableCell>{item.custom_sponsor_id}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  {item.kyc
                  ? 
                    <TableCell>{item.kyc.status}</TableCell>
                    :
                    <TableCell>
                      Not Submited
                    </TableCell>             
                     }
                    

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
