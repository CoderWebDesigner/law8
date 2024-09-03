import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

export interface CardItem {
  id: number;
  icon?: string;
  label: string;
  key?: string;
  apiUrl?: any;
  localize?: any;
  additionalTableConfig?: TableConfig;
  data?: any;
}
