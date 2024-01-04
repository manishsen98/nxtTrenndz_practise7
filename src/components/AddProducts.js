import '../Assets/css/AddProduct.css'
import { useState } from 'react'
import axios from "axios"


const AddProducts = () => {

   const [values, setValues] = useState({
    title: "",
     brand: "",
     price: "",
     image: "",
     rating: ""
   })   
 
  const onChangeName  = (e) => {
    setValues({...values, title: e.target.value })
  }

  const onChangeBrand = (e) => {
    setValues({...values, brand: e.target.value })
  }

  const onChangePrice  = (e) => {
    setValues({...values, price: e.target.value })
  }

  const onChangeImg = (img) => {
    setValues({...values, image: img })
  }

  const onChangerating = (e) => {
    setValues({...values, rating: e.target.value })
  }                  
  const onSubmit = async (e) => {
    e.preventDefault();

    const { title, brand, price, image, rating } = values;

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('rating', rating);
    formData.append('image', image); // Assuming `image` is a file input

    try {
        // Make a POST request using axios
        const response = await axios.post("http://localhost:5000/image", formData);

        // Handle the response
        console.log("Response:", response.data);
    } catch (error) {
        // Handle errors
        console.error("Error:", error);
    }
};


    return(
        <div className="input-container">
            <form className='form-container' onSubmit={onSubmit} encType="multipart/form-data" >
            <label>title</label>
            <input  type="text" placeholder="title" onChange={onChangeName} value={values.title}  />
            <label>brand</label>
            <input  type="text" placeholder="brand" onChange={onChangeBrand}  value={values.brand} />
            <label>price</label>
            <input  type="text" placeholder="price"  onChange={onChangePrice}  value={values.price} />
            <label>rating</label>
            <input  type="text" placeholder="rating"  onChange={onChangerating}  value={values.rating}  />

            <label>ImageUrl</label>
            <input type="file" name="image" onChange={(e) => onChangeImg(e.target.files[0])} />

            {/* <input  type="file" placeholder="ImgUrl" name='image' onChange={onChangeImg}  value={values.image} /> */}
            <button className='button' type='submit'> submit  </button>
            </form>
        </div>
    )
}

export default AddProducts