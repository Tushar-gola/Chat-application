import { memo } from "react";
import { Text } from "../../typography/text";
import { Button } from "../button";

type FormLayoutLeftContentProps = {
  setFilter: (value: string) => void;
  filter: string;
};

export const FormLayoutLeftContent = memo(({ setFilter, filter }: FormLayoutLeftContentProps) => {
  const setOrClearFilter = (value: string) => {
    if (filter === value) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Text className="text-white">Search by:</Text>
      <div className="flex gap-2">
        <Button size="md" variant={filter === "REMS" ? "default" : "default_ghost"} onClick={() => setOrClearFilter("REMS")}>
          REMS
        </Button>
        <Button size="md" variant={filter === "PM" ? "default" : "default_ghost"} onClick={() => setOrClearFilter("PM")}>
          PM
        </Button>
        <Button size="md" variant={filter === "PG" ? "default" : "default_ghost"} onClick={() => setOrClearFilter("PG")}>
          PG
        </Button>
        <Button size="md" variant={filter === "MAP" ? "default" : "default_ghost"} onClick={() => setOrClearFilter("MAP")}>
          MAP
        </Button>
        <Button size="md" variant={filter === "JVP" ? "default" : "default_ghost"} onClick={() => setOrClearFilter("JVP")}>
          JVP
        </Button>
      </div>
    </div>
  );
});
