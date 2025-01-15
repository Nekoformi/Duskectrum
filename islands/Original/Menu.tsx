import { JSX } from 'preact/jsx-runtime';

import Link from '@components/Common/Link.tsx';
import { IS_PRINT_MODE } from '@data/dev.ts';
import { menuData, menuDataType } from '@data/menu.ts';
import { useSignal } from '@preact/signals';

type menuProps = {
    directory?: string;
};

export default function Menu({ directory }: menuProps): JSX.Element {
    const menuStyle: JSX.CSSProperties = {
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: '4px',
    };

    const contentStyle: JSX.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '4px',
    };

    const currentDirectoryStyle: JSX.CSSProperties = Object.assign({ color: '#888' }, contentStyle);

    const directoryStyle: JSX.CSSProperties = Object.assign({ flexGrow: '2' }, contentStyle);

    const setItemStyle = (nest: number): JSX.CSSProperties => {
        const itemStyle: JSX.CSSProperties = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '4px',
            whiteSpace: 'nowrap',
            textAlign: 'left',
        };

        return Object.assign(itemStyle, {
            marginLeft: `${12 * nest}pt`,
        });
    };

    const isCurrentDirectory = (content: menuDataType[]): boolean => {
        const getContentList = (content: menuDataType[]): string[] => {
            const res: string[] = [];

            content.forEach((item: menuDataType) => {
                if (typeof item.content !== 'object') {
                    res.push(item.content);
                } else {
                    getContentList(item.content).forEach((rec) => {
                        res.push(rec);
                    });
                }
            });

            return res;
        };

        const contentList = getContentList(content);

        return contentList.filter((item) => item === directory).length > 0;
    };

    const setItem = (content: menuDataType[], nest: number, isCurrentDirectoryFlag: boolean): JSX.Element => {
        return (
            <>
                {content.map((item: menuDataType) => {
                    if (typeof item.content !== 'object') {
                        return (
                            <li className='myMenuButton' style={setItemStyle(nest)}>
                                <Link href={item.content}>{`- ${item.name}`}</Link>
                            </li>
                        );
                    } else {
                        const flag = isCurrentDirectoryFlag && isCurrentDirectory(item.content);

                        return setSpreadItem(item.name, item.isOpen, item.content, nest, flag);
                    }
                })}
            </>
        );
    };

    const setSpreadItem = (name: string, isOpen: boolean | undefined, content: menuDataType[], nest: number, isCurrentDirectoryFlag: boolean): JSX.Element => {
        const spread = useSignal(isCurrentDirectoryFlag || isOpen ? true : false);
        const spreadStyle = Object.assign(Object.assign({}, contentStyle), spread.value ? {} : { display: 'none' });

        return (
            <ul style={contentStyle}>
                <li style={{ color: !IS_PRINT_MODE ? '#ccc' : '#888' }}>
                    <button className='myMenuButton' style={setItemStyle(nest)} onClick={() => (spread.value = !spread.value)}>
                        {spread.value ? '|' : '/'} {name} ({content.length})
                    </button>
                </li>
                <ul style={spreadStyle}>{setItem(content, nest + 1, isCurrentDirectoryFlag)}</ul>
            </ul>
        );
    };

    return (
        <div style={menuStyle}>
            {directory && (
                <ul style={currentDirectoryStyle}>
                    <li style={setItemStyle(0)}>@ {directory}</li>
                </ul>
            )}

            <ul style={directoryStyle}>{setItem(menuData, 0, directory ? true : false)}</ul>
        </div>
    );
}
