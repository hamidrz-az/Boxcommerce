import { CoversionServiceResponse } from './coversion-service-response';

export interface CalculatedResult extends CoversionServiceResponse {
  amount: number;
  to: string;
  calculatedValue: number;
}
