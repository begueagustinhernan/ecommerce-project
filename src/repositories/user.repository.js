import { UserModel } from "../models/user.model.js";

export class UserRepository {

    async getAll() {
        return await UserModel.find().lean();
    }

    async getById(id) {
        return await UserModel.findById(id).lean();
    }

    async getBy(filter = {}) {
        return await UserModel.findOne(filter).lean();
    }

    async create(user = {}) {
        let newUser = await UserModel.create(user);
        return newUser.toJSON();
    }

    async update(id, data = {}) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id).lean();
    }
}

export const userRepository = new UserRepository();