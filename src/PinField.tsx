import { type ClipboardEvent, type RefObject } from "react";
import { digitsOnly } from "./access";

const SLOTS = [0, 1, 2, 3] as const;

type PinFieldProps = {
  value: string;
  denied: boolean;
  describedBy?: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onValue: (next: string) => void;
};

export function PinField({
  value,
  denied,
  describedBy,
  inputRef,
  onValue,
}: PinFieldProps) {
  function commit(raw: string) {
    onValue(digitsOnly(raw));
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    commit(event.clipboardData.getData("text"));
  }

  return (
    <div className="pin">
      <input
        ref={inputRef}
        id="access-sequence"
        className="pin-input"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        autoFocus
        maxLength={4}
        pattern="[0-9]*"
        aria-invalid={denied}
        aria-describedby={describedBy}
        value={value}
        onChange={(event) => commit(event.target.value)}
        onPaste={handlePaste}
      />
      <div className="slots" aria-hidden="true">
        {SLOTS.map((index) => (
          <span className="slot" key={index}>
            {value[index] ?? "_"}
          </span>
        ))}
      </div>
    </div>
  );
}
