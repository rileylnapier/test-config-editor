import { NextApiRequest, NextApiResponse } from 'next';

type LLMConfig = {
  id: string;
  name: string;
  parameters: Record<string, any>;
};

let configs: LLMConfig[] = [];

// Get all configs
export async function GET(
  request: Request,
  { params }: { params: Promise<{ workspaceId: string, id: string }> }
) {
  return Response.json(configs);
}

// Create a new config
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const newConfig: LLMConfig = req.body;

  if (!newConfig.id || !newConfig.name || !newConfig.parameters) {
    return res.status(400).json({ error: 'Invalid config data' });
  }

  configs.push(newConfig);
  res.status(201).json(newConfig);
}

// Update an existing config
export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const updatedConfig: LLMConfig = req.body;

  const index = configs.findIndex((config) => config.id === updatedConfig.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Config not found' });
  }

  configs[index] = updatedConfig;
  res.status(200).json(updatedConfig);
}

// Delete a config
export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const index = configs.findIndex((config) => config.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Config not found' });
  }

  const deletedConfig = configs.splice(index, 1);
  res.status(200).json(deletedConfig);
}