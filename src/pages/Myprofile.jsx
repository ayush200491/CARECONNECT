import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx'
import { toast } from 'react-toastify'

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => reject(new Error('Unable to read image file'))
    reader.onload = () => {
      const image = new Image()

      image.onerror = () => reject(new Error('Unable to process image file'))
      image.onload = () => {
        const maxDimension = 1024
        let { width, height } = image

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width)
          width = maxDimension
        } else if (height >= width && height > maxDimension) {
          width = Math.round((width * maxDimension) / height)
          height = maxDimension
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        if (!context) {
          reject(new Error('Unable to prepare image for upload'))
          return
        }

        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }

      image.src = reader.result
    }

    reader.readAsDataURL(file)
  })
}

const Myprofile = () => {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    gender: "",
    image: "",
  });

  const [isedit, setisedit] = useState(false);
  const { user, updateUser } = useAuth()

  useEffect(() => {
    if (user) {
      setuserdata((prev) => ({ ...prev, ...user }))
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuserdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const maxFileSizeBytes = 10 * 1024 * 1024
      if (file.size > maxFileSizeBytes) {
        toast.error('Please upload an image smaller than 10MB')
        return
      }

      compressImage(file)
        .then((compressedImage) => {
          setuserdata((prevData) => ({ ...prevData, image: compressedImage }))
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to process the selected image')
        })
    }
  }

  return (
    <div className="max-w-lg h-full">
      <div className="mt-12">
        <label>
          <img className="w-36 rounded-md cursor-pointer" src={userdata.image || 'https://via.placeholder.com/150'} alt="Profile" />
          {isedit && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          )}
        </label>
        
        {isedit ? (
          <input
            type="text"
            name="name"
            value={userdata.name}
            onChange={handleInputChange}
            className="mt-6 text-2xl font-medium mb-2 w-full border p-2 rounded"
          />
        ) : (
          <h1 className="mt-6 text-2xl font-medium mb-2">{userdata.name}</h1>
        )}
        <hr className="h-[1.5px] bg-slate-400" />

        {/* Contact Information */}
        <div className="mt-5">
          <h2 className="underline text-sm text-gray-400 underline-offset-2">CONTACT INFORMATION</h2>
          
          <div className="flex text-sm font-medium mt-3">
            <p className="text-gray-800 w-36">Email id:</p>
            {isedit ? (
              <input
                type="email"
                name="email"
                value={userdata.email}
                onChange={handleInputChange}
                className="text-blue-400 border p-1 rounded w-full"
              />
            ) : (
              <p className="text-blue-400">{userdata.email}</p>
            )}
          </div>

          <div className="flex text-sm font-medium mt-3">
            <p className="text-gray-800 w-36">Phone:</p>
            {isedit ? (
              <input
                type="text"
                name="phone"
                value={userdata.phone}
                onChange={handleInputChange}
                className="text-blue-400 border p-1 rounded w-full"
              />
            ) : (
              <p className="text-blue-400">{userdata.phone}</p>
            )}
          </div>

          <div className="flex text-sm font-medium mt-3">
            <p className="text-gray-800 w-36">Address:</p>
            {isedit ? (
              <input
                type="text"
                name="address"
                value={userdata.address}
                onChange={handleInputChange}
                className="text-gray-500 border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-500">{userdata.address}</p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="mt-5">
          <h2 className="underline text-sm text-gray-400 underline-offset-2">BASIC INFORMATION</h2>
          
          <div className="flex text-sm font-medium mt-3">
            <p className="text-gray-800 w-36">Gender:</p>
            {isedit ? (
              <input
                type="text"
                name="gender"
                value={userdata.gender}
                onChange={handleInputChange}
                className="text-gray-500 border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-500">{userdata.gender}</p>
            )}
          </div>

          <div className="flex text-sm font-medium mt-3">
            <p className="text-gray-800 w-36">Birthday:</p>
            {isedit ? (
              <input
                type="date"
                name="birthday"
                value={userdata.birthday}
                onChange={handleInputChange}
                className="text-gray-500 border p-1 rounded w-full"
              />
            ) : (
              <p className="text-gray-500">{userdata.birthday}</p>
            )}
          </div>
        </div>

        <div className="flex mt-12 gap-5">
          <button
            onClick={() => setisedit(!isedit)}
            className="border  hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full border-blue-500"
          >
            {isedit ? "Cancel" : "Edit"}
          </button>
          {isedit && (
            <button
              onClick={async (e) => {
                e.preventDefault()
                try {
                  const result = await (updateUser ? updateUser(user ? { ...user, ...userdata } : userdata) : null)
                  if (result) {
                    toast.success('Profile updated')
                  } else {
                    toast.error('Failed to update profile')
                  }
                } catch (e) {
                  toast.error(e.message || 'Failed to update profile')
                }
                setisedit(false)
              }}
              className="border hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full border-blue-500"
            >
              Save Information
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
