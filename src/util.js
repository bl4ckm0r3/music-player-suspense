export const getHighResImage = (uri, size=600) => uri.replace("100x100", `${size}x${size}`);
