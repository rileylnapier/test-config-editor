

import { Dynamo } from "./dynamo";

class DynamoGetItemError extends Error {}
class DynamoSetItemError extends Error {}
class  DynamoDeleteItemError extends Error {}

// to do cache options
interface CacheOptions {
    ttl: number;
}

interface CacheItem {
    data: unknown;
    options?: CacheOptions;
}

export interface CacheProvider {
        set: (key: string, data: unknown, options?: CacheOptions) => Promise<void>;
        get: (key: string) => Promise<unknown>;
        delete: (key: string) => Promise<void>;
}

export const dynamoToCacheProvider = (ddb: Dynamo): CacheProvider => {
    return {
        set: async (key, data, options) => {
            const response = await ddb.putItem({
                pk: key,
            }, {
                data,
                options
            });

            if (response.status !== 200) {
                throw new DynamoSetItemError("")
            }
        },
        get: async (key) => {
            const response = await ddb.getItem({
                pk: key,
            });

            if (response.status !== 200) {
                throw new DynamoGetItemError("")
            }

            const item = response.item as CacheItem;

            // if we're expired then return undefined
            if (item?.options?.ttl && item?.options?.ttl > new Date().getTime()) {
                return;
            }
            
            return item.data;
        },
        delete: async (key) => {
            const response = await ddb.deleteItem({
                pk: key,
            });

            if (response.status !== 200) {
                throw new DynamoDeleteItemError("")
            }
        }
    }
}