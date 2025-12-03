import { TOperation } from "@utils/constants";

export interface IConditions {
  // TODO: remove this 'isSelected' after Laptop Questionnaire refactoring is done
  isSelected: any;
  id: string;
  conditionId: string;
  conditionName: string;
  description: string;
  isMandatory: boolean;
  isYesNoType: boolean;
  multiSelect: boolean;
  showLabelsImage: boolean;
  keyword: string;
  page: number;
  conditionLabels: IConditionLabels[];
}

export interface IConditionLabels {
  id: string;
  conditionLabel: string;
  conditionLabelId: string;
  conditionLabelImg?: string;
  operation: TOperation;
  priceDrop: number;
}

export interface IVariantDeductions {
  id: string;
  variantId: string;
  variantName: string;
  deductions: IConditions[];
}
