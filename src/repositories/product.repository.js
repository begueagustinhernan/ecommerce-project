import { ProductModel } from "../models/product.model.js";

export class ProductRepository {

    // get paginados, get categories

    // CRUD

    async getAll() {
        return await ProductModel.find().lean();
    }

    async getById(id) {
        return await ProductModel.findById(id).lean();
    }

    async getBy(filter = {}) {
        return await ProductModel.findOne(filter).lean();
    }

    async create(product = {}) {
        let newProduct = await ProductModel.create(product);
        return newProduct.toJSON();
    }

    async update(id, data = {}) {
        return await ProductModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id).lean();
    }
}

export const productRepository = new ProductRepository();   