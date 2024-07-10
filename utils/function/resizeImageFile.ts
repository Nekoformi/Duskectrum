import { decode, Image } from 'ImageScript';

export default async function resizeImageFile(file: File, width: number, height: number): Promise<File | null> {
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    return await new Promise((resolve, reject) => {
        fileReader.onload = async () => {
            try {
                if (!fileReader.result) {
                    reject(null);

                    return;
                }

                const image = await decode(new Uint8Array(fileReader.result as ArrayBuffer));

                if (image.width <= width && image.height <= height) {
                    resolve(file);

                    return;
                }

                const currentImageAspectRatio = image.width / image.height;
                const newImageAspectRatio = width / height;

                let resizedImage: Image | null;

                if (currentImageAspectRatio >= newImageAspectRatio) {
                    resizedImage = image.resize(width, Image.RESIZE_AUTO) || null;
                } else {
                    resizedImage = image.resize(Image.RESIZE_AUTO, height) || null;
                }

                if (!resizedImage) {
                    reject(null);

                    return;
                }

                let resizedImageData: Uint8Array;

                switch (file.type) {
                    case 'image/png':
                        resizedImageData = await resizedImage.encode(3);
                        break;
                    case 'image/jpeg':
                        resizedImageData = await resizedImage.encodeJPEG(85);
                        break;
                    default:
                        reject(null);
                        return;
                }

                const newBlob = new Blob([resizedImageData], { type: file.type });
                const newFile = new File([newBlob], file.name, { type: newBlob.type });

                resolve(newFile);
            } catch (e) {
                console.error(e);

                reject(null);
            }
        };

        fileReader.onerror = () => reject(null);
    });
}
