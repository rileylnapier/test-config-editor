import axios from 'axios';

const API_BASE_URL = '/api/workspace';

interface ConfigData {
    name: string;
    parameters: Record<string, any>;
}

export const configApi = {
    async getConfig(workspaceId: string) {
        const response = await axios.get(`${API_BASE_URL}/${workspaceId}/config`);
        return response.data;
    },

    async createConfig(workspaceId: string, configData: ConfigData) {
        const response = await axios.post(`${API_BASE_URL}/${workspaceId}/config`, configData);
        return response.data;
    },

    async updateConfig(workspaceId: string, configId: string, configData: ConfigData) {
        const response = await axios.put(`${API_BASE_URL}/${workspaceId}/config/${configId}`, configData);
        return response.data;
    },

    async deleteConfig(workspaceId: string, configId: string) {
        const response = await axios.delete(`${API_BASE_URL}/${workspaceId}/config/${configId}`);
        return response.data;
    },
};