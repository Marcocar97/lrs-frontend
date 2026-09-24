export const optimizeImageForPdf = (
    file,
    {
      maxWidth = 1600,
      maxHeight = 1600,
      quality = 0.82,
    } = {},
  ) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.type?.startsWith("image/")) {
        reject(new Error("Invalid image file"));
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = new Image();
  
        img.onload = () => {
          let width = img.width;
          let height = img.height;
  
          const scale = Math.min(
            1,
            maxWidth / width,
            maxHeight / height,
          );
  
          width = Math.round(width * scale);
          height = Math.round(height * scale);
  
          const canvas = document.createElement("canvas");
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext("2d");
  
          ctx.drawImage(
            img,
            0,
            0,
            width,
            height,
          );
  
          const optimizedImage = canvas.toDataURL(
            "image/jpeg",
            quality,
          );
  
          resolve(optimizedImage);
        };
  
        img.onerror = reject;
        img.src = reader.result;
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };