export interface TableConfig  {
    isSearch?: boolean;
    searchKey?: string;
    anotherFilter?: boolean; //used to add custom filter
    actions?: TableAction [],
    withCheckbox?: boolean;
    withRadioButton?: boolean;
    id?:string;
    dataKey?:string;
    empty?:{
        btnLabel:string;
        command:()=>void
    }
}


export interface TableAction {
    type?: string;
    icon?: string;
    target?: any;
    targetType?: string;
    permission?: string;
    title?: string;
    queryParams?:any;
    tooltipText?: string;
    width?:string;
    isDynamic?:boolean;
    targetAttr?: string


}
