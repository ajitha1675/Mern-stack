import mongoose from "mongoose";

const subcategorySchema = new mongoose({
    name: {
        type: String,
        default: ""
    },
    image:{
        type: String,
        default: ""
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        }
    ]
},{
    timestamps: true
})

const subcategoryModel = mongoose.model('subcategory',subcategorySchema)

export default subcategoryModel;