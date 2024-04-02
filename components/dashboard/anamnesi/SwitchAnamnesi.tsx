import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { IAnamnesi } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

const SwitchAnamnesi = ({
  label,
  value,
  setData,
  prop,
  data,
}: {
  label: string;
  value: boolean;
  setData: Dispatch<SetStateAction<IAnamnesi | null>>;
  prop: string;
  data: IAnamnesi;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={value}
        // defaultChecked={value}
        onCheckedChange={(val) => {
          setData({ ...data, [prop]: val });
        }}
      />
      <Label htmlFor="airplane-mode">{label}</Label>
    </div>
  );
};

export default SwitchAnamnesi;
