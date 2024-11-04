import { useState } from 'react';
import { Upload } from 'lucide-react';
import { clientService } from '../services/clientService';

interface MessageUploaderProps {
  clientId: string;
  onUploadComplete: () => void;
}

interface MessageUploaderProps {
  clientId: string;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function MessageUploader({ clientId, onUploadComplete }: MessageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const messages = JSON.parse(e.target?.result as string);
          await clientService.uploadMessages(clientId, messages);
          onUploadComplete();
        } catch (err) {
          setError('Invalid JSON format');
        }
      };
      reader.readAsText(file);
    } catch (err: any) {
      setError(err.message || 'Failed to upload messages');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
        id="message-upload"
      />
      <label
        htmlFor="message-upload"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer ${
          isUploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Upload className="h-5 w-5" />
        {isUploading ? 'Uploading...' : 'Upload Messages'}
      </label>
      {error && (
        <div className="absolute top-full mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
