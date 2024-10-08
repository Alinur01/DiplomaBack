import mongoose from 'mongoose';

const ClothesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    colors: { type: [String], required: true },
    sizes: { type: [String], required: true },
    category: { type: String, required: true },
    gender: { type: String, default: 'uni' },
    inStock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    viewsCount: { type: Number, default: 0 },
}, {
    timestamps: true,
});

const ClothesModel = mongoose.model('Clothes', ClothesSchema);
export default ClothesModel;
