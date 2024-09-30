import { DropZone, Text, Thumbnail } from '@shopify/polaris';
import { NoteIcon } from '@shopify/polaris-icons';
import React, { useCallback } from 'react';

const LogoUpload = ({ file, setFile }) => {
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !file && <DropZone.FileUpload />;

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) =>
      setFile(acceptedFiles[0]),
    []
  );
  const uploadedFiles = file && (
    <>
      <Thumbnail
        size="small"
        alt={file.name}
        source={
          validImageTypes.includes(file.type)
            ? window.URL.createObjectURL(file)
            : NoteIcon
        }
      />
      <div>
        {file.name}{' '}
        <Text variant="bodySm" as="p">
          {file.size} bytes
        </Text>
      </div>
    </>
  );
  return (
    <DropZone onDrop={handleDropZoneDrop} variableHeight allowMultiple={false}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
};

export default LogoUpload;
