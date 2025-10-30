import { DataList as RadixDataList, Flex } from "@radix-ui/themes";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface DataListItemProps {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  minWidth?: string;
}

export interface DataListRootProps {
  items: DataListItemProps[];
  size?: "1" | "2" | "3";
  orientation?: "horizontal" | "vertical";
}

export function DataList({
  items,
  size = "2",
  orientation = "horizontal",
}: DataListRootProps) {
  return (
    <RadixDataList.Root size={size} orientation={orientation}>
      {items.map((item) => (
        <RadixDataList.Item key={item.label} align="start">
          <RadixDataList.Label minWidth={item.minWidth || "88px"}>
            <Flex gap="2" align="center">
              {item.icon && <item.icon size={16} />}
              {item.label}
            </Flex>
          </RadixDataList.Label>
          <RadixDataList.Value>{item.value}</RadixDataList.Value>
        </RadixDataList.Item>
      ))}
    </RadixDataList.Root>
  );
}

// Exportando partes individuais para uso avançado
DataList.Root = RadixDataList.Root;
DataList.Item = RadixDataList.Item;
DataList.Label = RadixDataList.Label;
DataList.Value = RadixDataList.Value;
