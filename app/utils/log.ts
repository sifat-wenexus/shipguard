import fs from 'fs';
import path from 'path';

const file = (name: string, message: string) => {
  const logDirectory = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDirectory, `${name}.json`);

  // Create the log directory if it doesn't exist
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // Append the message to the log file
  fs.appendFileSync(logFile, `${new Date().toISOString()} - ${message}\n`);
};

export const Console = { file };
