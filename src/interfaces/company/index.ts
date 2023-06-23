import { SubscriptionInterface } from 'interfaces/subscription';
import { TennisCourtInterface } from 'interfaces/tennis-court';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  subscription?: SubscriptionInterface[];
  tennis_court?: TennisCourtInterface[];
  user?: UserInterface;
  _count?: {
    subscription?: number;
    tennis_court?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
