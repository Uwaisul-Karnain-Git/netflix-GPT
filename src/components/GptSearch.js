import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTSearchSuggessions from './GPTSearchSuggessions'
import { BG_URL } from '../utils/constants'

const GPTSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
            <img 
              className='h-screen w-screen object-cover'
              src={BG_URL}
              alt="logo"
            />
        </div>
      
      <div>
        <GPTSearchBar />
        <GPTSearchSuggessions />
      </div>
    </>
  )
}

export default GPTSearch