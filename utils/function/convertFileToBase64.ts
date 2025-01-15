export default async function convertFileToBase64(file: File): Promise<string | null> {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    return await new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = () => reject(null);
    });
}
