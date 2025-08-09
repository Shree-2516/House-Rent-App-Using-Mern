import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddHouse = () => {

  const { axios, currency } = useAppContext()

  const [image, setImage] = useState(null)
  const [house, setHouse] = useState({
    title: '',
    type: '',
    yearBuilt: 0,
    pricePerDay: 0,
    category: '',
    bedrooms: 0,
    bathrooms: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('houseData', JSON.stringify(house))

      const { data } = await axios.post('/api/owner/add-house', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setHouse({
          title: '',
          type: '',
          yearBuilt: 0,
          pricePerDay: 0,
          category: '',
          bedrooms: 0,
          bathrooms: 0,
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title
        title="Add New House"
        subTitle="Fill in details to list a new house for booking, including pricing, availability, and specifications."
      />

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>

        {/* House Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="house-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
            <input type="file" id="house-image" accept="image/*" hidden onChange={e => setImage(e.target.files[0])} />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your house</p>
        </div>

        {/* Title & Type */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Cozy Family Home, Modern Apartment..."
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={house.title}
              onChange={e => setHouse({ ...house, title: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Type</label>
            <input
              type="text"
              placeholder="e.g. Apartment, Villa, Cottage..."
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={house.type}
              onChange={e => setHouse({ ...house, type: e.target.value })}
            />
          </div>
        </div>

        {/* Year Built, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year Built</label>
            <input
              type="number"
              placeholder="2015"
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={house.yearBuilt}
              onChange={e => setHouse({ ...house, yearBuilt: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="150"
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={house.pricePerDay}
              onChange={e => setHouse({ ...house, pricePerDay: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select
              onChange={e => setHouse({ ...house, category: e.target.value })}
              value={house.category}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a category</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Cottage">Cottage</option>
            </select>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Bedrooms</label>
            <input
              type="number"
              placeholder="3"
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={house.bedrooms}
              onChange={e => setHouse({ ...house, bedrooms: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Bathrooms</label>
            <input
              type="number"
              placeholder="2"
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={house.bathrooms}
              onChange={e => setHouse({ ...house, bathrooms: e.target.value })}
            />
          </div>
        </div>

        {/* Location */}
        <div className='flex flex-col w-full'>
          <label>Location</label>
          <select
            onChange={e => setHouse({ ...house, location: e.target.value })}
            value={house.location}
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
          >
            <option value="">Select a location</option>
            <option value="New York">Mumbai</option>
            <option value="Los Angeles">Pune</option>
            <option value="Houston">Dellhi</option>
            <option value="Chicago">Kolhapur</option>
          </select>
        </div>

        {/* Description */}
        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. Spacious villa with a private pool and ocean view."
            required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={house.description}
            onChange={e => setHouse({ ...house, description: e.target.value })}
          ></textarea>
        </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your House'}
        </button>
      </form>
    </div>
  )
}

export default AddHouse
