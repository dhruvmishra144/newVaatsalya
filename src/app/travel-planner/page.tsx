"use client";

import { useContext } from 'react';
import TravelPlannerPage from '../../components/TravelPlannerPage';
import { AppContext } from '../../components/ClientLayout';

export default function Page() {
  const context = useContext(AppContext);
  if (!context) return null;
  const { handleAddTravelBundle } = context;

  return <TravelPlannerPage handleAddTravelBundle={handleAddTravelBundle} />;
}
