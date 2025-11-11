import type BaseModel from "@/entities/base.model";
import { useMemo } from "react";

//it needs to be a model to extends by BaseModel, a field to search and the field to return 
export function useEntityMap<
  T extends BaseModel,
  K extends keyof T,
  V extends keyof T
>(
  //receives an array of entities with data
  entities: T[],
  keyField: K,
  valueField: V
): Record<string, string> {
  return useMemo(() => {
    //save data using a key and value
    const map: Record<string, string> = {};
    //return the array
    for (const item of entities) {
      const key = String(item[keyField]);
      const value = String(item[valueField] ?? item[keyField]);
      map[key] = value;
    }
    return map;
  }, [entities, keyField, valueField]);
}
