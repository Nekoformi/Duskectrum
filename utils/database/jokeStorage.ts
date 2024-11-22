import getClient from '@database/client.ts';
import { jokeData } from '@database/joke.ts';
import getSupabaseClient from '@database/supabaseClient.ts';
import { getUserDataByPass } from '@database/user.ts';
import resizeImageFile from '@function/resizeImageFile.ts';
import { createFileRecipe, isRegisteredFileArrayType, registeredFile } from '@islands/Original/Miscellaneous/FileUploader.tsx';

const JOKE_IMAGE_RESIZE_RESOLUTION = 640;

export const getJokeImageLink = (rec: jokeData): registeredFile[] | null => {
    try {
        if (!rec.image) return [];

        if (isRegisteredFileArrayType(rec.image)) return rec.image;

        const supabaseClient = getSupabaseClient();

        const res: registeredFile[] = [];

        rec.image.split(',').forEach((item) => {
            const filePath = `${rec.userId}/${rec.jokeId}/${item}`;

            const { data } = supabaseClient.storage.from('Joke').getPublicUrl(filePath);

            res.push({
                id: item,
                url: data.publicUrl || '',
            }); // Insert image for error?
        });

        return res;
    } catch (e) {
        console.error(e);

        return null;
    }
};

export const convertJokeImageLink = (rec: jokeData | jokeData[]): jokeData | jokeData[] => {
    if (Array.isArray(rec)) {
        rec.map((joke) => (joke.image = getJokeImageLink(joke)));
    } else {
        rec.image = getJokeImageLink(rec);
    }

    return rec;
};

export const updateJokeImage = async (rec: Pick<jokeData, 'jokeId' | 'userId'>, pass: string, fileList: File[], fileMemo: string) => {
    const userData = await getUserDataByPass(pass, { id: rec.userId });

    if (!userData || userData.id !== rec.userId) return 2;

    const fileRecipe = createFileRecipe(fileList, fileMemo).filter((item) => item.status !== -1);

    if (!fileRecipe) return 1;

    const res: string[] = [];

    let errorFlag = false;

    for (const item of fileRecipe) {
        switch (item.status) {
            case 0:
                if (item.content) {
                    res.push(item.content);
                } else {
                    errorFlag = true;
                }
                break;
            case 1:
                if (item.file) {
                    const buf = await uploadJokeImageFile(rec, item.file);

                    if (buf !== 1) {
                        res.push(buf);
                    } else {
                        errorFlag = true;
                    }
                } else {
                    errorFlag = true;
                }
                break;
            case 2:
                if (item.content) {
                    const buf = await removeJokeImageFile(rec, item.content);

                    if (buf !== 0) {
                        res.push(item.content);

                        errorFlag = true;
                    }
                } else {
                    errorFlag = true;
                }
                break;
        }
    }

    const rem = await setJokeImage(rec, res ? res.join(',') : '');

    return errorFlag ? 1 : rem;
};

export const deleteJokeImage = async (rec: Pick<jokeData, 'jokeId' | 'userId'>, pass: string) => {
    const userData = await getUserDataByPass(pass, { id: rec.userId });

    if (!userData || userData.id !== rec.userId) return 2;

    return await removeJokeImageFolder(rec);
};

const setJokeImage = async (rec: Pick<jokeData, 'jokeId'>, image: string) => {
    try {
        const client = await getClient();

        const res = await client.queryObject<jokeData>('update joke set image = $1 where joke_id = $2 returning *', [image, rec.jokeId]);

        if (res.rowCount !== 1) return 1;

        return 0;
    } catch (e) {
        console.error(e);

        return 1;
    }
};

const uploadJokeImageFile = async (rec: Pick<jokeData, 'jokeId' | 'userId'>, file: File) => {
    try {
        const supabaseClient = getSupabaseClient();

        const fileExtension = file.name.split('.').pop();
        const fileId = crypto.randomUUID() + '.' + fileExtension;
        const filePath = `${rec.userId}/${rec.jokeId}/${fileId}`;

        const resizedImage = await resizeImageFile(file, JOKE_IMAGE_RESIZE_RESOLUTION, JOKE_IMAGE_RESIZE_RESOLUTION);

        if (!resizedImage) return 1;

        const { error } = await supabaseClient.storage.from('Joke').upload(filePath, resizedImage);

        if (error) return 1;

        return fileId;
    } catch (e) {
        console.error(e);

        return 1;
    }
};

const removeJokeImageFile = async (rec: Pick<jokeData, 'jokeId' | 'userId'>, fileId: string) => {
    try {
        const supabaseClient = getSupabaseClient();

        const filePath = `${rec.userId}/${rec.jokeId}/${fileId}`;

        const { error } = await supabaseClient.storage.from('Joke').remove([filePath]);

        if (error) return 1;

        return 0;
    } catch (e) {
        console.error(e);

        return 1;
    }
};

const removeJokeImageFolder = async (rec: Pick<jokeData, 'jokeId' | 'userId'>) => {
    try {
        const supabaseClient = getSupabaseClient();

        const folderPath = `${rec.userId}/${rec.jokeId}`;

        const { data: list, error: errorList } = await supabaseClient.storage.from('Joke').list(folderPath);

        if (errorList) return 1;

        const { error: errorRemove } = await supabaseClient.storage.from('Joke').remove(list.map((file) => folderPath + '/' + file.name));

        if (errorRemove) return 1;

        return 0;
    } catch (e) {
        console.error(e);

        return 1;
    }
};
