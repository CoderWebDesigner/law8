import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventsFilter'
})
export class EventsFilterPipe implements PipeTransform {

  transform(value: any[], filterText: string,key:string): any[] {
    if(!filterText) return value;
    if(filterText==='All') return value
    console.log(value.filter(obj=>obj[key]===filterText))
    return value.filter(obj=>obj[key]===filterText);
  }

}
