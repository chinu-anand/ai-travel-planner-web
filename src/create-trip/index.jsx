import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravellersList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/services/AIModel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

// CreateTrip Component
const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // seting the values to the form data
  const handleInput = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Google Login
  const login = useGoogleLogin({
    onSuccess: (response) => GetUserProfile(response),
    onError: (err) => console.log(err)
  });

  // Generate Trip
  const OnGenerateTrip = async () => {

    // Check if all the fields are filled
    if (!formData?.location) {
      toast("Please select where you are planning to go.");
      return;
    } else if (isNaN(Number(formData?.noOfDays)) || Number(formData?.noOfDays) > 6 || Number(formData?.noOfDays) < 1) {
      toast("Please select how many days you are planning to go. (up to 6 days)");
      return;
    } else if (!formData?.budget) {
      toast("Please select your budget.");
      return;
    } else if (!formData?.noOfTraveler) {
      toast("Please select the number of travelers.");
      return;
    }

    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);
    // Replace the values in the AI_PROMPT
    const FINAL_PROMPT = AI_PROMPT
      .replaceAll('{location}', formData?.location?.label)
      .replaceAll('{noOfDays}', formData?.noOfDays)
      .replaceAll('{noOfTraveler}', formData?.noOfTraveler)
      .replaceAll('{budget}', formData?.budget)

    // console.log(FINAL_PROMPT)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SavePromtResponse(result?.response?.text());
  }

  const SavePromtResponse = async (response) => {
    setLoading(true);
    const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
    const docId = uuidv4();
    // Save the response to the database
    await setDoc(doc(db, "AITrips", docId), {
      id: docId,
      userEmail: userEmail,
      userInput: formData,
      tripData: JSON.parse(response),
    });
    setLoading(false);
  }
  // Get User Profile
  const GetUserProfile = (response) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${response.access_token}`, {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
        Accept: 'application/json',
      }
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      OnGenerateTrip();
      setOpenDialog(false);
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-32h px-5 mt-10'>
      {/* Heading */}
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized iternaries based on your preferences.</p>
      <div className='mt-20 flex flex-col gap-10'>
        {/* Form Fields */}
        <div>
          <h2 className='text-xl my-4 font-medium'>Where are you planning to go?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLEMAPS_APIKEY}
            autocompletionRequest={{ types: ['(regions)'] }}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInput('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-4 font-medium'>How many days of trip you are planning for?</h2>
          <Input placeholder={'Ex. 3'} type="number" onChange={(e) => handleInput('noOfDays', e.target.value)} />
        </div>

        <div>
          <h2 className='text-xl mt-4 font-medium'>What's the budget?</h2>
          <p className='text-gray-500'>The budget is exclusively allocated for activities and during purposes.</p>
          <div className='grid grid-cols-4 gap-5 mt-4'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInput('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == item.title && `shadow-lg border-black`}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl mt-4 font-medium'>How many people are travelling?</h2>
          <div className='grid md:grid-cols-4 gap-5 mt-4'>
            {SelectTravellersList.map((item, index) => (
              <div key={index}
                onClick={() => handleInput('noOfTraveler', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.noOfTraveler == item.people && `shadow-lg border-black`}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='flex justify-center my-10'>
        <Button disabled={loading} onClick={OnGenerateTrip} className='w-full'>
          {loading ? (<><AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /><span>Creating Trip</span></>) : 'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription>
              <img src="logo.svg" className='w-32' />
              Sign in with your Google account to access the app securely.
              <Button
                onClick={login}
                className="mt-6 flex gap-4 items-center w-full">
                <FcGoogle className='!h-8 !w-8' />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip