import { ValidationErrors } from "@angular/forms";
import { AbstractControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";

export function validateExpression(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}


export function validateOnlyNumber(lengthNumber:number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value)
    return {forbiddenName: {value: control.value}}
    const numberPattern = /\d+/g;
    const numberExtract = control.value.toString().match(numberPattern).join('');
    return numberExtract?.length == lengthNumber ? null: {forbiddenName: {value: control.value}};

  };
}
