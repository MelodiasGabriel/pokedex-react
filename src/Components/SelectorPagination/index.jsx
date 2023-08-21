import { Box } from '@mui/material'
import React from 'react'

const PaginationSelector = ({itensPerPage, setItensPerPage}) => {
  return (
    <div>
      <Box>
          <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={64}>64</option>
            <option value={88}>88</option>
          </select>
        </Box>
    </div>
  )
}

export default PaginationSelector
