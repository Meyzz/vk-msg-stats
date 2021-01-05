export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) - hours * 60;
  const sec = seconds - hours * 3600 - minutes * 60;

  return `${hours ? `${hours}ч ` : ''}${minutes ? `${minutes}м ` : ''}${sec}с`;
};
