import { Box, Typography } from '@mui/material'
import React from 'react'

type Props = {}

const ConfirmationInstruction = (props: Props) => {
  return (
    <Box>
      <Typography>
        Thank you for registration! Please check your email inbox to confirm your email
      </Typography>
    </Box>
  )
}

export default ConfirmationInstruction
