import Frame from '@myFrame';
import { JSX } from 'preact/jsx-runtime';

type pageProps = {
    current: number;
    first: number;
    last: number;
};

type postListControllerProps = {
    page: pageProps;
};

export default function PostListController({ page }: postListControllerProps) {
    const isFirstPage = page.current <= page.first;
    const isLastPage = page.current >= page.last;

    type buttonProps = {
        name: string;
        page: number;
        isDisabled: boolean;
    };

    const Button = ({ name, page, isDisabled }: buttonProps): JSX.Element => {
        return !isDisabled
            ? (
                <a class='button' href={`/system/joke?p=${page}`}>
                    {name}
                </a>
            )
            : <a class='button disabled'>{name}</a>;
    };

    return (
        <Frame title='Controller' height='auto' frameStyle='box' frameType={['setHide']} className='document'>
            <fieldset class='line grow'>
                <Button name='<<' page={page.first} isDisabled={isFirstPage} />
                <Button name='<' page={page.current - 1} isDisabled={isFirstPage} />
                <div class='label center'>
                    {page.current} / {page.last}
                </div>
                <Button name='>' page={page.current + 1} isDisabled={isLastPage} />
                <Button name='>>' page={page.last} isDisabled={isLastPage} />
            </fieldset>
        </Frame>
    );
}
