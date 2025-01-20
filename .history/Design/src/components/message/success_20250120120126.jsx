import React, { useContext } from 'react'
import { UserContext } from '../../app';
const Success = () => {
      const {} = useContext()
    const handleCloseMessage = () => {
        setOpenMessage(false);
      };
    
  return (
    <>
     {successMessage && (
            <Snackbar
              open={openMessage}
              autoHideDuration={6000}
              onClose={handleCloseMessage}
            >
              <Alert
                onClose={handleCloseMessage}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {successMessage}
              </Alert>
            </Snackbar>
          )}
    
      
    </>
  )
}

export default Success
