export interface Employee {
  id: number;
  name: string;
  timezone: string;
  checked_in_at: string;
  checked_out_at: string | null;
  checkout_message: string | null;
}

export interface DayData {
  date: string;
  employees: Employee[];
}

export interface AttendanceData {
  current_day: DayData;
  yesterday: DayData;
}

export interface TeamResponse {
  team: {
    id: number;
    name: string;
  };
  attendance_data: AttendanceData;
  status: string;
}