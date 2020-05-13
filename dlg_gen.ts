import { bgBlue, white } from "https://deno.land/std/fmt/colors.ts";
import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { writeFileStrSync } from "https://deno.land/std/fs/write_file_str.ts";
import {isDate} from 'https://raw.githubusercontent.com/rhideg/deno-scripts/master/str_is_date.ts';

const { args } = Deno;


const name = args[0] ? args[0].toString() : 'data';
const src = args[1] ? args[1].toString() : 'test.json';

async function createHtmlString(name: string, src: string) {

    const fName = name[0].toUpperCase() + name.slice(1);
    let fStr: string = `<div fxFlex fxLayout="column" style="height: 100%; overflow: auto;">\n\t<form #form${fName}="ngForm">\n`;
    const jsO: any = await readJsonSync(src);


    for (const i in jsO) {        
        let t = '';
        switch (typeof (jsO[i])) {
            case 'string':
                if (isDate(jsO[i].toString())) {
                    t = 'date';
                } else {
                    t = 'text';
                }
                break;
            case 'number':
                t = 'number';
                break;
            case 'boolean':
                t = 'cb';
                break;
            default:
                t = 'text';
                break;

        }

        const il: string = i.toLowerCase().toString();
        let inp: string = '';

        switch (t) {
            case 'text':
            case 'number':
                inp = `\t\t<mat-form-field class="form-field-dlg">
                \t\t\t<input name="${il}" matInput [(ngModel)]="${name}.${i}" type="${t}" required>
                \t\t</mat-form-field>`;
                break;
            case 'boolean':
                inp = `\t\t\t<mat-checkbox name="${il}" [(ngModel)]="${name}.${i}"></mat-checkbox>`;
                break;
            case 'date':
                inp = `
                \t\t<mat-form-field class="form-field-dlg">
                \t\t\t<input matInput [matDatepicker]="picker${i}" [(ngModel)]="${name}.${i}" name="${il}" required>
                \t\t\t<mat-datepicker-toggle matSuffix [for]="picker${i}"></mat-datepicker-toggle>
                \t\t\t<mat-datepicker #picker${i}></mat-datepicker>
                \t\t</mat-form-field>`;
                break;
            default:
                inp = `\t\t<mat-form-field class="form-field-dlg">
                \t\t\t<input name="${il}" matInput [(ngModel)]="${name}.${i}" type="text" required>
                \t\t</mat-form-field>`;
                break;
        }


        fStr +=
            `\n
            \t<div fxLayout="row" fxLayoutAlign="space-between center" style="height: 50px;">
            \t\t<span class="span-label">${i}</span>
            ${inp}
            \t</div>`

    }


    fStr += `\t</form>\n</div>\n`;

    return fStr;
}


writeFileStrSync(`${name}.html`, await createHtmlString(name, src));


console.log('\n');
console.log(bgBlue(white('DONE!')));
console.log('\n');





