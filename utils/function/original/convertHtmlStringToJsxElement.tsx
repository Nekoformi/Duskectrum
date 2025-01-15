import { assert } from 'deno-assert';
import { DOMParser, HTMLDocument } from 'deno-dom-wasm';
import { h } from 'preact';
import { JSX } from 'preact/jsx-runtime';

type elementBufferNodeType = {
    node: Node;
    element: Element;
    type: number;
    name: string;
    children: elementBufferNodeType[] | null;
    content: string | null;
};

export type rendererType = {
    tag?: string;
    id?: string;
    className?: string;
    function: ((_node: Node, _element: Element, _content: JSX.Element) => JSX.Element | Promise<JSX.Element>) | null;
};

export type convertHtmlStringToJsxElementProps = {
    renderer: rendererType[] | undefined;
};

const parseElementBufferNode = async (item: elementBufferNodeType, renderer?: rendererType[]): Promise<JSX.Element> => {
    const tag = item.name.toLocaleLowerCase();
    const id = item.element.id;
    const className = item.element.className;

    const content = await (async (): Promise<JSX.Element> => {
        const res = [];

        if (item.children) {
            for (let i = 0; i < item.children.length; i++) res.push(await parseElementBufferNode(item.children[i], renderer));
        } else {
            res.push(item.content);
        }

        return <>{res}</>;
    })();

    if (renderer) {
        const rec = renderer.find(
            (renderer) =>
                (!renderer.tag || renderer.tag === tag) && (!renderer.id || renderer.id === id) && (!renderer.className || renderer.className === className),
        );

        if (rec) return rec.function ? await rec.function(item.node, item.element, content) : <>{content}</>;
    }

    if (item.type === HTMLDocument.ELEMENT_NODE) {
        const attributes = item.element.attributes;

        // deno-lint-ignore no-explicit-any
        const props: any = {};

        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];

            attribute.value && (props[attribute.name] = attribute.value);
        }

        const element = h(tag, props, content);

        return <>{element}</>;
    } else if (item.type === HTMLDocument.TEXT_NODE) {
        return <>{item.content}</>;
    } else {
        return <></>;
    }
};

const getElementBufferNode = (nodeList: NodeList): elementBufferNodeType[] => {
    const res: elementBufferNodeType[] = [];

    nodeList.forEach((node) => {
        res.push({
            node: node,
            element: node as unknown as Element,
            type: node.nodeType,
            name: node.nodeName,
            children: node.hasChildNodes() ? getElementBufferNode(node.childNodes) : null,
            content: node.textContent,
        });
    });

    return res;
};

const setElementBufferNode = async (elementBufferNode: elementBufferNodeType[], renderer?: rendererType[]): Promise<JSX.Element> => {
    return await (async (): Promise<JSX.Element> => {
        const res = [];

        for (let i = 0; i < elementBufferNode.length; i++) res.push(await parseElementBufferNode(elementBufferNode[i], renderer));

        return <>{res}</>;
    })();
};

const debugElementBufferNode = (elementBufferNode: elementBufferNodeType[] | elementBufferNodeType) => {
    return JSON.stringify(elementBufferNode, (key, val) => (key === 'node' ? '[Node]' : key === 'element' ? '[Element]' : val), '    ');
};

export default async function convertHtmlStringToJsxElement(html: string, props?: convertHtmlStringToJsxElementProps): Promise<JSX.Element> {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    assert(doc);

    const buf = getElementBufferNode(doc.childNodes as unknown as NodeList);

    // console.log(debugElementBufferNode(buf));

    const res = await setElementBufferNode(buf, props?.renderer);

    return res;
}
