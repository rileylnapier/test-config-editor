export interface DynamoResponse {
    status: 200 | 400;
}

export interface DynamoGetItemResponse {
    status: 200 | 400;
    item: unknown
}

interface DynamoKeys {
    pk: string;
    sk?: string;
}

export interface Dynamo {
    putItem: (keys: DynamoKeys, item: unknown) => Promise<DynamoResponse>;
    getItem: (keys: DynamoKeys) =>  Promise<DynamoGetItemResponse>;
    deleteItem: (keys: DynamoKeys) =>  Promise<DynamoResponse>;
}

export class DynamoService {
    constructor() {

    }

    public putItem: () => {}
    public getItem: () => {}
    public deleteItem: () => {}
}
