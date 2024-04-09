import React from 'react'
import Navbar from '../../components/Navbar'
import Main from '../../components/Main'
import Header from '../../components/Header'

const Dashboard = () => {
  return (
    <div className='flex h-full w-full'>
        <Navbar/>
        <section className='flex flex-col w-full'>
        <Header/>
        <Main/>
        </section>
    </div>
  )
}

export default Dashboard