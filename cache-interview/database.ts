interface DatabaseResponse {
    status: 200 | 400 | 500;
}

interface DatabaseGetItemResponse extends DatabaseResponse {
    item: unknown
}

interface Database {
    putItem: (item: unknown) => Promise<DatabaseResponse>;
    getItem: (id: string) =>  Promise<DatabaseGetItemResponse>;
    deleteItem: (id) =>  Promise<DatabaseResponse>;
}