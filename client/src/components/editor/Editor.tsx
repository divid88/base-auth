"use client";

import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

const Editor: React.FC = () => {
  const [code, setCode] = useState<string>(
    "# Welcome to the Python Editor\nprint('Hello, World!')"
  );
  const [output, setOutput] = useState<string>("");
  const [pyodide, setPyodide] = useState<any | null>(null); // Use 'any' temporarily for simplicity
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function initializePyodide() {
      try {
        // Dynamically import Pyodide only in the browser
        const { loadPyodide } = await import("pyodide");
        const pyodideInstance = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        });
        if (mounted) {
          setPyodide(pyodideInstance);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load Pyodide:", error);
        if (mounted) {
          setOutput("Error loading Pyodide. Check the console.");
          setLoading(false);
        }
      }
    }

    initializePyodide();

    return () => {
      mounted = false; // Cleanup to avoid setting state after unmount
    };
  }, []);

  const handleChange = (newCode: string) => {
    setCode(newCode);
  };

  const runCode = async () => {
    if (!pyodide) {
      setOutput("Pyodide is still loading or failed to load.");
      return;
    }

    try {
      pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `);
      await pyodide.runPythonAsync(code);
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(stdout || "No output");
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className=" flex md:flex-row flex-col justify-center p-4
                    items-center md:items-start gap-5 bg-background ">
    <div className="w-[400px] md:w-full h-full">
      <AceEditor
          mode="python"
          theme="monokai"
          value={code}
          onChange={handleChange}
          name="python-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: 16,
            showPrintMargin: false,
          }}
          width="100%"
          height="400px"
        />
    </div>
    <div className="w-[400px] mx-auto md:w-full h-full">
        <button
        onClick={runCode}
        disabled={loading}
        className={`mt-4 bg-primary text-white font-semibold py-2 px-4 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? " ...در حال اجرای کد " : " اجرای کد "}
        </button>

        <div className="mt-4 p-4 bg-gray-800 rounded text-gray-200">
        <h2 className="text-lg font-semibold">Output:</h2>
        <pre>{output || "Run the code to see the output here."}</pre>
        </div>
    </div>
    </div>
  );
};

export default Editor;