import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'genericFilter'
})
export class GenericFilterPipe implements PipeTransform {	
	transform(items: any[], searchText: string): any[] {
		if(!items) return [];
		if(!searchText) return items;
		searchText = searchText.toLowerCase();
		return items.filter( element => {
			const keys=Object.keys(element);
			for(let key of keys){				
				const childKeys=typeof element[key] === 'object' && element[key] !== null ?
					Object.keys(element[key])
					:null;
				if(childKeys){
					for(let childKey of childKeys){
						if(element[key][childKey] && element[key][childKey].toString().toLowerCase().includes(searchText)) return element
					}
				}
				if(element[key] && element[key].toString().toLowerCase().includes(searchText)) return element
			}
		});
	}
}