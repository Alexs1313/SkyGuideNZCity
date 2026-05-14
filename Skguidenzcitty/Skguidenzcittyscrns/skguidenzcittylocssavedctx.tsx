import React, {createContext, useContext} from 'react';

export type SkguidenzcittylocsSavedCtx = {
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

export const SkguidenzcittylocsSavedContext =
  createContext<SkguidenzcittylocsSavedCtx | null>(null);

export function useSkguidenzcittylocsSaved(): SkguidenzcittylocsSavedCtx {
  const skguidenzcittylocsSaved = useContext(SkguidenzcittylocsSavedContext);
  if (!skguidenzcittylocsSaved) {
    throw new Error('useSkguidenzcittylocsSaved must be used within provider');
  }
  return skguidenzcittylocsSaved;
}
