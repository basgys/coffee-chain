const truncate = (s: string, len: number) => {
  if (s === undefined || s.length <= len) return s;
  const separator = '...';
  const sepLen = separator.length,
        charsToShow = len - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

  return s.substr(0, frontChars) + separator + s.substr(s.length - backChars);
};

export default {
  truncate
}