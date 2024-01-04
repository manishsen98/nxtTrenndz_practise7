import Product from "../models/product.mjs";



const CreateProduct = async(req, res) => {
    try{
    const {title, brand, price, rating }  = req.body
  
    //  if(!title || !brand || !price || pagePhoto  || !rating  ) {
    //    return res.status(400).json({error:"all values are required" })
    //  } 
    res.status(200).json(req.body)
     const newProduct =  await Product.create({title, brand, price, pagePhoto, rating})
      res.status(200).json({ProductId: newProduct._id})
     
     
  } catch (error) {
    console.error('Error during registration:', error);
  }
}

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
   

export {CreateProduct, getProduct}