// deno-lint-ignore-file no-explicit-any

type getFormDataFromFormElementTarget = {
    name: string;
    type: 'value' | 'file' | 'valueArray' | 'fileArray';
}[];

type getFormDataFromFormElementResult = (string | File | undefined | (string | undefined)[] | (File | undefined)[])[];

export function extractFormDataFromFormElement(form: HTMLElement, target: getFormDataFromFormElementTarget): getFormDataFromFormElementResult {
    const inputElements = [...form.getElementsByTagName('input')] as HTMLElement[];
    const textareaElements = [...form.getElementsByTagName('textarea')] as HTMLElement[];

    const elements: HTMLElement[] = ([] as HTMLElement[]).concat(inputElements, textareaElements);

    return target.map((item) => {
        const itemRegExp = new RegExp(`${item.name}(\\[[0-9]+\\])?`);

        const rec = elements.filter((element) => (element as any).name.match(itemRegExp));

        if (!rec || !rec[0]) return undefined;

        let buf;

        switch (item.type) {
            case 'value':
                buf = (rec[0] as any).value;

                return buf !== undefined ? (buf as string) : undefined;
            case 'file':
                buf = (rec[0] as any).files[0];

                return buf !== undefined ? (buf as File) : undefined;
            case 'valueArray':
                return rec.map((element) => {
                    buf = (element as any).value;

                    return buf !== undefined ? (buf as string) : undefined;
                });
            case 'fileArray':
                return rec.map((element) => {
                    buf = (element as any).files[0];

                    return buf !== undefined ? (buf as File) : undefined;
                });
        }
    });
}

export function createFormDataFromFormElement(form: HTMLElement, target: getFormDataFromFormElementTarget): FormData {
    const formData = new FormData();

    const res = extractFormDataFromFormElement(form, target);

    res.forEach((item, itemIndex) => {
        if (Array.isArray(item)) {
            item.forEach((itemArray, itemArrayIndex) => {
                if (itemArray) formData.set(`${target[itemIndex].name}[${itemArrayIndex}]`, itemArray);
            });
        } else {
            if (item) formData.set(target[itemIndex].name, item);
        }
    });

    return formData;
}
