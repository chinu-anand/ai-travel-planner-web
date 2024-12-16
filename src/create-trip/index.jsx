import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const CreateTrip = () => {
  const[place, setPlace]=useState();
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-32h px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized iternaries based on your preferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-4 font-medium'>Where are you planning to go?</h2>
          
          <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLEMAPS_APIKEY}
            selectProps={{
              place,
              onChange: (v)=>{setPlace(v);console.log(v)}
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-4 font-medium'>How many days of trip you are planning for?</h2>
          
          <Input placeholder={'Ex. 3'} type="number"/>
        </div>

        
      </div>
    </div>
  )
}

export default CreateTrip