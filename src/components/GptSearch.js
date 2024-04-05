import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTSearchSuggessions from './GPTSearchSuggessions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
            <img 
                src={BG_URL}
                alt="logo"
            />
        </div>
      <GPTSearchBar />
      <GPTSearchSuggessions />
    </div>
  )
}

export default GPTSearch