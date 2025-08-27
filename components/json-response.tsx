'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { toast } from './toast';

interface JSONResponseProps {
  content: string;
  timestamp: Date;
}

export function JSONResponse({ content, timestamp }: JSONResponseProps) {
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);
  const [cleanedContent, setCleanedContent] = useState<string>('');

  // Function to clean up JSON responses by extracting only the JSON part
  const cleanJSONContent = (text: string): string => {
    // Try to find JSON in the text
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      return jsonMatch[0];
    }
    return text;
  };

  useEffect(() => {
    try {
      // Clean the content first to extract only JSON
      const cleaned = cleanJSONContent(content);
      setCleanedContent(cleaned);
      const parsed = JSON.parse(cleaned);
      setParsedJson(parsed);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  }, [content]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanedContent);
      toast({
        type: 'success',
        description: 'JSON copied to clipboard!',
      });
    } catch (error) {
      toast({
        type: 'error',
        description: 'Failed to copy to clipboard',
      });
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([cleanedContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `response-${timestamp.getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isValid) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-red-800">Invalid JSON Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 mb-3">Could not parse JSON from response:</p>
          <details className="mb-3">
            <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
              View Original Response
            </summary>
            <pre className="mt-2 text-sm text-red-500 overflow-x-auto bg-red-100 p-3 rounded">
              {content}
            </pre>
          </details>
          <details>
            <summary className="cursor-pointer text-sm text-red-600 hover:text-red-800">
              View Cleaned Content
            </summary>
            <pre className="mt-2 text-sm text-red-500 overflow-x-auto bg-red-100 p-3 rounded">
              {cleanedContent}
            </pre>
          </details>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800">
            JSON Response
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="text-green-700 border-green-300 hover:bg-green-100"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadJSON}
              className="text-green-700 border-green-300 hover:bg-green-100"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(parsedJson).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="font-semibold text-green-800 min-w-[120px]">
                {key}:
              </span>
              <span className="text-green-700 bg-green-100 px-2 py-1 rounded">
                {String(value)}
              </span>
            </div>
          ))}
        </div>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-green-600 hover:text-green-800">
            View Raw JSON
          </summary>
          <pre className="mt-2 text-xs text-green-700 bg-green-100 p-3 rounded overflow-x-auto">
            {JSON.stringify(parsedJson, null, 2)}
          </pre>
        </details>
        {cleanedContent !== content && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-green-600 hover:text-green-800">
              View Original Response (with reasoning)
            </summary>
            <pre className="mt-2 text-xs text-green-700 bg-green-100 p-3 rounded overflow-x-auto">
              {content}
            </pre>
          </details>
        )}
      </CardContent>
    </Card>
  );
}
