import { Box } from '@mui/material'
import React from 'react'

const Paginacao = ({pages, currentPage, setCurrentPage}) => {
  return (
    <div>
      <Box>
          {Array.from(Array(pages), (pokemon, index) =>{
            return <button 
                style={ index === currentPage ? {backgroundColor: "gray"} : null}
                key={index} 
                value={index} 
                onClick={(e) => 
                    setCurrentPage(Number(e.target.value))}>
                {index + 1}
            </button>
          })}
        </Box>
    </div>
  )
}

export default Paginacao
