// export function convertUnicode(input: string): string {
//     return input.replace(/\\u[0-9a-fA-F]{4}/g,function(a,b) {
//         return String.fromCharCode(parseInt(b,16));
//     });
// }
//
// export function dieColor(input: string): string {
//     return input.replaceAll('\u0010', `<span class="boost">\u0010</span>` + ' ')
// }

const DIE_TYPES = ['\u0010']

export function BoostDieChanger(text: string): JSX.Element {

    function createSpans(string: string): JSX.Element {
        for (const die in DIE_TYPES) {
            console.log(string)
            const strings = string.split(die);
            console.log(strings)
            for (const string in strings) {

            }
        }
        return(
            <p></p>
        )
    }

    return (
        <div>
            <span className={'boost'} >{createSpans(text)}</span>
        </div>

    )
}