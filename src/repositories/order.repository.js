import { OrderModel } from "../models/order.model.js";

export class OrderRepository {

    async getAll() {
        return await OrderModel.find().populate("user").populate("products.product").lean();
    }

    async getById(id) {
        return await OrderModel.findById(id).populate("user").populate("products.product").lean();
    }

    async getBy(filter = {}) {
        return await OrderModel.findOne(filter).populate("user").populate("products.product").lean();
    }

    async create(data) {
        const newOrder = await OrderModel.create(data);
        return newOrder.toJSON();
    }

    //flujo estados: pending -> cancelled // pending -> confirmed -> delivered

    async updateStatus(id, status) {
        return await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).lean();
    }
}

export const orderRepository = new OrderRepository();