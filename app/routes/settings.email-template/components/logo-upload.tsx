import { Button, DropZone, Text } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { resizeImage } from '~/modules/utils/image-process';

const LogoUpload = ({ file, setFile }) => {
  const validImageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
  ];
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(null);
  const handleImageChange = (file) => {
    // Get the selected file

    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file

      // When the file is loaded, set the preview URL to the file content
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); // Set the preview URL in state
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      setImagePreviewUrl(null); // Reset if no file is selected
    }
  };

  const fileUpload = !file && (
    <DropZone.FileUpload actionHint="Accepts .jpg, .gif .png and .webp" />
  );

  useEffect(() => {
    handleImageChange(file);
  }, [file]);

  const handleDropZoneDrop = useCallback(
    async (
      _dropFiles: File[],
      acceptedFiles: File[],
      _rejectedFiles: File[]
    ) => {
      const imageFile = await resizeImage(acceptedFiles[0], 220);
      setFile(imageFile);
    },
    []
  );
  const uploadedFiles = file && (
    <div className="p-3 flex justify-center items-center my-3">
      <div className="text-center">
        <div className="w-[220px] m-auto">
          <img width={'100%'} src={imagePreviewUrl} alt="logo image" />
        </div>
        <div className="overflow-hidden overflow-ellipsis my-2">
          {file.name}{' '}
          <Text variant="bodySm" as="p">
            {file.size} bytes
          </Text>
        </div>
        <div className="my-2">
          <Button variant="primary" tone="success" onClick={() => setFile()}>
            Change
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <DropZone onDrop={handleDropZoneDrop} allowMultiple={false} variableHeight>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
};

export default LogoUpload;
