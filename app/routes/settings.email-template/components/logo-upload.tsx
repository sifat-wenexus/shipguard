import { Button, DropZone, Text } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { resizeImage } from '~/modules/utils/image-process';

const LogoUpload = ({ file, setFile, logo, prevFile }) => {
  const validImageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
  ];
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>(null);
  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const fileUpload = !file && !logo && (
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
  const uploadedFiles = file ? (
    <div className="p-3 flex justify-center items-center my-3">
      <div className="text-center">
        <div className="w-[220px] m-auto">
          <img width={'100%'} src={imagePreviewUrl} alt="logo image" />
        </div>
        <div className="overflow-hidden overflow-ellipsis my-2">
          {file?.name}{' '}
          <Text variant="bodySm" as="p">
            {file?.size} bytes
          </Text>
        </div>
        <div className="my-2">
          <Button variant="primary" tone="success" onClick={() => setFile()}>
            Change
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-3 flex justify-center items-center my-3">
      <div className="text-center">
        <div className="w-[220px] m-auto">
          <img width={'100%'} src={logo} alt="logo image" />
        </div>
        <div className="overflow-hidden overflow-ellipsis my-2">
          {prevFile?.name}{' '}
          <Text variant="bodySm" as="p">
            {prevFile?.size} bytes
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
