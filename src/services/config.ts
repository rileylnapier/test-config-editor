import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listConfigs(workspaceId: string) {
    return prisma.config.findMany({
        where: { workspaceId },
        orderBy: { createdAt: 'desc' },
    });
}

export async function createConfig(workspaceId: string, data: { name: string; parameters: any }) {
    return prisma.config.create({
        data: {
            workspaceId,
            name: data.name,
            parameters: data.parameters,
        },
    });
}

export async function getConfig(workspaceId: string, id: string) {
    const config = await prisma.config.findUnique({ where: { id } });
    if (!config || config.workspaceId !== workspaceId) return null;
    return config;
}

export async function getConfigById(workspaceId: string, id: string) {
    return prisma.config.findUnique({ where: { workspaceId, id } });
}

export async function updateConfig(workspaceId: string, id: string, data: { name: string; parameters: any }) {
    const config = await getConfig(workspaceId, id);
    if (!config) return null;

    return prisma.config.update({
        where: { id },
        data: {
            name: data.name,
            parameters: data.parameters,
        },
    });
}

export async function updateConfigById(workspaceId: string, id: string, data: { name: string; parameters: any }) {
    return prisma.config.update({
        where: { id },
        data: {
            name: data.name,
            parameters: data.parameters,
        },
    });
}

export async function deleteConfig(workspaceId: string, id: string) {
    const config = await getConfig(workspaceId, id);
    if (!config) return null;

    return prisma.config.delete({ where: { id } });
}