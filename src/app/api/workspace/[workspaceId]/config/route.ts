import { NextRequest, NextResponse } from 'next/server';
import { listConfigs, createConfig, getConfigById, updateConfigById } from '@/services/config';

export async function GET(
    req: NextRequest,
    { params }: { params: { workspaceId: string; configId?: string } }
) {
    const { workspaceId, configId } = params;

    if (configId) {
        const config = await getConfigById(workspaceId, configId);
        if (!config) {
            return NextResponse.json({ error: 'Config not found' }, { status: 404 });
        }
        return NextResponse.json(config);
    }

    const configs = await listConfigs(workspaceId);
    return NextResponse.json(configs);
}

export async function POST(
    req: NextRequest,
    { params }: { params: { workspaceId: string } }
) {
    console.log("params", params);
    const { workspaceId } = params;
    const body = await req.json();

    if (!body.name || !body.parameters) {
        return NextResponse.json({ error: 'Missing name or parameters' }, { status: 400 });
    }

    const config = await createConfig(workspaceId, body);
    return NextResponse.json(config, { status: 201 });
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { workspaceId: string; configId: string } }
) {
    const { workspaceId, configId } = params;
    const body = await req.json();

    if (!body.name || !body.parameters) {
        return NextResponse.json({ error: 'Missing name or parameters' }, { status: 400 });
    }

    const updatedConfig = await updateConfigById(workspaceId, configId, body);
    if (!updatedConfig) {
        return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    return NextResponse.json(updatedConfig);
}