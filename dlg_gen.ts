import { bgBlue, white, bold } from "https://deno.land/std/fmt/colors.ts";
import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { writeFileStrSync } from "https://deno.land/std/fs/write_file_str.ts";

const name = 'data';
let fStr: string = 
`<div fxFlex fxLayout="column" style="height: 100%; overflow: auto;">\n
\t<form #formNewSzerz="ngForm">\n`;
const jsO: any = await readJsonSync('test.json');

for (const i in jsO) {
    let t = '';
    switch (typeof(jsO[i])) {
        case 'string':
            t = 'text';
            break;
        case 'number':
            t = 'number';
            break;
        case 'boolean':
            t = 'cb';
            break;
        default:
            t = 'text';
            break;}
    
    const il = i.toLowerCase().toString();
    const inp = (t === 'text' || t === 'number') 
    ? `\t\t<mat-form-field class="form-field-dlg">
    \t\t\t<input name="${il}" matInput [(ngModel)]="${name}.${i}" type="${t}">
    \t\t</mat-form-field>`
    : `\t\t\t<mat-checkbox [(ngModel)]="${name}.${i}"></mat-checkbox>`;

    fStr += 
    `\n
    \t<div fxLayout="row" fxLayoutAlign="space-between center" style="height: 50px;">
    \t\t<span class="span-label">${i}</span>
    ${inp}
    \t</div>
    `
}

fStr += `
\t</form>
</div>\n`;


writeFileStrSync(`${name}.html`, fStr);








