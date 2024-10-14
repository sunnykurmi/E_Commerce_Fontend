'use client'
import React, { useState ,useEffect} from 'react'
import { uploadImageToFirebase } from '../../../utils/handleUploadImgs'
import Button from '../../partials/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { uploadNewProd } from '../../../store/actions/SellerProdAction'
import { getuser } from '../../../store/actions/userAction'

const Create = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    images: []
  })
  const [imagePreview, setImagePreview] = useState([])
  const [imageError, setImageError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length < 2) {
      setImageError("Please upload at least 2 images.");
      return;
    }
    
    setImageError('');
  
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadImageToFirebase(file))
      );
      
      setProductData(prevData => ({
        ...prevData,
        images: [...prevData.images, ...uploadedUrls]
      }));
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(prevPreviews => [...prevPreviews, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      setImageError("Error uploading images. Please try again.");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (productData.images.length < 2) {
      setImageError('Please upload at least 2 images')
      return
    }
    dispatch(uploadNewProd(productData,navigate))
    // console.log('Product data submitted:', productData)
  }

  return (
    <div className='w-full md:px-20 flex items-end pb-16 justify-center bg-gradient-to-br from-[#f1f8ee] to-[#fff] h-screen'>
  
    <div className="lg:w-1/2 w-full  flex justify-center items-center">
        <div className="max-w-2xl border border-[#344e41] shadow-md w-[90%] mx-auto px-6 py-4 h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            minLength={2}
            maxLength={20}
            value={productData.title}
            onChange={handleInputChange}
            className="w-full border-b border-[#344e41] bg-transparent px-2 py-1"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="w-full border-b border-[#344e41] bg-transparent px-2 py-1"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="flex gap-4">
        <div>
          <label htmlFor="price" className="block mb-1">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="w-full border-b border-[#344e41] bg-transparent px-2 py-1"
            step="0.01"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="w-full border-b border-[#344e41] bg-transparent px-2 py-1"
            required
          >
            <option disabled value="">Select category</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="others">Others</option>
          </select>
        </div>
        </div>
        
        {imagePreview.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {imagePreview.map((preview, index) => (
              <img draggable="false" key={index} src={preview} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover" />
            ))}
          </div>
        )}
        <div className=''>
          <label htmlFor="image" className="block mb-1">Product Images (Minimum 2)</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
            multiple
          />
          <button
            type="button"
            onClick={() => document.getElementById('image').click()}
            className="border-b border-sky-500 mb-2 text-sky-500 w-max text-sm py-.5"
          >
            Select Files
          </button>
          {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
        </div>
        <Button onClick={handleSubmit} text='Add Product' type='fill' />
      </form>
    </div>
    </div>
    </div>
  )
}

export default Create