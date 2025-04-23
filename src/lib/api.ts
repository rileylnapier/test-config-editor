import { PrismaClient } from '@prisma/client';

class ApiClient {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async get<T>(model: keyof PrismaClient, params?: Record<string, any>): Promise<T[]> {
        // Example: Fetch all records from a model with optional filters
        return await (this.prisma[model] as any).findMany({ where: params });
    }

    async post<T>(model: keyof PrismaClient, data: any): Promise<T> {
        // Example: Create a new record in a model
        return await (this.prisma[model] as any).create({ data });
    }

    async put<T>(model: keyof PrismaClient, id: number, data: any): Promise<T> {
        // Example: Update a record in a model by ID
        return await (this.prisma[model] as any).update({
            where: { id },
            data,
        });
    }

    async delete<T>(model: keyof PrismaClient, id: number): Promise<T> {
        // Example: Delete a record in a model by ID
        return await (this.prisma[model] as any).delete({
            where: { id },
        });
    }
}

const apiClient = new ApiClient();

export default apiClient;
