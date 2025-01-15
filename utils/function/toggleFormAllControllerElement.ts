// deno-lint-ignore-file no-explicit-any

export default function toggleFormAllControllerElement(form: HTMLElement, disabled: boolean) {
    const buttonElements = [...form.getElementsByTagName('button')] as HTMLElement[];
    const inputElements = [...form.getElementsByTagName('input')] as HTMLElement[];
    const textareaElements = [...form.getElementsByTagName('textarea')] as HTMLElement[];
    const labelElements = [...form.getElementsByTagName('label')] as HTMLElement[];

    const elementsA: HTMLElement[] = ([] as HTMLElement[]).concat(buttonElements, inputElements, textareaElements);
    const elementsB: HTMLElement[] = ([] as HTMLElement[]).concat(labelElements);

    elementsA.forEach((element) => ((element as any).disabled = disabled));

    elementsB.forEach((element) => {
        const classList = element.classList;

        if (classList.contains('button')) {
            if (disabled) {
                classList.add('disabled');
            } else {
                classList.remove('disabled');
            }
        }
    });
}
