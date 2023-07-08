import React from 'react'
import { DBHeader,DBHome,DBUsers,DBOrders,DBItems,DBNewItem } from '../components'
import { Route,Routes } from 'react-router-dom'

const DBRightSection = () => {
  return (
    <div className='flex flex-col py-12 px-12 flex-1 h-full'>
      <DBHeader />
      <div className='flex flex-col overflow-y-scroll scrollbar-none'>
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/users" element={<DBUsers/>} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItem />} />
        </Routes>
      </div> 
    </div>
  )
}

export default DBRightSection