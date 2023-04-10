const truncateText = (source: string | undefined, length: number) => {
  if (!source) return null;

  if (source.length <= length + 3) {
    return source
  } else {
    return source.substring(0, Math.max(length)) + '...'
  }
}

export default truncateText
