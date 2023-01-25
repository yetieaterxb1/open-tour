type TourDate = {
  date: string;
  end_time: string;
  start_time: string;
  time_zone: string;
};

type TourLocation = {
  city: string;
  state: string | null;
  street_address: string;
};

export type Tour = {
  company_name: string;
  date_time: TourDate;
  email: string;
  id: number;
  location: TourLocation;
  logo: string;
  price: string;
};

export const fetchTours = async (
  page: number = 1,
  limit: number = 20,
): Promise<Tour[]> => {
  const res = await fetch(
    `http://localhost:3000/tours?_page=${page}&_limit=${limit}`,
  );
  return res.json();
};
