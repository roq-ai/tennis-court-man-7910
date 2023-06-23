import { UserInterface } from 'interfaces/user';
import { TennisCourtInterface } from 'interfaces/tennis-court';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_time: any;
  end_time: any;
  user_id?: string;
  tennis_court_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  tennis_court?: TennisCourtInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  tennis_court_id?: string;
}
