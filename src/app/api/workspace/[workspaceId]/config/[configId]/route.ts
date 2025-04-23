import { NextRequest, NextResponse } from 'next/server';
import { updateConfig, deleteConfig } from '@/services/config';

export async function PUT(
  req: NextRequest,
  { params }: { params: { workspaceId: string; configId: string } }
) {
  const { workspaceId, configId } = params;

  if (!workspaceId || !configId) {
    return NextResponse.json({ error: 'Invalid workspaceId or configId' }, { status: 400 });
  }

  try {
    const data = await req.json();
    const updated = await updateConfig(workspaceId, configId, data);

    if (!updated) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { workspaceId: string; configId: string } }
) {
  const { workspaceId, configId } = params;

  if (!workspaceId || !configId) {
    return NextResponse.json({ error: 'Invalid workspaceId or configId' }, { status: 400 });
  }

  try {
    const deleted = await deleteConfig(workspaceId, configId);

    if (!deleted) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete config' }, { status: 500 });
  }
}