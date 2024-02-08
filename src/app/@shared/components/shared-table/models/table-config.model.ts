export interface TableConfig  {
    isSearch?: boolean;
    isEditable?: boolean;
    searchKey?: string;
    anotherFilter?: boolean; //used to add custom filter
    actions?: TableAction [],
    withCheckbox?: boolean;
    withRadioButton?: boolean;
    id?:string;
    dataKey?:string;
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
    isReadOnly?:boolean;

}
