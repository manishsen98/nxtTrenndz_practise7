import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import morgan from "morgan"
import multer from 'multer';
import Product from "./models/product.mjs";


dotenv.config()
const app = express()

import cors from "cors"
app.use(cors());
app.use(express.json())


import notFoundMiddleWare from "./middleware/not-found.js"
import authRouter from "./routes/authRoutes.mjs"
import productRouter from "./routes/productRouter.mjs"

app.use(express.urlencoded({extended:true}))

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
       app.use(bodyParser.urlencoded({ extended: true }))   


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body)
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid Image Type');
        if(isValid){
            uploadError = null
        }
        console.log(uploadError)
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        let imgname = 'image';
        const fileName = imgname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload  = multer({ storage: storage })
app.post('/image', upload.single('image'), async (req, res) => {
    const file = req.file;
    console.log(file)
    if (!file){
        return res.status(400).send('No image in the request')
    }
    const fileName = file.filename;
    console.log(fileName)
     let product = new Product({
        name: req.body.name,
        image: fileName,
        brand: req.body.brand,
        price: req.body.price,
        rating: req.body.rating,
    }) 
    product = await product.save();
    if (product)
    return res.status(200).send('Product can be created')
    // res.send(product);
}) 

const port = process.env.PORT || 5000

// db connetion
import connectDB from "./db/connect.js"


 




app.use("/api", authRouter)

 app.use("/api", productRouter)

app.use(notFoundMiddleWare)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
       app.listen(port, () => {
        console.log(`server is listening ${port}...`)
       } )
    } catch (error) {
        console.log(error)
    }
}
start()






