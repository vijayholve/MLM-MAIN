import React from 'react'

const Success = () => {
      const [openMessage, setOpenMessage] = useState(false);
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
