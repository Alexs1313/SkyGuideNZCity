import React, {createContext, useContext} from 'react';

export type SavedLocationsValue = {
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

export const SavedLocationsContext =
  createContext<SavedLocationsValue | null>(null);

export function useSavedLocations(): SavedLocationsValue {
  const locsSaved = useContext(SavedLocationsContext);
  if (!locsSaved) {
    throw new Error('useSavedLocations must be used within provider');
  }
  return locsSaved;
}
