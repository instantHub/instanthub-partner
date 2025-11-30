import { TOperation } from "@utils/constants";

export interface ICategoryResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  brands: IBrandLite[];
  categoryType: ICategoryType;
}

export interface ICategoryType {
  multiVariants: boolean;
  processorBased: boolean;
  simple: boolean;
}

export interface IBrandResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  series: Array<Object>;
  products: Array<string>;
  category: ICategoryResponse;
}

export type IBrandLite = Pick<
  IBrandResponse,
  "id" | "name" | "image" | "uniqueURL"
>;

export interface IProductResponse {
  id: string;
  name: string;
  image: string;
  uniqueURL: string;
  status: string;
  brand: Omit<IBrandResponse, "series" | "products">;
  category: Omit<ICategoryResponse, "brands">;
  simpleDeductions: IConditions[] | [];
  variantDeductions: IVariantDeductions[] | [];
  variants: IVariants[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: Array<string>;
  canonicalUrl: string;
}
export interface IVariants {
  id: string;
  name: string;
  price: number;
}

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
