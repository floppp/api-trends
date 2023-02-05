type Log = {
  level: 'info' | 'warning' | 'error';
  message: string;
  [key: string]: any;
};

export default Log;
