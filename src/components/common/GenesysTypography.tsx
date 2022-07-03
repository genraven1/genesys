import {Fragment} from "react";
import {Typography} from "@mui/material";

interface Props {
    text: string
}

export default function GenesysTypography(props: Props): JSX.Element {
    const {text} = props;

    const checkText = () => {
        if (text === null || text === undefined) {
            return '';
        }

        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
                case target.includes('[boost]'):
                    return '<i class="symbol d6 symbol-border boost-color"></i>';
                case target.includes('[ability]'):
                    return '<i class="symbol  d8 symbol-border ability-color"></i>';
                case target.includes('[proficiency]'):
                    return '<i class="symbol d12 symbol-border proficiency-color"></i>';
                case target.includes('[setback]'):
                    return '<i class="symbol d6 symbol-border setback-color"></i>';
                case target.includes('[difficulty]'):
                    return '<i class="symbol d8 symbol-border difficulty-color"></i>';
                case target.includes('[challenge]'):
                    return '<i class="symbol d12 symbol-border challenge-color"></i>';
                case target.includes('[advantage]'):
                    return '<i class="symbol ffi-grpg-advantage"></i>';
                case target.includes('[success]'):
                    return '<i class="symbol ffi-grpg-success"></i>';
                case target.includes('[triumph]'):
                    return '<i class="symbol ffi-grpg-triumph"></i>';
                case target.includes('[threat]'):
                    return '<i class="symbol ffi-grpg-threat"></i>';
                case target.includes('[failure]'):
                    return '<i class="symbol ffi-grpg-failure"></i>';
                case target.includes('[despair]'):
                    return '<i class="symbol ffi-grpg-despair"></i>';
                case target === '[removesetbacksetback]':
                    return `<b>(-</b><i class="symbol d6 symbol-border setback-color"></i> <i class="symbol d6 symbol-border setback-color"></i><b>)</b>`;
                case target.includes('[removesetback]'):
                    return `<b>(-</b><i class="symbol d6 symbol-border setback-color"></i><b>)</b>`;
                case target.includes('[combat]'):
                    return '<i class="symbol d6"></i>';
                case target.includes('[social]'):
                    return '<i class="symbol d6"></i>';
                case target.includes('[general]'):
                    return '<i class="symbol d6"></i>';
                // case target.includes('[gm]'):
                //     return `<img src=${images.gm} class="textSymbols" /> `;
                // case target.includes('[pc]'):
                //     return `<img src=${images.pc} class="textSymbols" /> `;
                default:
                    return `${word}`;
            }
        });
        let final = '';
        array.forEach((word, index) => {
            if (
                (word.includes('symbol') &&
                    array[index + 1] &&
                    array[index + 1].includes('symbol')) ||
                array.length === index + 1
            ) {
                final += word;
            } else {
                final += `${word} `;
            }
        });
        return final;
    };

    return (
        <Fragment>
            <Typography style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: checkText()}}/>
        </Fragment>
    )
}