import ClothesModel from '../models/Clothes.js'

export const getAll = async (req, res) => {
    try {
        const clothes = await ClothesModel.find();
        res.json(clothes)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить все  статьи'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const clothesId = req.params.id

        ClothesModel.findByIdAndUpdate({
            _id: clothesId,
        },{
            $inc: {viewsCount: 1}
        },{
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return  res.status(500).json({
                    message: 'Не удалось получить статью'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }

            res.json(doc)
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить все  статьи'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const clothesId = req.params.id
        ClothesModel.findByIdAndDelete({
            _id: clothesId
        }, (err, doc) => {
            if (err){
                console.log(err)
                return  res.status(500).json({
                    message: 'Не удалось удалить вещь'
                })
            }

            if (!doc){
                return res.status(404).json({
                    message: 'Вещь не найдена'
                })
            }

            res.json({success: true})
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить'
        })
    }
}

export const create = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        const doc = new ClothesModel({
            title: req.body.title,
            price: req.body.price,
            colors: JSON.parse(req.body.colors),
            sizes: JSON.parse(req.body.sizes),
            category: req.body.category,
            gender: req.body.gender,
            inStock: req.body.inStock,
            images: images,
        });
        const clothes = await doc.save();
        res.json(clothes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось создать товар' });
    }
};


export const update = async (req, res) => {
    try {
        const clothesId = req.params.id;
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

        const updatedData = {
            title: req.body.title,
            price: req.body.price,
            colors: JSON.parse(req.body.colors),
            sizes: JSON.parse(req.body.sizes),
            category: req.body.category,
            gender: req.body.gender,
            inStock: req.body.inStock,
            images: images.length ? images : req.body.images,
        };

        const updatedClothes = await ClothesModel.findByIdAndUpdate(clothesId, updatedData, { new: true });

        if (!updatedClothes) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        res.json(updatedClothes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось обновить товар' });
    }
};

