import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageHouse = () => {
  const { isOwner, axios, currency } = useAppContext()
  const [houses, setHouses] = useState([])

  const fetchOwnerHouses = async () => {
    try {
      const { data } = await axios.get('/api/owner/houses')
      if (data.success) {
        setHouses(data.houses)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (houseId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-house', { houseId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerHouses()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteHouse = async (houseId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this house?')
      if (!confirm) return null

      const { data } = await axios.post('/api/owner/delete-house', { houseId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerHouses()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerHouses()
  }, [isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title 
        title="Manage Houses" 
        subTitle="View all listed houses, update their details, or remove them from the booking platform." 
      />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className="p-3 font-medium">House</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house, index) => (
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={house.image} alt="" className="h-12 w-12 aspect-square rounded-md object-cover" />
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{house.title}</p>
                    <p className='text-xs text-gray-500'>{house.location} • {house.rooms} Rooms</p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>{house.category}</td>
                <td className='p-3'>{currency}{house.pricePerDay}/day</td>

                <td className='p-3 max-md:hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${house.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                    {house.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className='flex items-center p-3'>
                  <img 
                    onClick={() => toggleAvailability(house._id)} 
                    src={house.isAvailable ? assets.eye_close_icon : assets.eye_icon} 
                    alt="" 
                    className='cursor-pointer'
                  />
                  <img 
                    onClick={() => deleteHouse(house._id)} 
                    src={assets.delete_icon} 
                    alt="" 
                    className='cursor-pointer'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageHouse
