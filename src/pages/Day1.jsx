import { Typography, Box } from '@mui/material'

export default function Day1() {
  return (
    <div>
      <Typography variant="h4">Day1</Typography>
       {Array.from({ length: 30 }).map((_, i) => (
        <Box key={i} sx={{ py: 1 }}>
          Word {i + 1}
        </Box>
      ))}
    </div>
  )
}