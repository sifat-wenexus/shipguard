export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight?: number, // maxHeight can now be optional
  quality: number = 1
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img: HTMLImageElement = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const originalWidth = img.width;
        const originalHeight = img.height;
        const originalAspectRatio = originalWidth / originalHeight;

        // Calculate height if maxHeight is not provided, maintaining the aspect ratio
        if (!maxHeight) {
          maxHeight = Math.round(maxWidth / originalAspectRatio);
        }

        const targetAspectRatio = maxWidth / maxHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (originalAspectRatio > targetAspectRatio) {
          drawWidth = originalHeight * targetAspectRatio;
          drawHeight = originalHeight;
          offsetX = (originalWidth - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = originalWidth;
          drawHeight = originalWidth / targetAspectRatio;
          offsetX = 0;
          offsetY = (originalHeight - drawHeight) / 2;
        }

        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = maxHeight;

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d', {
          alpha: false,
        });

        if (!ctx) {
          reject(new Error('Failed to get 2D context'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          drawWidth,
          drawHeight,
          0,
          0,
          maxWidth,
          maxHeight
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(
                new File(
                  [blob],
                  `${file.name.split('.')[0]}_${maxWidth}x${maxHeight}.webp`,
                  {
                    type: file.type,
                  }
                )
              );
            } else {
              reject(new Error('Canvas toBlob error'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = (error) => {
        reject(new Error('Image load error: ' + error));
      };
    };

    reader.onerror = (error) => {
      reject(new Error('FileReader error: ' + error));
    };
  });
};
