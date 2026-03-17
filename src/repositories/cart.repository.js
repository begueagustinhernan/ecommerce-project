import { CartModel } from "../models/cart.model.js";

export class CartRepository {

    async getAll() {
        return await CartModel.find().lean()
    }

    async getById(id) {
        return await CartModel.findById(id).populate("products.product").lean();
    }

    async getBy(filter = {}) {
        return await CartModel.findOne(filter).populate("products.product").lean();
    }

    async create(cart = {}) {
        let newCart = await CartModel.create(cart);
        return newCart.toJSON();
    }

    async update(id, data = {}) {
        return await CartModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id) {
        return await CartModel.findByIdAndDelete(id).lean();
    }
}

export const cartRepository = new CartRepository();