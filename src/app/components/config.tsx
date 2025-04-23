'use client'
import { useState } from "react";
import { configApi } from "@/lib/api/config";

interface ConfigData {
    id: string;
    name: string;
    parameters: Record<string, any>;
}

export default function Config() {
    const [inputWorkspaceId, setInputWorkspaceId] = useState(""); // Temporary state for input
    const [workspaceId, setWorkspaceId] = useState("");
    const [configs, setConfigs] = useState([]);
    const [showJsonInput, setShowJsonInput] = useState(false);
    const [jsonData, setJsonData] = useState("{}");
    const [configName, setConfigName] = useState(""); // State for config name
    const [editingConfig, setEditingConfig] = useState<ConfigData>();

    const listConfigs = async () => {
        if (!inputWorkspaceId) return;
        setWorkspaceId(inputWorkspaceId); // Set workspaceId only when fetching configs
        const data = await configApi.getConfig(inputWorkspaceId);
        setConfigs(data);
    };

    const addConfig = async () => {
        if (!workspaceId || !configName) {
            alert("Please provide a name for the config.");
            return;
        }
        try {
            const parsedData = JSON.parse(jsonData);
            const newConfig = { name: configName, parameters: parsedData }; // Include name in the config
            await configApi.createConfig(workspaceId, newConfig);
            listConfigs(); // Refresh the config after adding
            setShowJsonInput(false); // Hide the JSON input after submission
            setConfigName(""); // Reset the name input
        } catch (error) {
            console.log("Error parsing JSON data:", error);
            alert("Invalid JSON data");
        }
    };

    const updateConfig = async () => {
        if (!workspaceId || !editingConfig) return;
        try {
            const updatedConfig = {
                name: editingConfig.name,
                parameters: editingConfig.parameters,
            };
            await configApi.updateConfig(workspaceId, editingConfig.id, updatedConfig);
            listConfigs(); // Refresh the config list after updating
            setEditingConfig(undefined); // Exit editing mode
        } catch (error) {
            console.log("Error updating config:", error);
            alert("Failed to update config");
        }
    };

    const deleteConfig = async (configId: string) => {
        if (!workspaceId) return;
        try {
            await configApi.deleteConfig(workspaceId, configId);
            listConfigs(); // Refresh the config list after deletion
        } catch (error) {
            console.log("Error deleting config:", error);
            alert("Failed to delete config");
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter Workspace ID"
                        value={inputWorkspaceId}
                        onChange={(e) => setInputWorkspaceId(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={listConfigs}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Fetch Config
                    </button>
                    {workspaceId && (
                        <button
                            onClick={() => setShowJsonInput(!showJsonInput)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            {showJsonInput ? "Cancel" : "Add Config"}
                        </button>
                    )}
                </div>
                {showJsonInput && (
                    <div className="flex flex-col gap-4 mt-4">
                        <input
                            type="text"
                            placeholder="Enter Config Name"
                            value={configName}
                            onChange={(e) => setConfigName(e.target.value)}
                            className="border p-2 rounded"
                        />
                        <textarea
                            placeholder="Enter JSON data"
                            value={jsonData}
                            onChange={(e) => setJsonData(e.target.value)}
                            className="border p-2 rounded w-full h-40"
                        />
                        <button
                            onClick={addConfig}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Submit Config
                        </button>
                    </div>
                )}
                {configs?.length > 0 && (
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">Config:</h2>
                        <ul className="bg-gray-100 p-4 rounded">
                            {configs?.map((config: ConfigData) => (
                                <li key={config.id} className="flex flex-col gap-2 mb-4">
                                    {editingConfig?.id === config.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editingConfig?.name ?? ""}
                                                onChange={(e) =>
                                                    setEditingConfig({ ...editingConfig, name: e.target.value })
                                                }
                                                className="border p-2 rounded"
                                            />
                                            <textarea
                                                value={JSON.stringify(editingConfig.parameters, null, 2)}
                                                onChange={(e) =>
                                                    setEditingConfig({
                                                        ...editingConfig,
                                                        parameters: JSON.parse(e.target.value),
                                                    })
                                                }
                                                className="border p-2 rounded w-full h-40"
                                            />
                                            <button
                                                onClick={updateConfig}
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingConfig(undefined)}
                                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div>{config.name}</div>
                                                <code>{JSON.stringify(config.parameters)}</code>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            setEditingConfig({
                                                                id: config.id,
                                                                name: config.name,
                                                                parameters: config.parameters,
                                                            })
                                                        }
                                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => deleteConfig(config.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                Footer
            </footer>
        </div>
    );
}
