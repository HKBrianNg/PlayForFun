import { Typography, Box } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        首页
      </Typography>
      {Array.from({ length: 30 }).map((_, i) => (
        <Box key={i} sx={{ py: 1 }}>
          测试内容 {i + 1}
        </Box>
      ))}
    </Box>
  )
}