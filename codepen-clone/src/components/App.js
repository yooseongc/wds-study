import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Editor from "./Editor";

function App() {

    const [html, setHtml] = useLocalStorage('html', '');
    const [css, setCss] = useLocalStorage('css', '');
    const [js, setJs] = useLocalStorage('js', '');
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>${css}</style>
                    </head>
                    <body>${html}</body>
                    <script type="text/javascript">${js}</script>
                </html>
            `);
        }, 250);
        return () => {
            clearTimeout(timeout);
        }
    }, [html, css, js])
    

    return (
        <>
            <div className="pane top-pane">
                <Editor
                    language="xml"
                    displayName="HTML"
                    value={ html }
                    onChange={ setHtml }
                />
                <Editor
                    language="css"
                    displayName="CSS"
                    value={ css }
                    onChange={ setCss }
                />
                <Editor
                    language="javascript"
                    displayName="JS"
                    value={ js }
                    onChange={ setJs }
                />
            </div>
            <div className="pane">
                <iframe
                    title="output"
                    sandbox="allow-scripts"
                    width="100%"
                    height="100%"
                    style={ { borderWidth: '0px' } }
                    srcDoc={srcDoc}
                />
            </div>
        </>
    );
}

export default App;
