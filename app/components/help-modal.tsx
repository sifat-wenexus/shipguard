import { Modal, VideoThumbnail } from '@shopify/polaris';
import { useState } from 'react';
import type { FC } from 'react';

interface HelpModalProps {
  thumbnail: string;
  video: string;
  duration: number;
}

export const HelpModal: FC<HelpModalProps> = ({
  thumbnail,
  video,
  duration,
}) => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <Modal
      title="Watch the Tutorial"
      onClose={() => setHelpModalOpen(false)}
      open={helpModalOpen}
      size="large"
      activator={
        <VideoThumbnail
          onClick={() => setHelpModalOpen(true)}
          thumbnailUrl={thumbnail}
          videoLength={duration}
        />
      }
    >
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full h-full min-h-[500px]"
        title="YouTube video player"
        allowFullScreen
        frameBorder="0"
        src={video}
      />
    </Modal>
  );
};
