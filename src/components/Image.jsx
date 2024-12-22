
import { IKImage } from "imagekitio-react";

const Image = ({src, className,w, h, alt}) => {
  return (
    <div>
      <IKImage
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        src={src}
        alt={alt}
        loading="lazy"
        lqip={{active:true, quality:20}}
        className={className}
        width={w}
        height={h}
      />
    </div>
  );
};

export default Image;
