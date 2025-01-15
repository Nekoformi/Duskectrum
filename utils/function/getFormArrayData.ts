// deno-lint-ignore no-explicit-any
export default function getFormArrayData(formData: FormData, name: string): any[] {
    const res = [];

    const partName = (index: number) => `${name}[${index}]`;

    for (let i = 0; formData.has(partName(i)); i++) res.push(formData.get(partName(i)));

    return res;
}
