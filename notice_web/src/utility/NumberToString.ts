import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'NumToStrPipe'

}) 
export class NumToStrPipe implements PipeTransform {

transform(input: number): string{ //string type
   return input + '';
} }