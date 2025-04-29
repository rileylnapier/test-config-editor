import { CacheProvider } from "./cache";

interface UserDependencies {
    cacheProvider: CacheProvider;
    database: Database;
}

export class User {
    private cacheProvider: CacheProvider;
    private database: Database;
    private tableName: string;

    constructor(options: {
        dependencies: UserDependencies
    }) {
        this.cacheProvider = options.dependencies.cacheProvider;
        this.database = options.dependencies.database;
    }

    async save(id: string, user: User) {
        await this.cacheProvider.set(id, user);
        await this.database.users.putItem(user);
    }  
    
    async get(id: string) {
        const cache = await this.cacheProvider.get(id);
        if (cache) {
            return cache;
        }

        return this.database[this.tableName].getItem(id);
    }  

    async delete(id: string) {
        await this.cacheProvider.delete(id);
        await this.database.users.deleteItem(id);
    }  
}