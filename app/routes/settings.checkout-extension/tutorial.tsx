import React, { useState } from 'react';
import { Icon, Link, Modal } from '@shopify/polaris';
import { InfoIcon } from '@shopify/polaris-icons';

const Tutorial = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  return (
    <Modal
      title="Watch the Tutorial"
      onClose={() => setHelpModalOpen(false)}
      open={helpModalOpen}
      size="large"
      activator={
        <Link onClick={() => setHelpModalOpen((p) => !p)}>
          {' '}
          <span className="flex gap-1">
            <Icon source={InfoIcon} /> Watch Tutorial
          </span>
        </Link>
      }
    >
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full h-full min-h-[500px]"
        title="YouTube video player"
        allowFullScreen
        frameBorder="0"
        src={'https://www.youtube.com/embed/hMx9vvqnR6Q?si=ZkL-HdLeJUqazpmD'}
      />
    </Modal>
  );
};

export default Tutorial;
