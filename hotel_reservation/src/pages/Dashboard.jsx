import React from 'react'
import Hero from '../components/Hero'
import HotelsList from '../components/hotel/hotel-list'
import Room from '../components/room/Room'

const Dashboard = () => {
    return (
        <div>
            <Hero />
            <HotelsList />
            <Room />
        </div>
    )
}

export default Dashboard
