const isValidImage = (url) => {
  if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)){
    return url
  };
  return `${process.env.PUBLIC_URL}/my_public/images/404.jpg`;
};

export default isValidImage;